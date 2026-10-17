/**
 * English Number to Words Converter (Indian Numbering System / International)
 * Formats numbers into words for legal agreements:
 * e.g., 50000 -> "Fifty Thousand"
 *       12000 -> "Twelve Thousand"
 *       150000 -> "One Lakh Fifty Thousand"
 */

const ONES = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];

const TENS = [
  '',
  '',
  'Twenty',
  'Thirty',
  'Forty',
  'Fifty',
  'Sixty',
  'Seventy',
  'Eighty',
  'Ninety',
];

function convertBelowThousand(n: number): string {
  if (n === 0) return '';
  if (n < 20) return ONES[n];
  if (n < 100) {
    const unit = n % 10;
    return TENS[Math.floor(n / 10)] + (unit > 0 ? ' ' + ONES[unit] : '');
  }
  const hundred = Math.floor(n / 100);
  const remainder = n % 100;
  return (
    ONES[hundred] +
    ' Hundred' +
    (remainder > 0 ? ' and ' + convertBelowThousand(remainder) : '')
  );
}

export function englishNumberToWords(num: number): string {
  if (!Number.isInteger(num) || num < 0) {
    throw new Error('Number must be a positive integer');
  }
  if (num === 0) return 'Zero';

  let remaining = num;
  const parts: string[] = [];

  // Crores
  const crores = Math.floor(remaining / 10000000);
  remaining %= 10000000;
  if (crores > 0) {
    parts.push(`${convertBelowThousand(crores)} Crore`);
  }

  // Lakhs
  const lakhs = Math.floor(remaining / 100000);
  remaining %= 100000;
  if (lakhs > 0) {
    parts.push(`${convertBelowThousand(lakhs)} Lakh`);
  }

  // Thousands
  const thousands = Math.floor(remaining / 1000);
  remaining %= 1000;
  if (thousands > 0) {
    parts.push(`${convertBelowThousand(thousands)} Thousand`);
  }

  // Hundreds, tens, units
  if (remaining > 0) {
    parts.push(convertBelowThousand(remaining));
  }

  return parts.join(' ').trim();
}
