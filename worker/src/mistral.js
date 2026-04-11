// Mistral extraction pipeline for financial statements.
//
// Two-stage approach:
//   1. OCR the PDF with mistral-ocr-latest to get clean markdown per page.
//   2. Hand the concatenated markdown to a chat model with a strict JSON
//      schema so we get structured statement + transaction data.
//
// We fall back to calling the chat model directly with a document_url if
// OCR fails or is unavailable.

const MISTRAL_API = 'https://api.mistral.ai/v1';

const STATEMENT_SYSTEM_PROMPT = `You are a meticulous financial statement parser.
Given OCR'd text from a bank or credit card statement PDF, extract every meaningful
field and EVERY line item transaction.

Rules:
- Return ONLY valid JSON matching the schema. No prose.
- Dates MUST be ISO format YYYY-MM-DD. If a year is missing, infer it from the statement period.
- Amounts are numbers (no currency symbols, no thousands separators).
- For transactions on a credit card: purchases/fees are positive (money owed), payments/credits/refunds are negative.
- For bank accounts: withdrawals/debits are positive, deposits/credits are negative.
- "direction" is "debit" when amount > 0, "credit" when amount < 0.
- Interest rates are annual percent rates as numbers (e.g. 19.99 for 19.99% APR). Null if not present.
- Never invent data. If a field is not visible, use null.
- Capture ALL transactions, even if there are dozens. Do not summarize or truncate.`;

const STATEMENT_JSON_SCHEMA = {
  type: 'object',
  properties: {
    account_name: { type: ['string', 'null'], description: 'Cardholder or account holder name, or product name' },
    issuer: { type: ['string', 'null'], description: 'Issuing bank or institution, e.g. "Chase", "Amex"' },
    account_type: {
      type: ['string', 'null'],
      enum: ['credit_card', 'checking', 'savings', 'loan', 'investment', null],
      description: 'Best guess at account type'
    },
    last_four: { type: ['string', 'null'], description: 'Last four digits of card/account number' },
    statement_date: { type: ['string', 'null'] },
    period_start: { type: ['string', 'null'] },
    period_end: { type: ['string', 'null'] },
    opening_balance: { type: ['number', 'null'] },
    closing_balance: { type: ['number', 'null'] },
    minimum_payment: { type: ['number', 'null'] },
    payment_due_date: { type: ['string', 'null'] },
    interest_rate_purchase: { type: ['number', 'null'], description: 'Purchase APR as a percent, e.g. 19.99' },
    interest_rate_cash: { type: ['number', 'null'] },
    credit_limit: { type: ['number', 'null'] },
    available_credit: { type: ['number', 'null'] },
    total_fees: { type: ['number', 'null'] },
    total_interest: { type: ['number', 'null'] },
    total_payments: { type: ['number', 'null'] },
    total_purchases: { type: ['number', 'null'] },
    currency: { type: ['string', 'null'], description: 'ISO 4217 code, default USD' },
    transactions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          tx_date: { type: ['string', 'null'] },
          post_date: { type: ['string', 'null'] },
          description: { type: ['string', 'null'] },
          merchant: { type: ['string', 'null'] },
          category: {
            type: ['string', 'null'],
            description: 'High-level category: groceries, dining, travel, utilities, shopping, entertainment, fees, interest, payment, transfer, income, other'
          },
          amount: { type: ['number', 'null'] },
          direction: { type: ['string', 'null'], enum: ['debit', 'credit', null] }
        },
        required: ['description', 'amount']
      }
    }
  },
  required: ['transactions']
};

/**
 * Run OCR on a PDF using Mistral's document OCR endpoint.
 * @param {ArrayBuffer} pdfBytes
 * @param {string} filename
 * @param {{ apiKey: string, model: string }} cfg
 * @returns {Promise<string>} concatenated markdown
 */
export async function ocrPdf(pdfBytes, filename, cfg) {
  const dataUrl = `data:application/pdf;base64,${arrayBufferToBase64(pdfBytes)}`;

  const res = await fetch(`${MISTRAL_API}/ocr`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: cfg.model || 'mistral-ocr-latest',
      document: {
        type: 'document_url',
        document_url: dataUrl,
        document_name: filename || 'statement.pdf'
      },
      include_image_base64: false
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Mistral OCR failed (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const pages = Array.isArray(data.pages) ? data.pages : [];
  return pages.map((p, i) => `--- PAGE ${i + 1} ---\n${p.markdown || ''}`).join('\n\n');
}

/**
 * Extract a structured statement object from markdown using a chat model
 * with JSON-mode output.
 * @param {string} markdown
 * @param {{ apiKey: string, model: string }} cfg
 */
export async function extractStatement(markdown, cfg) {
  const res = await fetch(`${MISTRAL_API}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: cfg.model || 'mistral-large-latest',
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: STATEMENT_SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text:
                'Extract a JSON object matching this schema from the statement below.\n\n' +
                'Schema:\n' +
                JSON.stringify(STATEMENT_JSON_SCHEMA, null, 2) +
                '\n\nStatement text:\n' +
                markdown
            }
          ]
        }
      ]
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Mistral chat failed (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Mistral returned empty extraction');

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    // Occasionally the model wraps JSON in a code fence.
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Could not parse Mistral JSON: ' + content.slice(0, 400));
    parsed = JSON.parse(match[0]);
  }

  return normalizeExtraction(parsed);
}

/**
 * Full pipeline: OCR then extract. Returns both the structured data and the
 * raw markdown for debugging.
 */
export async function extractFromPdf(pdfBytes, filename, env) {
  const apiKey = env.MISTRAL_API_KEY;
  if (!apiKey) throw new Error('MISTRAL_API_KEY secret is not set');

  const markdown = await ocrPdf(pdfBytes, filename, {
    apiKey,
    model: env.MISTRAL_OCR_MODEL || 'mistral-ocr-latest'
  });

  const extraction = await extractStatement(markdown, {
    apiKey,
    model: env.MISTRAL_MODEL || 'mistral-large-latest'
  });

  return { extraction, markdown };
}

// --- helpers -------------------------------------------------------------

function normalizeExtraction(obj) {
  if (!obj || typeof obj !== 'object') return { transactions: [] };

  const out = { ...obj };
  out.currency = out.currency || 'USD';
  out.transactions = Array.isArray(out.transactions) ? out.transactions : [];

  out.transactions = out.transactions.map((t) => {
    const amount = t.amount != null ? Number(t.amount) : null;
    let direction = t.direction;
    if (!direction && amount != null) direction = amount >= 0 ? 'debit' : 'credit';
    return {
      tx_date: t.tx_date || null,
      post_date: t.post_date || null,
      description: t.description || null,
      merchant: t.merchant || null,
      category: t.category || null,
      amount,
      direction: direction || null
    };
  });

  return out;
}

function arrayBufferToBase64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  // btoa is available in Workers runtime
  return btoa(binary);
}
