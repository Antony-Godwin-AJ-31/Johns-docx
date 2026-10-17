import { describe, it, expect } from 'vitest';
import { validateForm, isFormValid } from '../lib/validation';
import type { RentalFormData } from '../types/rentalAgreement';

describe('validation', () => {
  const validData: RentalFormData = {
    agreementDate: '2026-10-17',
    startDate: '2026-11-01',
    endDate: '2027-09-30',
    ownerName: 'S. Ramanathan',
    ownerAge: '52',
    ownerAddress: 'No. 12, 1st Cross, Anna Nagar, Chennai - 600040',
    renterSalutation: 'Mr.',
    renterName: 'மு. கார்த்திக்',
    renterAge: '30',
    renterAddress: 'No. 45, Gandhi Street, Madurai - 625001',
    parentSalutation: 'Mr.',
    parentName: 'கே. முருகன்',
    propertyAddress: 'No. 12, 1st Cross, Anna Nagar, Chennai - 600040',
    houseFloor: 'First Floor',
    customFloor: '',
    advanceAmount: '50000',
    rentAmount: '12000',
    language: 'both',
  };

  it('passes validation with complete and valid data', () => {
    const errors = validateForm(validData);
    expect(isFormValid(errors)).toBe(true);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('accepts Tamil Unicode names without error', () => {
    const data: RentalFormData = {
      ...validData,
      ownerName: 'சுந்தரம் பிள்ளை',
      renterName: 'அருண் குமார்',
      parentName: 'சுப்பிரமணியன்',
    };
    const errors = validateForm(data);
    expect(errors.ownerName).toBeUndefined();
    expect(errors.renterName).toBeUndefined();
    expect(errors.parentName).toBeUndefined();
  });

  it('rejects empty or whitespace-only names', () => {
    const data: RentalFormData = {
      ...validData,
      ownerName: '   ',
      renterName: '',
      parentName: ' \t\n ',
    };
    const errors = validateForm(data);
    expect(errors.ownerName).toBeDefined();
    expect(errors.renterName).toBeDefined();
    expect(errors.parentName).toBeDefined();
  });

  it('validates property address', () => {
    expect(validateForm({ ...validData, propertyAddress: '' }).propertyAddress).toBeDefined();
    expect(validateForm({ ...validData, propertyAddress: 'Plot 4, KK Nagar' }).propertyAddress).toBeUndefined();
  });

  it('validates agreement dates', () => {
    expect(validateForm({ ...validData, agreementDate: '' }).agreementDate).toBeDefined();
    expect(validateForm({ ...validData, startDate: '' }).startDate).toBeDefined();
    expect(validateForm({ ...validData, endDate: '' }).endDate).toBeDefined();
  });

  it('validates ages as positive integers', () => {
    expect(validateForm({ ...validData, ownerAge: '45' }).ownerAge).toBeUndefined();
    expect(validateForm({ ...validData, renterAge: '18' }).renterAge).toBeUndefined();

    expect(validateForm({ ...validData, ownerAge: '0' }).ownerAge).toBeDefined();
    expect(validateForm({ ...validData, ownerAge: '-5' }).ownerAge).toBeDefined();
    expect(validateForm({ ...validData, ownerAge: '35.5' }).ownerAge).toBeDefined();
    expect(validateForm({ ...validData, ownerAge: 'abc' }).ownerAge).toBeDefined();
  });

  it('validates monetary amounts as positive whole numbers', () => {
    expect(validateForm({ ...validData, advanceAmount: '50000' }).advanceAmount).toBeUndefined();
    expect(validateForm({ ...validData, advanceAmount: '50,000' }).advanceAmount).toBeUndefined();
    expect(validateForm({ ...validData, rentAmount: '12,000' }).rentAmount).toBeUndefined();

    expect(validateForm({ ...validData, advanceAmount: '0' }).advanceAmount).toBeDefined();
    expect(validateForm({ ...validData, advanceAmount: '-5000' }).advanceAmount).toBeDefined();
    expect(validateForm({ ...validData, advanceAmount: 'abc' }).advanceAmount).toBeDefined();
  });

  it('validates floor selection and conditional custom floor', () => {
    expect(validateForm({ ...validData, houseFloor: '' }).houseFloor).toBeDefined();
    expect(validateForm({ ...validData, houseFloor: 'Ground Floor' }).houseFloor).toBeUndefined();

    const missingCustom = validateForm({ ...validData, houseFloor: 'Other', customFloor: '  ' });
    expect(missingCustom.customFloor).toBeDefined();

    const validCustom = validateForm({
      ...validData,
      houseFloor: 'Other',
      customFloor: 'Fourth Floor (Penthouse)',
    });
    expect(validCustom.customFloor).toBeUndefined();
  });
});
