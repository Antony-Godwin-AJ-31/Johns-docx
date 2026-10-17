/**
 * Indian currency formatting utilities.
 *
 * Formats amounts using the Indian numbering system (lakhs, crores)
 * with proper digit grouping: ₹1,23,45,678
 */

/**
 * Format a number using Indian digit grouping.
 * E.g., 1234567 → "12,34,567"
 *
 * @param amount - A positive integer
 * @returns Formatted string with Indian comma grouping (no currency symbol)
 */
export function formatIndianNumber(amount: number): string {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error('Amount must be a non-negative integer');
  }

  const str = amount.toString();

  if (str.length <= 3) {
    return str;
  }

  // Last 3 digits
  const lastThree = str.slice(-3);
  // Remaining digits, grouped in pairs from right
  const remaining = str.slice(0, -3);

  const pairs: string[] = [];
  for (let i = remaining.length; i > 0; i -= 2) {
    const start = Math.max(0, i - 2);
    pairs.unshift(remaining.slice(start, i));
  }

  return `${pairs.join(',')},${lastThree}`;
}

/**
 * Format an amount as Indian Rupees with the ₹ symbol.
 * E.g., 50000 → "₹50,000"
 *
 * @param amount - A positive integer
 * @returns Formatted INR string
 */
export function formatINR(amount: number): string {
  return `₹${formatIndianNumber(amount)}`;
}

/**
 * Parse a string that may contain Indian formatting back to an integer.
 * Strips commas, ₹ symbol, and whitespace.
 *
 * @param value - String like "50,000" or "₹1,50,000" or "50000"
 * @returns The parsed integer, or NaN if invalid
 */
export function parseINRInput(value: string): number {
  const cleaned = value.replace(/[₹,\s]/g, '');
  if (cleaned === '' || !/^\d+$/.test(cleaned)) {
    return NaN;
  }
  const num = parseInt(cleaned, 10);
  if (num > Number.MAX_SAFE_INTEGER) {
    return NaN;
  }
  return num;
}
