// Shared formatting helpers for finance views.

export function formatMoney(value, currency = 'USD') {
  if (value == null || value === '' || Number.isNaN(Number(value))) return '—';
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 2
    }).format(Number(value));
  } catch {
    return `$${Number(value).toFixed(2)}`;
  }
}

export function formatDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatMonth(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  if (!y || !m) return ym;
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short'
  });
}

export function percent(value) {
  if (value == null || value === '' || Number.isNaN(Number(value))) return '—';
  return `${Number(value).toFixed(2)}%`;
}

export const CATEGORY_COLORS = {
  groceries: '#4caf50',
  dining: '#ff7043',
  travel: '#42a5f5',
  utilities: '#ab47bc',
  shopping: '#ec407a',
  entertainment: '#7e57c2',
  fees: '#ef5350',
  interest: '#d32f2f',
  payment: '#66bb6a',
  transfer: '#29b6f6',
  income: '#26a69a',
  other: '#8d8d8d',
  uncategorized: '#bdbdbd'
};
