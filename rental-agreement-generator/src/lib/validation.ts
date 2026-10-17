/**
 * Form validation for the Rental Agreement Generator.
 * Validates all required template fields.
 */

import type { RentalFormData, ValidationErrors } from '../types/rentalAgreement';

function isNonEmpty(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveInteger(value: string): boolean {
  if (!value.trim()) return false;
  const num = Number(value);
  return Number.isInteger(num) && num > 0 && num <= Number.MAX_SAFE_INTEGER;
}

function isValidAmount(value: string): boolean {
  const cleaned = value.replace(/[₹,\s]/g, '');
  if (!cleaned || !/^\d+$/.test(cleaned)) return false;
  const num = parseInt(cleaned, 10);
  return num > 0 && num <= Number.MAX_SAFE_INTEGER;
}

export function parseAmount(value: string): number {
  const cleaned = value.replace(/[₹,\s]/g, '');
  if (!cleaned || !/^\d+$/.test(cleaned)) return 0;
  return parseInt(cleaned, 10);
}

export function validateForm(data: RentalFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Agreement Dates
  if (!isNonEmpty(data.agreementDate)) {
    errors.agreementDate = 'Agreement date is required.';
  }
  if (!isNonEmpty(data.startDate)) {
    errors.startDate = 'Agreement start date is required.';
  }
  if (!isNonEmpty(data.endDate)) {
    errors.endDate = 'Agreement end date is required.';
  }

  // Section A: House Owner Details
  if (!isNonEmpty(data.ownerName)) {
    errors.ownerName = 'House owner name is required.';
  }
  if (!isNonEmpty(data.ownerAge)) {
    errors.ownerAge = 'House owner age is required.';
  } else if (!isPositiveInteger(data.ownerAge)) {
    errors.ownerAge = 'Age must be a positive whole number.';
  }
  if (!isNonEmpty(data.ownerAddress)) {
    errors.ownerAddress = 'House owner address is required.';
  }

  // Section B: Renter Details
  if (!isNonEmpty(data.renterName)) {
    errors.renterName = 'Renter name is required.';
  }
  if (!isNonEmpty(data.renterAge)) {
    errors.renterAge = 'Renter age is required.';
  } else if (!isPositiveInteger(data.renterAge)) {
    errors.renterAge = 'Age must be a positive whole number.';
  }
  if (!isNonEmpty(data.renterAddress)) {
    errors.renterAddress = 'Renter permanent address is required.';
  }
  if (!isNonEmpty(data.parentName)) {
    errors.parentName = "Renter's parent name is required.";
  }

  // Section C: Rental Property Details
  if (!isNonEmpty(data.propertyAddress)) {
    errors.propertyAddress = 'Address of the house to be rented is required.';
  }
  if (!data.houseFloor) {
    errors.houseFloor = 'Please select the floor of the house.';
  } else if (data.houseFloor === 'Other' && !isNonEmpty(data.customFloor)) {
    errors.customFloor = 'Please specify the floor.';
  }

  // Section D: Financial Details
  if (!isNonEmpty(data.advanceAmount)) {
    errors.advanceAmount = 'Advance / security deposit amount is required.';
  } else if (!isValidAmount(data.advanceAmount)) {
    errors.advanceAmount = 'Please enter a valid positive whole number amount.';
  }

  if (!isNonEmpty(data.rentAmount)) {
    errors.rentAmount = 'Monthly rental amount is required.';
  } else if (!isValidAmount(data.rentAmount)) {
    errors.rentAmount = 'Please enter a valid positive whole number amount.';
  }

  return errors;
}

export function isFormValid(errors: ValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
