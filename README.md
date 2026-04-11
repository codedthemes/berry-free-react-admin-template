# FinanceLog

A personal finance app that turns your PDF statements into a queryable, dashboardable ledger.

- **Upload** PDF bank or credit-card statements.
- Statements are SHA-256 hashed on the worker so **duplicate PDFs never get processed twice**.
- **[Mistral](https://mistral.ai)** OCRs each page and extracts a strict JSON object: statement metadata, APRs, minimum payment, credit limit, and every line-item transaction.
- Everything persists to **Cloudflare D1** (SQL) and the raw PDF is stored in **Cloudflare R2**.
- A single dashboard ([Berry](https://github.com/codedthemes/berry-free-react-admin-template) React template) shows cashflow charts, category breakdowns, upcoming payments, and a unified searchable ledger of every expense/income line.

---

## Architecture

```
┌───────────────┐  multipart     ┌────────────────────┐        ┌──────────────┐
│  React / Vite │ ─────────────▶ │  Cloudflare Worker │ ─────▶ │  Mistral API │
│   (Berry UI)  │ ◀───── JSON ── │   /api/*           │        │  OCR + chat  │
└───────────────┘                └─────┬───────┬──────┘        └──────────────┘
                                       │       │
                                       ▼       ▼
                                   ┌─────┐  ┌─────┐
                                   │  D1 │  │  R2 │
                                   │ SQL │  │ PDFs│
                                   └─────┘  └─────┘
```

- `vite/` — React 19 + MUI 7 + SWR frontend. The original Berry template with the dashboard replaced by finance views.
- `worker/` — Cloudflare Worker API. D1 + R2 + Mistral integration.

---

## 1. Backend — Cloudflare Worker

```
cd worker
npm install
```

### Create the D1 database and R2 bucket

```bash
# 1. D1
npx wrangler d1 create financelog
# Paste the returned `database_id` into worker/wrangler.toml

# 2. R2
npx wrangler r2 bucket create financelog-statements

# 3. Apply the schema (local + remote)
npm run db:init           # local dev DB
npm run db:init:remote    # production D1
```

### Set secrets

```bash
npx wrangler secret put MISTRAL_API_KEY
# optional: lock the API down so only you can hit it
npx wrangler secret put API_TOKEN
```

For local dev, create `worker/.dev.vars` (see `.dev.vars.example`) with those values.

### Run locally

```bash
npm run dev       # http://localhost:8787
```

### Deploy

```bash
npm run deploy    # pushes to https://financelog-api.<you>.workers.dev
```

### Endpoints

| Method | Path                         | Purpose                                                 |
|--------|------------------------------|---------------------------------------------------------|
| GET    | `/api/health`                | Liveness check                                          |
| GET    | `/api/summary`               | Totals, monthly cashflow, category breakdown, upcoming  |
| POST   | `/api/statements/upload`     | multipart/form-data `file` — hash, dedupe, extract      |
| GET    | `/api/statements`            | List all statements                                     |
| GET    | `/api/statements/:id`        | One statement + its transactions                        |
| GET    | `/api/statements/:id/pdf`    | Stream the original PDF from R2                         |
| DELETE | `/api/statements/:id`        | Remove statement, transactions, and R2 object           |
| GET    | `/api/transactions`          | Unified ledger. Filters: `q`, `category`, `from`, `to`  |
| GET    | `/api/accounts`              | Known accounts                                          |
| GET    | `/api/categories`            | Category usage counts                                   |

All endpoints except `/api/health` require `Authorization: Bearer <API_TOKEN>` when the secret is set.

### How duplicate detection works

On upload the worker:
1. Reads the PDF bytes and computes `sha256(bytes)`.
2. Looks up `statements.pdf_hash` (which has a `UNIQUE` constraint).
3. If it's already there, responds `409 Conflict` with the existing row and skips everything else — **no Mistral tokens are spent**.
4. Otherwise it stores the PDF at `statements/<sha256>.pdf` in R2 and runs extraction.

R2 keys use the hash too, so the object store is automatically de-duplicated.

### How extraction works

`worker/src/mistral.js` runs a two-step pipeline:

1. **OCR** — `POST /v1/ocr` with `mistral-ocr-latest`. Returns clean markdown for every page.
2. **Structured extraction** — `POST /v1/chat/completions` with `mistral-large-latest` and `response_format: json_object`. A system prompt + an explicit JSON schema force the model to return the statement fields and every transaction. Direction is normalized so positive amounts are always money out.

If you want to swap models (e.g. `mistral-small-latest` to save cost), change `MISTRAL_MODEL` / `MISTRAL_OCR_MODEL` in `wrangler.toml`.

### Schema

See `worker/schema.sql`. Tables: `accounts`, `statements`, `transactions`. Every transaction links back to its statement, so deleting a statement cascades to its line items.

---

## 2. Frontend — Vite React app

```
cd vite
yarn install     # or npm install
yarn start       # http://localhost:3000
```

Open **Settings** from the sidebar and set:

- **API URL** — e.g. `http://localhost:8787` for local dev or `https://financelog-api.<you>.workers.dev` in production.
- **API token** — the bearer token you set via `wrangler secret put API_TOKEN` (leave blank if you didn't set one).

Both values live in browser `localStorage` only; no secrets ship in the build.

You can also bake a default API URL into the build with a `.env`:

```
VITE_FINANCE_API=https://financelog-api.<you>.workers.dev
```

### Pages

- **Overview** — totals, 12-month cashflow area chart, category donut, upcoming payments, account list with live APR / credit-limit info.
- **Upload PDFs** — drag-and-drop queue. Duplicates are called out inline.
- **Transactions** — unified ledger. Search, filter by category, date range. Running totals and net at the top.
- **Statements** — every imported statement with details dialog, link to the original PDF in R2, and a delete button.
- **Settings** — point the app at your Worker and test the connection.

### Build for production

```
yarn build
# dist/ is ready to deploy to Cloudflare Pages, Workers Assets, Netlify, etc.
```

Cloudflare Pages deploy:

```bash
cd vite
npx wrangler pages deploy dist --project-name financelog
```

---

## Costs & limits

- **Cloudflare D1 / R2 / Workers** — free tiers are plenty for a personal finance log.
- **Mistral** — OCR + chat call per statement. A typical 2-page credit card PDF runs well under $0.01 on `mistral-large-latest`; the dedup step means you only pay once per unique PDF.
- **Max upload size** — the worker refuses anything larger than 25 MB.

## Development tips

- `wrangler d1 execute financelog --command="select * from statements"` is the fastest way to inspect what the extractor did.
- Each row's `raw_extraction_json` stores a truncated OCR excerpt + the extracted JSON — great for debugging a misparsed statement.
- Reset everything with `npm run db:reset` in `worker/`.

---

This repository started from the [Berry Free React Admin template](https://github.com/codedthemes/berry-free-react-admin-template); see `remix/` for the (untouched) remix variant.
