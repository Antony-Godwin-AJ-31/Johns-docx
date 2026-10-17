/**
 * Template Mappings and Localization Helpers for Rental Agreement Generator.
 */

import type { FloorOption, SalutationOption } from '../types/rentalAgreement';

const TAMIL_MONTHS: Record<number, string> = {
  1: 'ஜனவரி',
  2: 'பிப்ரவரி',
  3: 'மார்ச்',
  4: 'ஏப்ரல்',
  5: 'மே',
  6: 'ஜூன்',
  7: 'ஜூலை',
  8: 'ஆகஸ்ட்',
  9: 'செப்டம்பர்',
  10: 'அக்டோபர்',
  11: 'நவம்பர்',
  12: 'டிசம்பர்',
};

const ENGLISH_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

/**
 * Format a YYYY-MM-DD date into English legal string: "17th October 2026"
 */
export function formatEnglishDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  const monthName = ENGLISH_MONTHS[m - 1] || '';
  return `${d}${getOrdinalSuffix(d)} ${monthName} ${y}`;
}

/**
 * Format a YYYY-MM-DD date into Tamil legal string: "17 அக்டோபர் 2026"
 */
export function formatTamilDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  const monthName = TAMIL_MONTHS[m] || '';
  return `${d} ${monthName} ${y}`;
}

export function getEffectiveFloor(
  houseFloor: FloorOption | '',
  customFloor: string,
  lang: 'english' | 'tamil' = 'english'
): string {
  if (houseFloor === 'Other') {
    return customFloor.trim();
  }

  if (lang === 'tamil') {
    switch (houseFloor) {
      case 'Ground Floor':
        return 'தரைத்தளம்';
      case 'First Floor':
        return 'முதல் தளம்';
      case 'Second Floor':
        return 'இரண்டாம் தளம்';
      case 'Third Floor':
        return 'மூன்றாம் தளம்';
      default:
        return houseFloor;
    }
  }

  return houseFloor;
}

export function getEffectiveSalutation(
  salutation: SalutationOption,
  lang: 'english' | 'tamil' = 'english'
): string {
  if (lang === 'tamil') {
    switch (salutation) {
      case 'Mr.':
        return 'திரு.';
      case 'Mrs.':
        return 'திருமதி.';
      case 'Ms.':
        return 'செல்வி.';
      default:
        return salutation;
    }
  }
  return salutation;
}

export function getRenterRelationship(
  renterSalutation: SalutationOption,
  lang: 'english' | 'tamil' = 'english'
): string {
  if (lang === 'tamil') {
    return renterSalutation === 'Mr.' ? 'மகன்' : 'மகள்';
  }
  return renterSalutation === 'Mr.' ? 'son' : 'daughter';
}

