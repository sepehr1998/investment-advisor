// All date, currency, and number formatting utilities

// Format a date string from the API to "01 Jan 2020"
export function formatDate(dateString: string | null | undefined): string {
  if (dateString == null) return '—';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

// Format a currency amount to "EUR 12,500.00"
// locale is the user's browser locale, fallback to 'en-US'
export function formatCurrency(
  amount: number | null | undefined,
  currencyCode: string | null | undefined
): string {
  if (amount == null) return '—';
  const locale = navigator.language || 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return currencyCode ? `${currencyCode} ${formatted}` : formatted;
}

// Format a quantity to a locale number with max 6 decimal places
// Returns "—" if value is null or undefined
export function formatQuantity(value: number | null | undefined): string {
  if (value == null) return '—';
  const locale = navigator.language || 'en-US';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  }).format(value);
}

// Format a price to a locale number with 2–4 decimal places
// Returns "—" if value is null or undefined
export function formatPrice(value: number | null | undefined): string {
  if (value == null) return '—';
  const locale = navigator.language || 'en-US';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}
