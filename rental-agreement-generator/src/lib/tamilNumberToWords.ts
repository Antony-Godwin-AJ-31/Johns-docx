/**
 * Tamil Number-to-Words Converter
 *
 * Converts a positive integer (Indian Rupees amount) to its Tamil cardinal wording.
 * Supports the Indian number system: ones, tens, hundreds, thousands, lakhs, crores.
 *
 * This module is:
 * - Completely deterministic (identical input → identical output)
 * - Independent of React, document generation, or any external library
 * - Never returns partial or malformed results
 */

// ---------------------------------------------------------------------------
// Lookup tables
// ---------------------------------------------------------------------------

const ONES: Record<number, string> = {
  0: '',
  1: 'ஒன்று',
  2: 'இரண்டு',
  3: 'மூன்று',
  4: 'நான்கு',
  5: 'ஐந்து',
  6: 'ஆறு',
  7: 'ஏழு',
  8: 'எட்டு',
  9: 'ஒன்பது',
};

const TEENS: Record<number, string> = {
  10: 'பத்து',
  11: 'பதினொன்று',
  12: 'பன்னிரண்டு',
  13: 'பதிமூன்று',
  14: 'பதினான்கு',
  15: 'பதினைந்து',
  16: 'பதினாறு',
  17: 'பதினேழு',
  18: 'பதினெட்டு',
  19: 'பத்தொன்பது',
};

const TENS: Record<number, string> = {
  20: 'இருபது',
  30: 'முப்பது',
  40: 'நாற்பது',
  50: 'ஐம்பது',
  60: 'அறுபது',
  70: 'எழுபது',
  80: 'எண்பது',
  90: 'தொண்ணூறு',
};

const TENS_COMBINING: Record<number, string> = {
  20: 'இருபத்தி',
  30: 'முப்பத்தி',
  40: 'நாற்பத்தி',
  50: 'ஐம்பத்தி',
  60: 'அறுபத்தி',
  70: 'எழுபத்தி',
  80: 'எண்பத்தி',
  90: 'தொண்ணூற்றி',
};

const HUNDREDS: Record<number, string> = {
  1: 'நூறு',
  2: 'இருநூறு',
  3: 'முந்நூறு',
  4: 'நானூறு',
  5: 'ஐநூறு',
  6: 'அறுநூறு',
  7: 'எழுநூறு',
  8: 'எண்ணூறு',
  9: 'தொள்ளாயிரம்',
};

const HUNDREDS_COMBINING: Record<number, string> = {
  1: 'நூற்றி',
  2: 'இருநூற்றி',
  3: 'முந்நூற்றி',
  4: 'நானூற்றி',
  5: 'ஐநூற்றி',
  6: 'அறுநூற்றி',
  7: 'எழுநூற்றி',
  8: 'எண்ணூற்றி',
  9: 'தொள்ளாயிரத்து',
};

/** Standalone forms for 1,000–9,000 (no remainder) */
const SINGLE_THOUSANDS: Record<number, string> = {
  1: 'ஆயிரம்',
  2: 'இரண்டாயிரம்',
  3: 'மூவாயிரம்',
  4: 'நான்காயிரம்',
  5: 'ஐந்தாயிரம்',
  6: 'ஆறாயிரம்',
  7: 'ஏழாயிரம்',
  8: 'எட்டாயிரம்',
  9: 'ஒன்பதாயிரம்',
};

/** Combining forms for 1,000–9,000 (with remainder) */
const SINGLE_THOUSANDS_COMBINING: Record<number, string> = {
  1: 'ஆயிரத்து',
  2: 'இரண்டாயிரத்து',
  3: 'மூவாயிரத்து',
  4: 'நான்காயிரத்து',
  5: 'ஐந்தாயிரத்து',
  6: 'ஆறாயிரத்து',
  7: 'ஏழாயிரத்து',
  8: 'எட்டாயிரத்து',
  9: 'ஒன்பதாயிரத்து',
};

/** Standalone forms for round tens of thousands (no remainder) */
const TENS_THOUSAND: Record<number, string> = {
  10: 'பத்தாயிரம்',
  20: 'இருபதாயிரம்',
  30: 'முப்பதாயிரம்',
  40: 'நாற்பதாயிரம்',
  50: 'ஐம்பதாயிரம்',
  60: 'அறுபதாயிரம்',
  70: 'எழுபதாயிரம்',
  80: 'எண்பதாயிரம்',
  90: 'தொண்ணூறாயிரம்',
};

/** Combining forms for round tens of thousands (with remainder) */
const TENS_THOUSAND_COMBINING: Record<number, string> = {
  10: 'பத்தாயிரத்து',
  20: 'இருபதாயிரத்து',
  30: 'முப்பதாயிரத்து',
  40: 'நாற்பதாயிரத்து',
  50: 'ஐம்பதாயிரத்து',
  60: 'அறுபதாயிரத்து',
  70: 'எழுபதாயிரத்து',
  80: 'எண்பதாயிரத்து',
  90: 'தொண்ணூறாயிரத்து',
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Convert a number 1–99 to Tamil words.
 * Returns empty string for 0.
 */
function twoDigitToWords(n: number): string {
  if (n === 0) return '';
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n];

  const onesDigit = n % 10;
  const tensBase = n - onesDigit;

  if (onesDigit === 0) return TENS[tensBase];
  return `${TENS_COMBINING[tensBase]} ${ONES[onesDigit]}`;
}

/**
 * Convert a number 0–999 to Tamil words.
 */
function threeDigitToWords(n: number): string {
  if (n === 0) return '';
  if (n < 100) return twoDigitToWords(n);

  const hundredsDigit = Math.floor(n / 100);
  const remainder = n % 100;

  if (remainder === 0) return HUNDREDS[hundredsDigit];
  return `${HUNDREDS_COMBINING[hundredsDigit]} ${twoDigitToWords(remainder)}`;
}

/**
 * Build the thousands segment (the multiplier × 1,000).
 *
 * @param multiplier  1–99 (the number of thousands)
 * @param hasRemainder  whether there are hundreds/tens/ones after the thousands
 */
function thousandsToWords(multiplier: number, hasRemainder: boolean): string {
  // --- Single-digit thousands (1–9): joined form ---
  if (multiplier < 10) {
    return hasRemainder
      ? SINGLE_THOUSANDS_COMBINING[multiplier]
      : SINGLE_THOUSANDS[multiplier];
  }

  // --- Teens thousands (10–19): word + space + ஆயிரம்/ஆயிரத்து ---
  if (multiplier < 20) {
    if (multiplier === 10) {
      // Round 10 thousand – joined form
      return hasRemainder ? TENS_THOUSAND_COMBINING[10] : TENS_THOUSAND[10];
    }
    const teenWord = TEENS[multiplier];
    return hasRemainder
      ? `${teenWord} ஆயிரத்து`
      : `${teenWord} ஆயிரம்`;
  }

  // --- Round tens of thousands (20,30…90): joined form ---
  const onesDigit = multiplier % 10;
  const tensBase = multiplier - onesDigit;

  if (onesDigit === 0) {
    return hasRemainder
      ? TENS_THOUSAND_COMBINING[tensBase]
      : TENS_THOUSAND[tensBase];
  }

  // --- Compound tens of thousands (21–99 non-round) ---
  // Pattern: combining-ten + single-thousand-joined
  // e.g. 25,000 = இருபத்தி ஐந்தாயிரம்
  const singleThousandPart = hasRemainder
    ? SINGLE_THOUSANDS_COMBINING[onesDigit]
    : SINGLE_THOUSANDS[onesDigit];

  return `${TENS_COMBINING[tensBase]} ${singleThousandPart}`;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Convert a positive integer (Indian Rupees amount) to Tamil cardinal words.
 *
 * @param num  A non-negative integer within Number.MAX_SAFE_INTEGER
 * @returns    Tamil cardinal wording as a Unicode string
 * @throws     Error for invalid inputs (negative, decimal, NaN, Infinity, out of range)
 *
 * @example
 * tamilNumberToWords(1500)   // 'ஆயிரத்து ஐநூறு'
 * tamilNumberToWords(100000) // 'ஒரு லட்சம்'
 */
export function tamilNumberToWords(num: number): string {
  // --- Input validation ---
  if (typeof num !== 'number' || Number.isNaN(num)) {
    throw new Error('Input must be a valid number');
  }
  if (!Number.isFinite(num)) {
    throw new Error('Input must be a finite number');
  }
  if (!Number.isInteger(num)) {
    throw new Error('Input must be an integer');
  }
  if (num < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  if (num > Number.MAX_SAFE_INTEGER) {
    throw new Error('Input exceeds safe integer range');
  }

  // --- Special case: zero ---
  if (num === 0) return 'பூஜ்ஜியம்';

  const parts: string[] = [];
  let remaining = num;

  // --- Crores (1,00,00,000) ---
  const crores = Math.floor(remaining / 10000000);
  remaining %= 10000000;

  if (crores > 0) {
    const crorePrefix = crores === 1 ? 'ஒரு' : twoDigitToWords(crores);
    if (remaining > 0) {
      parts.push(`${crorePrefix} கோடியே`);
    } else {
      parts.push(`${crorePrefix} கோடி`);
    }
  }

  // --- Lakhs (1,00,000) ---
  const lakhs = Math.floor(remaining / 100000);
  remaining %= 100000;

  if (lakhs > 0) {
    const lakhPrefix = lakhs === 1 ? 'ஒரு' : twoDigitToWords(lakhs);
    if (remaining > 0) {
      parts.push(`${lakhPrefix} லட்சத்து`);
    } else {
      parts.push(`${lakhPrefix} லட்சம்`);
    }
  }

  // --- Thousands (1,000) ---
  const thousands = Math.floor(remaining / 1000);
  remaining %= 1000;

  if (thousands > 0) {
    parts.push(thousandsToWords(thousands, remaining > 0));
  }

  // --- Hundreds, tens, ones (0–999) ---
  if (remaining > 0) {
    parts.push(threeDigitToWords(remaining));
  }

  return parts.join(' ');
}
