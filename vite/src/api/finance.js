// FinanceLog API client.
//
// Points at the Cloudflare Worker. Override via VITE_FINANCE_API env or
// at runtime by setting localStorage.FINANCE_API_URL.

const RUNTIME_OVERRIDE_KEY = 'FINANCE_API_URL';
const RUNTIME_TOKEN_KEY = 'FINANCE_API_TOKEN';

function baseUrl() {
  if (typeof window !== 'undefined') {
    const override = window.localStorage?.getItem(RUNTIME_OVERRIDE_KEY);
    if (override) return override.replace(/\/$/, '');
  }
  const envBase = import.meta.env.VITE_FINANCE_API;
  if (envBase) return envBase.replace(/\/$/, '');
  return 'http://localhost:8787';
}

function authHeader() {
  if (typeof window === 'undefined') return {};
  const token = window.localStorage?.getItem(RUNTIME_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(data?.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

export const financeApi = {
  baseUrl,

  setBaseUrl(url) {
    if (typeof window === 'undefined') return;
    if (url) window.localStorage.setItem(RUNTIME_OVERRIDE_KEY, url);
    else window.localStorage.removeItem(RUNTIME_OVERRIDE_KEY);
  },

  setToken(token) {
    if (typeof window === 'undefined') return;
    if (token) window.localStorage.setItem(RUNTIME_TOKEN_KEY, token);
    else window.localStorage.removeItem(RUNTIME_TOKEN_KEY);
  },

  getToken() {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem(RUNTIME_TOKEN_KEY) || '';
  },

  async health() {
    const res = await fetch(`${baseUrl()}/api/health`, { headers: authHeader() });
    return handle(res);
  },

  async summary() {
    const res = await fetch(`${baseUrl()}/api/summary`, { headers: authHeader() });
    return handle(res);
  },

  async listStatements(params = {}) {
    const q = new URLSearchParams(params);
    const res = await fetch(`${baseUrl()}/api/statements?${q}`, { headers: authHeader() });
    return handle(res);
  },

  async getStatement(id) {
    const res = await fetch(`${baseUrl()}/api/statements/${id}`, { headers: authHeader() });
    return handle(res);
  },

  async deleteStatement(id) {
    const res = await fetch(`${baseUrl()}/api/statements/${id}`, {
      method: 'DELETE',
      headers: authHeader()
    });
    return handle(res);
  },

  statementPdfUrl(id) {
    return `${baseUrl()}/api/statements/${id}/pdf`;
  },

  async listTransactions(params = {}) {
    const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''));
    const q = new URLSearchParams(clean);
    const res = await fetch(`${baseUrl()}/api/transactions?${q}`, { headers: authHeader() });
    return handle(res);
  },

  async listAccounts() {
    const res = await fetch(`${baseUrl()}/api/accounts`, { headers: authHeader() });
    return handle(res);
  },

  async listCategories() {
    const res = await fetch(`${baseUrl()}/api/categories`, { headers: authHeader() });
    return handle(res);
  },

  async uploadStatement(file) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`${baseUrl()}/api/statements/upload`, {
      method: 'POST',
      headers: authHeader(),
      body: fd
    });
    return handle(res);
  }
};

export default financeApi;
