import { describe, it, expect } from 'vitest';
import { tamilNumberToWords } from '../lib/tamilNumberToWords';

describe('tamilNumberToWords', () => {
  // -----------------------------------------------------------------------
  // 1. Required specification test cases (MUST pass exactly)
  // -----------------------------------------------------------------------
  describe('required specification cases', () => {
    it.each([
      [1000, 'ஆயிரம்'],
      [5000, 'ஐந்தாயிரம்'],
      [12000, 'பன்னிரண்டு ஆயிரம்'],
      [50000, 'ஐம்பதாயிரம்'],
      [100000, 'ஒரு லட்சம்'],
      [150000, 'ஒரு லட்சத்து ஐம்பதாயிரம்'],
      [1000000, 'பத்து லட்சம்'],
      [10000000, 'ஒரு கோடி'],
    ])('converts %d → %s', (input, expected) => {
      expect(tamilNumberToWords(input)).toBe(expected);
    });
  });

  // -----------------------------------------------------------------------
  // 2. Edge cases: zero, one, single digits
  // -----------------------------------------------------------------------
  describe('edge cases', () => {
    it('converts 0 to பூஜ்ஜியம்', () => {
      expect(tamilNumberToWords(0)).toBe('பூஜ்ஜியம்');
    });

    it('converts 1 to ஒன்று', () => {
      expect(tamilNumberToWords(1)).toBe('ஒன்று');
    });

    it.each([
      [2, 'இரண்டு'],
      [3, 'மூன்று'],
      [4, 'நான்கு'],
      [5, 'ஐந்து'],
      [6, 'ஆறு'],
      [7, 'ஏழு'],
      [8, 'எட்டு'],
      [9, 'ஒன்பது'],
    ])('converts single digit %d → %s', (input, expected) => {
      expect(tamilNumberToWords(input)).toBe(expected);
    });
  });

  // -----------------------------------------------------------------------
  // 3. Teens: 10–19
  // -----------------------------------------------------------------------
  describe('teens (10–19)', () => {
    it.each([
      [10, 'பத்து'],
      [11, 'பதினொன்று'],
      [12, 'பன்னிரண்டு'],
      [13, 'பதிமூன்று'],
      [14, 'பதினான்கு'],
      [15, 'பதினைந்து'],
      [16, 'பதினாறு'],
      [17, 'பதினேழு'],
      [18, 'பதினெட்டு'],
      [19, 'பத்தொன்பது'],
    ])('converts %d → %s', (input, expected) => {
      expect(tamilNumberToWords(input)).toBe(expected);
    });
  });

  // -----------------------------------------------------------------------
  // 4. Compound tens: 21, 25, 99
  // -----------------------------------------------------------------------
  describe('compound tens (20–99)', () => {
    it.each([
      [20, 'இருபது'],
      [21, 'இருபத்தி ஒன்று'],
      [25, 'இருபத்தி ஐந்து'],
      [30, 'முப்பது'],
      [42, 'நாற்பத்தி இரண்டு'],
      [50, 'ஐம்பது'],
      [63, 'அறுபத்தி மூன்று'],
      [70, 'எழுபது'],
      [80, 'எண்பது'],
      [90, 'தொண்ணூறு'],
      [99, 'தொண்ணூற்றி ஒன்பது'],
    ])('converts %d → %s', (input, expected) => {
      expect(tamilNumberToWords(input)).toBe(expected);
    });
  });

  // -----------------------------------------------------------------------
  // 5. Hundreds: 100, 200, 500, 999
  // -----------------------------------------------------------------------
  describe('hundreds (100–999)', () => {
    it.each([
      [100, 'நூறு'],
      [200, 'இருநூறு'],
      [300, 'முந்நூறு'],
      [400, 'நானூறு'],
      [500, 'ஐநூறு'],
      [600, 'அறுநூறு'],
      [700, 'எழுநூறு'],
      [800, 'எண்ணூறு'],
      [101, 'நூற்றி ஒன்று'],
      [115, 'நூற்றி பதினைந்து'],
      [250, 'இருநூற்றி ஐம்பது'],
      [375, 'முந்நூற்றி எழுபத்தி ஐந்து'],
      [999, 'தொள்ளாயிரத்து தொண்ணூற்றி ஒன்பது'],
    ])('converts %d → %s', (input, expected) => {
      expect(tamilNumberToWords(input)).toBe(expected);
    });
  });

  // -----------------------------------------------------------------------
  // 6. Irregular forms: 900 and 3000
  // -----------------------------------------------------------------------
  describe('irregular forms', () => {
    it('converts 900 (irregular) to தொள்ளாயிரம்', () => {
      expect(tamilNumberToWords(900)).toBe('தொள்ளாயிரம்');
    });

    it('converts 3000 (irregular) to மூவாயிரம்', () => {
      expect(tamilNumberToWords(3000)).toBe('மூவாயிரம்');
    });
  });

  // -----------------------------------------------------------------------
  // 7. Thousands with remainders
  // -----------------------------------------------------------------------
  describe('thousands with remainders', () => {
    it.each([
      [1500, 'ஆயிரத்து ஐநூறு'],
      [2500, 'இரண்டாயிரத்து ஐநூறு'],
      [1001, 'ஆயிரத்து ஒன்று'],
      [1010, 'ஆயிரத்து பத்து'],
      [1100, 'ஆயிரத்து நூறு'],
      [3500, 'மூவாயிரத்து ஐநூறு'],
      [9999, 'ஒன்பதாயிரத்து தொள்ளாயிரத்து தொண்ணூற்றி ஒன்பது'],
    ])('converts %d → %s', (input, expected) => {
      expect(tamilNumberToWords(input)).toBe(expected);
    });
  });

  // -----------------------------------------------------------------------
  // 8. Various lakh amounts
  // -----------------------------------------------------------------------
  describe('lakhs', () => {
    it.each([
      [100000, 'ஒரு லட்சம்'],
      [150000, 'ஒரு லட்சத்து ஐம்பதாயிரம்'],
      [200000, 'இரண்டு லட்சம்'],
      [250000, 'இரண்டு லட்சத்து ஐம்பதாயிரம்'],
      [500000, 'ஐந்து லட்சம்'],
      [999999, 'ஒன்பது லட்சத்து தொண்ணூற்றி ஒன்பதாயிரத்து தொள்ளாயிரத்து தொண்ணூற்றி ஒன்பது'],
      [1000000, 'பத்து லட்சம்'],
    ])('converts %d → %s', (input, expected) => {
      expect(tamilNumberToWords(input)).toBe(expected);
    });
  });

  // -----------------------------------------------------------------------
  // 9. Crore amounts
  // -----------------------------------------------------------------------
  describe('crores', () => {
    it.each([
      [10000000, 'ஒரு கோடி'],
      [15000000, 'ஒரு கோடியே ஐம்பது லட்சம்'],
      [20000000, 'இரண்டு கோடி'],
      [50000000, 'ஐந்து கோடி'],
    ])('converts %d → %s', (input, expected) => {
      expect(tamilNumberToWords(input)).toBe(expected);
    });
  });

  // -----------------------------------------------------------------------
  // 10. Large amounts (max practical range)
  // -----------------------------------------------------------------------
  describe('large amounts', () => {
    it('converts 99999999 (max practical range)', () => {
      const result = tamilNumberToWords(99999999);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
      // 99999999 = 9 crore 99 lakh 99 thousand 999
      expect(result).toBe(
        'ஒன்பது கோடியே தொண்ணூற்றி ஒன்பது லட்சத்து தொண்ணூற்றி ஒன்பதாயிரத்து தொள்ளாயிரத்து தொண்ணூற்றி ஒன்பது'
      );
    });

    it('converts 11111111', () => {
      const result = tamilNumberToWords(11111111);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });

  // -----------------------------------------------------------------------
  // 11. Invalid inputs
  // -----------------------------------------------------------------------
  describe('invalid inputs', () => {
    it('throws for negative numbers', () => {
      expect(() => tamilNumberToWords(-1)).toThrow('non-negative');
    });

    it('throws for decimal numbers', () => {
      expect(() => tamilNumberToWords(1.5)).toThrow('integer');
    });

    it('throws for NaN', () => {
      expect(() => tamilNumberToWords(NaN)).toThrow();
    });

    it('throws for Infinity', () => {
      expect(() => tamilNumberToWords(Infinity)).toThrow('finite');
    });

    it('throws for negative Infinity', () => {
      expect(() => tamilNumberToWords(-Infinity)).toThrow('finite');
    });
  });

  // -----------------------------------------------------------------------
  // 12. Deterministic output
  // -----------------------------------------------------------------------
  describe('determinism', () => {
    it('returns identical output for identical input across multiple calls', () => {
      const testValues = [0, 1, 42, 100, 999, 1000, 5000, 12000, 50000, 100000, 150000, 1000000, 10000000];
      for (const val of testValues) {
        const first = tamilNumberToWords(val);
        const second = tamilNumberToWords(val);
        const third = tamilNumberToWords(val);
        expect(first).toBe(second);
        expect(second).toBe(third);
      }
    });
  });

  // -----------------------------------------------------------------------
  // Tens of thousands (additional coverage)
  // -----------------------------------------------------------------------
  describe('tens of thousands', () => {
    it.each([
      [10000, 'பத்தாயிரம்'],
      [20000, 'இருபதாயிரம்'],
      [25000, 'இருபத்தி ஐந்தாயிரம்'],
      [30000, 'முப்பதாயிரம்'],
      [90000, 'தொண்ணூறாயிரம்'],
      [99000, 'தொண்ணூற்றி ஒன்பதாயிரம்'],
    ])('converts %d → %s', (input, expected) => {
      expect(tamilNumberToWords(input)).toBe(expected);
    });
  });
});
