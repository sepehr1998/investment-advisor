import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency, formatQuantity, formatPrice } from './formatters';

describe('formatDate', () => {
  it('formats a valid ISO date to DD MMM YYYY', () => {
    expect(formatDate('2020-01-01')).toBe('01 Jan 2020');
  });

  it('formats another date correctly', () => {
    expect(formatDate('2023-12-31')).toBe('31 Dec 2023');
  });

  it('returns "—" for null', () => {
    expect(formatDate(null)).toBe('—');
  });

  it('returns "—" for undefined', () => {
    expect(formatDate(undefined)).toBe('—');
  });

  it('returns "—" for an invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('—');
  });

  it('returns "—" for an empty string', () => {
    expect(formatDate('')).toBe('—');
  });
});

describe('formatCurrency', () => {
  it('returns "—" for null amount', () => {
    expect(formatCurrency(null, 'EUR')).toBe('—');
  });

  it('returns "—" for undefined amount', () => {
    expect(formatCurrency(undefined, 'EUR')).toBe('—');
  });

  it('includes the currency code prefix', () => {
    expect(formatCurrency(1000, 'EUR')).toContain('EUR');
  });

  it('formats zero with two decimal places', () => {
    const result = formatCurrency(0, 'USD');
    expect(result).toContain('USD');
    expect(result).toContain('0.00');
  });

  it('formats a large number with two decimal places', () => {
    const result = formatCurrency(12500, 'EUR');
    expect(result).toContain('EUR');
    expect(result).toMatch(/12[,.]?500\.00/);
  });

  it('handles null currency code without crashing', () => {
    const result = formatCurrency(100, null);
    expect(result).toContain('100');
  });
});

describe('formatQuantity', () => {
  it('returns "—" for null', () => {
    expect(formatQuantity(null)).toBe('—');
  });

  it('returns "—" for undefined', () => {
    expect(formatQuantity(undefined)).toBe('—');
  });

  it('formats zero', () => {
    expect(formatQuantity(0)).toBe('0');
  });

  it('formats a whole number without unnecessary decimals', () => {
    expect(formatQuantity(100)).toBe('100');
  });

  it('formats a decimal with up to 6 decimal places (rounds at 6th)', () => {
    // 1.123456789 rounds to 1.123457 at 6 decimal places
    const result = formatQuantity(1.123456789);
    expect(result).toMatch(/^1\.12345\d$/);
  });
});

describe('formatPrice', () => {
  it('returns "—" for null', () => {
    expect(formatPrice(null)).toBe('—');
  });

  it('returns "—" for undefined', () => {
    expect(formatPrice(undefined)).toBe('—');
  });

  it('formats a price with at least 2 decimal places', () => {
    expect(formatPrice(150)).toMatch(/150\.00/);
  });

  it('formats up to 4 decimal places', () => {
    expect(formatPrice(1.5678)).toMatch(/1\.5678/);
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toMatch(/0\.00/);
  });
});
