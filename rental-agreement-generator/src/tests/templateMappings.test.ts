import { describe, it, expect } from 'vitest';
import {
  formatEnglishDate,
  formatTamilDate,
  getEffectiveFloor,
  getEffectiveSalutation,
  getRenterRelationship,
} from '../lib/templateMappings';

describe('templateMappings and localization', () => {
  describe('date formatting', () => {
    it('formats date into English legal form with ordinal', () => {
      expect(formatEnglishDate('2026-10-17')).toBe('17th October 2026');
      expect(formatEnglishDate('2026-01-01')).toBe('1st January 2026');
      expect(formatEnglishDate('2026-05-02')).toBe('2nd May 2026');
      expect(formatEnglishDate('2026-03-03')).toBe('3rd March 2026');
    });

    it('formats date into Tamil legal form', () => {
      expect(formatTamilDate('2026-10-17')).toBe('17 அக்டோபர் 2026');
      expect(formatTamilDate('2026-01-01')).toBe('1 ஜனவரி 2026');
    });
  });

  describe('floor translation', () => {
    it('returns English floor names for English document', () => {
      expect(getEffectiveFloor('Ground Floor', '', 'english')).toBe('Ground Floor');
      expect(getEffectiveFloor('First Floor', '', 'english')).toBe('First Floor');
    });

    it('translates standard floors to Tamil for Tamil document', () => {
      expect(getEffectiveFloor('Ground Floor', '', 'tamil')).toBe('தரைத்தளம்');
      expect(getEffectiveFloor('First Floor', '', 'tamil')).toBe('முதல் தளம்');
      expect(getEffectiveFloor('Second Floor', '', 'tamil')).toBe('இரண்டாம் தளம்');
      expect(getEffectiveFloor('Third Floor', '', 'tamil')).toBe('மூன்றாம் தளம்');
    });

    it('preserves custom floor for Other', () => {
      expect(getEffectiveFloor('Other', 'Penthouse', 'english')).toBe('Penthouse');
      expect(getEffectiveFloor('Other', 'நான்காம் தளம்', 'tamil')).toBe('நான்காம் தளம்');
    });
  });

  describe('salutation translation', () => {
    it('translates salutations to Tamil', () => {
      expect(getEffectiveSalutation('Mr.', 'tamil')).toBe('திரு.');
      expect(getEffectiveSalutation('Mrs.', 'tamil')).toBe('திருமதி.');
      expect(getEffectiveSalutation('Ms.', 'tamil')).toBe('செல்வி.');
    });

    it('keeps salutations in English for English document', () => {
      expect(getEffectiveSalutation('Mr.', 'english')).toBe('Mr.');
      expect(getEffectiveSalutation('Mrs.', 'english')).toBe('Mrs.');
      expect(getEffectiveSalutation('Ms.', 'english')).toBe('Ms.');
    });
  });

  describe('renter relationship translation', () => {
    it('returns மகன் for Mr. in Tamil and son in English', () => {
      expect(getRenterRelationship('Mr.', 'tamil')).toBe('மகன்');
      expect(getRenterRelationship('Mr.', 'english')).toBe('son');
    });

    it('returns மகள் for Mrs. and Ms. in Tamil and daughter in English', () => {
      expect(getRenterRelationship('Mrs.', 'tamil')).toBe('மகள்');
      expect(getRenterRelationship('Ms.', 'tamil')).toBe('மகள்');
      expect(getRenterRelationship('Mrs.', 'english')).toBe('daughter');
      expect(getRenterRelationship('Ms.', 'english')).toBe('daughter');
    });
  });
});
