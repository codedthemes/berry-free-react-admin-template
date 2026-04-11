-- FinanceLog D1 schema
-- Run with: wrangler d1 execute financelog --file=./schema.sql

CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  issuer TEXT,
  account_type TEXT,              -- credit_card, checking, savings, loan
  last_four TEXT,
  currency TEXT DEFAULT 'USD',
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE (issuer, last_four, account_type)
);

CREATE TABLE IF NOT EXISTS statements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER REFERENCES accounts(id),
  account_name TEXT,
  issuer TEXT,
  account_type TEXT,
  last_four TEXT,
  statement_date TEXT,
  period_start TEXT,
  period_end TEXT,
  opening_balance REAL,
  closing_balance REAL,
  minimum_payment REAL,
  payment_due_date TEXT,
  interest_rate_purchase REAL,    -- APR %
  interest_rate_cash REAL,
  credit_limit REAL,
  available_credit REAL,
  total_fees REAL,
  total_interest REAL,
  total_payments REAL,
  total_purchases REAL,
  currency TEXT DEFAULT 'USD',
  pdf_hash TEXT UNIQUE NOT NULL,  -- SHA-256 of uploaded PDF
  pdf_r2_key TEXT NOT NULL,
  pdf_filename TEXT,
  raw_extraction_json TEXT,       -- full Mistral response for debugging
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_statements_date ON statements(statement_date);
CREATE INDEX IF NOT EXISTS idx_statements_account ON statements(account_id);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  statement_id INTEGER REFERENCES statements(id) ON DELETE CASCADE,
  account_id INTEGER REFERENCES accounts(id),
  tx_date TEXT,                   -- ISO date
  post_date TEXT,
  description TEXT,
  merchant TEXT,
  category TEXT,
  amount REAL,                    -- positive = money out (expense), negative = money in (income/refund)
  direction TEXT,                 -- 'debit' | 'credit'
  currency TEXT DEFAULT 'USD',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(tx_date);
CREATE INDEX IF NOT EXISTS idx_transactions_statement ON transactions(statement_id);
CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);
