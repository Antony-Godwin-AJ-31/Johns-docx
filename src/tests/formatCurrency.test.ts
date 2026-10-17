import { describe, it, expect } from 'vitest';
import {
  formatIndianNumber,
  formatINR,
  parseINRInput,
} from '../lib/formatCurrency';

describe('formatCurrency', () => {
  describe('formatIndianNumber', () => {
    it('formats single digits and numbers below 1000 without commas', () => {
      expect(formatIndianNumber(0)).toBe('0');
      expect(formatIndianNumber(5)).toBe('5');
      expect(formatIndianNumber(99)).toBe('99');
      expect(formatIndianNumber(999)).toBe('999');
    });

    it('formats thousands correctly (one comma before last 3 digits)', () => {
      expect(formatIndianNumber(1000)).toBe('1,000');
      expect(formatIndianNumber(5000)).toBe('5,000');
      expect(formatIndianNumber(12000)).toBe('12,000');
      expect(formatIndianNumber(50000)).toBe('50,000');
      expect(formatIndianNumber(99999)).toBe('99,999');
    });

    it('formats lakhs correctly (2, 2, 3 grouping)', () => {
      expect(formatIndianNumber(100000)).toBe('1,00,000');
      expect(formatIndianNumber(150000)).toBe('1,50,000');
      expect(formatIndianNumber(1000000)).toBe('10,00,000');
    });

    it('formats crores correctly', () => {
      expect(formatIndianNumber(10000000)).toBe('1,00,00,000');
      expect(formatIndianNumber(12345678)).toBe('1,23,45,678');
    });

    it('throws error for negative numbers or non-integers', () => {
      expect(() => formatIndianNumber(-100)).toThrow();
      expect(() => formatIndianNumber(10.5)).toThrow();
    });
  });

  describe('formatINR', () => {
    it('prefixes formatted number with ₹ symbol', () => {
      expect(formatINR(50000)).toBe('₹50,000');
      expect(formatINR(12000)).toBe('₹12,000');
      expect(formatINR(100000)).toBe('₹1,00,000');
    });
  });

  describe('parseINRInput', () => {
    it('parses plain numeric strings', () => {
      expect(parseINRInput('50000')).toBe(50000);
      expect(parseINRInput('12000')).toBe(12000);
    });

    it('parses formatted strings with commas and ₹', () => {
      expect(parseINRInput('₹50,000')).toBe(50000);
      expect(parseINRInput('1,50,000')).toBe(150000);
      expect(parseINRInput('  ₹ 1,00,000  ')).toBe(100000);
    });

    it('returns NaN for invalid or empty inputs', () => {
      expect(Number.isNaN(parseINRInput(''))).toBe(true);
      expect(Number.isNaN(parseINRInput('abc'))).toBe(true);
      expect(Number.isNaN(parseINRInput('₹'))).toBe(true);
    });
  });
});
