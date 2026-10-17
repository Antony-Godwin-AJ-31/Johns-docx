/**
 * Type definitions for the Rental Agreement Generator.
 * Updated to reflect all user-fillable fields identified in the template.
 */

export type DocumentLanguage = 'english' | 'tamil' | 'both';

export const FLOOR_OPTIONS = [
  'Ground Floor',
  'First Floor',
  'Second Floor',
  'Third Floor',
  'Other',
] as const;

export type FloorOption = (typeof FLOOR_OPTIONS)[number];

export const SALUTATION_OPTIONS = ['Mr.', 'Mrs.', 'Ms.'] as const;
export type SalutationOption = (typeof SALUTATION_OPTIONS)[number];

export interface RentalFormData {
  // Agreement Date & Duration
  agreementDate: string; // YYYY-MM-DD
  startDate: string;     // YYYY-MM-DD
  endDate: string;       // YYYY-MM-DD

  // Section A: House Owner Details
  ownerName: string;
  ownerAge: string;
  ownerAddress: string;

  // Section B: Renter Details
  renterSalutation: SalutationOption;
  renterName: string;
  renterAge: string;
  renterAddress: string;
  parentName: string;

  // Section C: Rental Property Details
  propertyAddress: string;
  houseFloor: FloorOption | '';
  customFloor: string;

  // Section D: Financial Details
  advanceAmount: string;
  rentAmount: string;

  // Section E: Document Language
  language: DocumentLanguage;
}

export const INITIAL_FORM_DATA: RentalFormData = {
  agreementDate: new Date().toISOString().split('T')[0],
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 11)).toISOString().split('T')[0],
  ownerName: '',
  ownerAge: '',
  ownerAddress: '',
  renterSalutation: 'Mr.',
  renterName: '',
  renterAge: '',
  renterAddress: '',
  parentName: '',
  propertyAddress: '',
  houseFloor: '',
  customFloor: '',
  advanceAmount: '',
  rentAmount: '',
  language: 'english',
};

export type ValidationErrors = Partial<Record<keyof RentalFormData, string>>;

export interface GenerationResult {
  success: boolean;
  englishBlob?: Blob;
  tamilBlob?: Blob;
  englishFilename?: string;
  tamilFilename?: string;
  error?: string;
  englishError?: string;
  tamilError?: string;
}
