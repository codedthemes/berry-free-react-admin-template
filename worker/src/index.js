// FinanceLog Cloudflare Worker API
// Stack: D1 (SQL), R2 (PDF storage), Mistral (OCR + structured extraction)

import { extractFromPdf } from './mistral.js';

// -----------------------------------------------------------------------
// Router
// -----------------------------------------------------------------------

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') return cors(new Response(null, { status: 204 }));

    try {
      // Optional shared-secret auth. If API_TOKEN is set as a secret, require it.
      if (env.API_TOKEN && !url.pathname.startsWith('/api/health')) {
        const auth = request.headers.get('authorization') || '';
        const token = auth.replace(/^Bearer\s+/i, '');
        if (token !== env.API_TOKEN) return cors(json({ error: 'unauthorized' }, 401));
      }

      const p = url.pathname;
      const m = request.method;

      if (p === '/api/health' && m === 'GET') return cors(json({ ok: true }));

      if (p === '/api/summary' && m === 'GET') return cors(await getSummary(env));

      if (p === '/api/statements' && m === 'GET') return cors(await listStatements(env, url));
      if (p === '/api/statements/upload' && m === 'POST') return cors(await uploadStatement(request, env, ctx));

      const stmMatch = p.match(/^\/api\/statements\/(\d+)$/);
      if (stmMatch && m === 'GET') return cors(await getStatement(env, Number(stmMatch[1])));
      if (stmMatch && m === 'DELETE') return cors(await deleteStatement(env, Number(stmMatch[1])));

      const pdfMatch = p.match(/^\/api\/statements\/(\d+)\/pdf$/);
      if (pdfMatch && m === 'GET') return cors(await getStatementPdf(env, Number(pdfMatch[1])));

      if (p === '/api/transactions' && m === 'GET') return cors(await listTransactions(env, url));
      if (p === '/api/accounts' && m === 'GET') return cors(await listAccounts(env));
      if (p === '/api/categories' && m === 'GET') return cors(await listCategories(env));

      return cors(json({ error: 'not found', path: p }, 404));
    } catch (err) {
      console.error('Worker error', err);
      return cors(json({ error: err.message || String(err) }, 500));
    }
  }
};

// -----------------------------------------------------------------------
// Handlers
// -----------------------------------------------------------------------

async function getSummary(env) {
  const db = env.DB;

  const [totals, byMonth, byCategory, upcoming, accountsAgg] = await Promise.all([
    db
      .prepare(
        `SELECT
           COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS total_expenses,
           COALESCE(SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END), 0) AS total_income,
           COUNT(*) AS tx_count
         FROM transactions`
      )
      .first(),

    db
      .prepare(
        `SELECT substr(tx_date, 1, 7) AS month,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS expenses,
                SUM(CASE WHEN amount < 0 THEN -amount ELSE 0 END) AS income
         FROM transactions
         WHERE tx_date IS NOT NULL
         GROUP BY month
         ORDER BY month DESC
         LIMIT 12`
      )
      .all(),

    db
      .prepare(
        `SELECT COALESCE(category, 'uncategorized') AS category,
                SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS spend,
                COUNT(*) AS count
         FROM transactions
         WHERE amount > 0
         GROUP BY category
         ORDER BY spend DESC
         LIMIT 12`
      )
      .all(),

    db
      .prepare(
        `SELECT id, account_name, issuer, minimum_payment, payment_due_date, closing_balance, currency
         FROM statements
         WHERE payment_due_date IS NOT NULL
         ORDER BY payment_due_date ASC
         LIMIT 6`
      )
      .all(),

    db
      .prepare(
        `SELECT
           s.account_name, s.issuer, s.last_four, s.account_type,
           s.interest_rate_purchase, s.credit_limit, s.closing_balance,
           s.statement_date
         FROM statements s
         JOIN (
           SELECT COALESCE(account_name,'') || '|' || COALESCE(last_four,'') AS k,
                  MAX(statement_date) AS md
           FROM statements
           GROUP BY k
         ) latest
         ON COALESCE(s.account_name,'') || '|' || COALESCE(s.last_four,'') = latest.k
         AND s.statement_date = latest.md`
      )
      .all()
  ]);

  return json({
    totals,
    by_month: byMonth.results || [],
    by_category: byCategory.results || [],
    upcoming_payments: upcoming.results || [],
    accounts: accountsAgg.results || []
  });
}

async function listStatements(env, url) {
  const limit = Math.min(Number(url.searchParams.get('limit') || 100), 500);
  const { results } = await env.DB.prepare(
    `SELECT id, account_name, issuer, account_type, last_four,
            statement_date, period_start, period_end,
            opening_balance, closing_balance, minimum_payment, payment_due_date,
            interest_rate_purchase, interest_rate_cash, credit_limit, available_credit,
            total_fees, total_interest, total_payments, total_purchases,
            currency, pdf_filename, created_at
     FROM statements
     ORDER BY COALESCE(statement_date, created_at) DESC
     LIMIT ?`
  )
    .bind(limit)
    .all();
  return json({ statements: results || [] });
}

async function getStatement(env, id) {
  const stmt = await env.DB.prepare(`SELECT * FROM statements WHERE id = ?`).bind(id).first();
  if (!stmt) return json({ error: 'not found' }, 404);
  const { results: transactions } = await env.DB.prepare(
    `SELECT * FROM transactions WHERE statement_id = ? ORDER BY tx_date ASC, id ASC`
  )
    .bind(id)
    .all();
  return json({ statement: stmt, transactions: transactions || [] });
}

async function deleteStatement(env, id) {
  const stmt = await env.DB.prepare(`SELECT pdf_r2_key FROM statements WHERE id = ?`).bind(id).first();
  if (!stmt) return json({ error: 'not found' }, 404);

  await env.DB.prepare(`DELETE FROM transactions WHERE statement_id = ?`).bind(id).run();
  await env.DB.prepare(`DELETE FROM statements WHERE id = ?`).bind(id).run();
  if (stmt.pdf_r2_key) {
    try {
      await env.PDFS.delete(stmt.pdf_r2_key);
    } catch (_) {
      /* ignore */
    }
  }
  return json({ ok: true });
}

async function getStatementPdf(env, id) {
  const stmt = await env.DB.prepare(`SELECT pdf_r2_key, pdf_filename FROM statements WHERE id = ?`).bind(id).first();
  if (!stmt) return json({ error: 'not found' }, 404);
  const obj = await env.PDFS.get(stmt.pdf_r2_key);
  if (!obj) return json({ error: 'pdf missing from r2' }, 404);
  return new Response(obj.body, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `inline; filename="${stmt.pdf_filename || 'statement.pdf'}"`
    }
  });
}

async function listTransactions(env, url) {
  const limit = Math.min(Number(url.searchParams.get('limit') || 500), 2000);
  const offset = Number(url.searchParams.get('offset') || 0);
  const q = (url.searchParams.get('q') || '').trim();
  const category = url.searchParams.get('category');
  const accountId = url.searchParams.get('account_id');
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');

  const where = [];
  const binds = [];
  if (q) {
    where.push(`(description LIKE ? OR merchant LIKE ?)`);
    binds.push(`%${q}%`, `%${q}%`);
  }
  if (category) {
    where.push(`category = ?`);
    binds.push(category);
  }
  if (accountId) {
    where.push(`account_id = ?`);
    binds.push(Number(accountId));
  }
  if (from) {
    where.push(`tx_date >= ?`);
    binds.push(from);
  }
  if (to) {
    where.push(`tx_date <= ?`);
    binds.push(to);
  }
  const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';

  const { results } = await env.DB.prepare(
    `SELECT t.*, s.account_name, s.issuer, s.last_four
     FROM transactions t
     LEFT JOIN statements s ON s.id = t.statement_id
     ${whereSql}
     ORDER BY COALESCE(t.tx_date, t.post_date) DESC, t.id DESC
     LIMIT ? OFFSET ?`
  )
    .bind(...binds, limit, offset)
    .all();

  return json({ transactions: results || [] });
}

async function listAccounts(env) {
  const { results } = await env.DB.prepare(`SELECT * FROM accounts ORDER BY name ASC`).all();
  return json({ accounts: results || [] });
}

async function listCategories(env) {
  const { results } = await env.DB.prepare(
    `SELECT COALESCE(category, 'uncategorized') AS category, COUNT(*) AS count
     FROM transactions GROUP BY category ORDER BY count DESC`
  ).all();
  return json({ categories: results || [] });
}

// -----------------------------------------------------------------------
// Upload pipeline: hash → dedupe → R2 → Mistral → D1
// -----------------------------------------------------------------------

async function uploadStatement(request, env, ctx) {
  const ct = request.headers.get('content-type') || '';
  if (!ct.includes('multipart/form-data')) {
    return json({ error: 'expected multipart/form-data with a "file" field' }, 400);
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') return json({ error: 'missing file' }, 400);
  const filename = file.name || 'statement.pdf';

  const bytes = await file.arrayBuffer();
  if (bytes.byteLength === 0) return json({ error: 'empty file' }, 400);
  if (bytes.byteLength > 25 * 1024 * 1024) {
    return json({ error: 'file too large (max 25MB)' }, 413);
  }

  const hash = await sha256Hex(bytes);

  // Duplicate check BEFORE calling Mistral — saves tokens.
  const existing = await env.DB.prepare(`SELECT id, pdf_filename, statement_date, account_name FROM statements WHERE pdf_hash = ?`)
    .bind(hash)
    .first();

  if (existing) {
    return json(
      {
        duplicate: true,
        message: 'This PDF has already been imported',
        existing
      },
      409
    );
  }

  // Store PDF in R2 (keyed by hash so the content is the source of truth).
  const r2Key = `statements/${hash}.pdf`;
  await env.PDFS.put(r2Key, bytes, {
    httpMetadata: { contentType: 'application/pdf' },
    customMetadata: { filename }
  });

  // Extract with Mistral.
  let extraction, markdown;
  try {
    const result = await extractFromPdf(bytes, filename, env);
    extraction = result.extraction;
    markdown = result.markdown;
  } catch (err) {
    // Clean up R2 if extraction fails so the user can retry without a dup block.
    try {
      await env.PDFS.delete(r2Key);
    } catch (_) {}
    return json({ error: 'extraction failed: ' + err.message }, 502);
  }

  // Upsert account.
  const accountId = await upsertAccount(env, extraction);

  // Insert the statement.
  const insertStmt = await env.DB.prepare(
    `INSERT INTO statements (
       account_id, account_name, issuer, account_type, last_four,
       statement_date, period_start, period_end,
       opening_balance, closing_balance, minimum_payment, payment_due_date,
       interest_rate_purchase, interest_rate_cash, credit_limit, available_credit,
       total_fees, total_interest, total_payments, total_purchases,
       currency, pdf_hash, pdf_r2_key, pdf_filename, raw_extraction_json
     ) VALUES (?,?,?,?,?, ?,?,?, ?,?,?,?, ?,?,?,?, ?,?,?,?, ?,?,?,?,?)`
  )
    .bind(
      accountId,
      extraction.account_name || null,
      extraction.issuer || null,
      extraction.account_type || null,
      extraction.last_four || null,
      extraction.statement_date || null,
      extraction.period_start || null,
      extraction.period_end || null,
      num(extraction.opening_balance),
      num(extraction.closing_balance),
      num(extraction.minimum_payment),
      extraction.payment_due_date || null,
      num(extraction.interest_rate_purchase),
      num(extraction.interest_rate_cash),
      num(extraction.credit_limit),
      num(extraction.available_credit),
      num(extraction.total_fees),
      num(extraction.total_interest),
      num(extraction.total_payments),
      num(extraction.total_purchases),
      extraction.currency || 'USD',
      hash,
      r2Key,
      filename,
      JSON.stringify({ extraction, markdown_excerpt: (markdown || '').slice(0, 4000) })
    )
    .run();

  const statementId = insertStmt.meta.last_row_id;

  // Insert transactions in a batch.
  const txs = Array.isArray(extraction.transactions) ? extraction.transactions : [];
  if (txs.length) {
    const insertTx = env.DB.prepare(
      `INSERT INTO transactions (
         statement_id, account_id, tx_date, post_date, description, merchant,
         category, amount, direction, currency
       ) VALUES (?,?,?,?,?,?,?,?,?,?)`
    );
    await env.DB.batch(
      txs.map((t) =>
        insertTx.bind(
          statementId,
          accountId,
          t.tx_date || null,
          t.post_date || null,
          t.description || null,
          t.merchant || null,
          t.category || null,
          num(t.amount),
          t.direction || null,
          extraction.currency || 'USD'
        )
      )
    );
  }

  return json({
    ok: true,
    statement_id: statementId,
    transactions_imported: txs.length,
    account_id: accountId,
    extraction: {
      account_name: extraction.account_name,
      issuer: extraction.issuer,
      statement_date: extraction.statement_date,
      closing_balance: extraction.closing_balance,
      minimum_payment: extraction.minimum_payment,
      payment_due_date: extraction.payment_due_date
    }
  });
}

async function upsertAccount(env, extraction) {
  const issuer = extraction.issuer || null;
  const lastFour = extraction.last_four || null;
  const type = extraction.account_type || null;
  const name = extraction.account_name || [issuer, lastFour && `•${lastFour}`].filter(Boolean).join(' ') || 'Unknown account';

  if (issuer || lastFour) {
    const existing = await env.DB.prepare(
      `SELECT id FROM accounts WHERE COALESCE(issuer,'') = COALESCE(?, '')
          AND COALESCE(last_four,'') = COALESCE(?, '')
          AND COALESCE(account_type,'') = COALESCE(?, '')`
    )
      .bind(issuer, lastFour, type)
      .first();
    if (existing) return existing.id;
  }

  const res = await env.DB.prepare(
    `INSERT INTO accounts (name, issuer, account_type, last_four, currency) VALUES (?,?,?,?,?)`
  )
    .bind(name, issuer, type, lastFour, extraction.currency || 'USD')
    .run();
  return res.meta.last_row_id;
}

// -----------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

function cors(res) {
  const h = new Headers(res.headers);
  h.set('access-control-allow-origin', '*');
  h.set('access-control-allow-methods', 'GET,POST,DELETE,OPTIONS');
  h.set('access-control-allow-headers', 'content-type,authorization');
  return new Response(res.body, { status: res.status, headers: h });
}

async function sha256Hex(buf) {
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function num(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
