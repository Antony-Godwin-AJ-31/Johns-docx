import React from 'react';
import type { RentalFormData, ValidationErrors } from '../types/rentalAgreement';
import { formatINR, parseINRInput } from '../lib/formatCurrency';
import { tamilNumberToWords } from '../lib/tamilNumberToWords';

interface FinancialDetailsProps {
  formData: RentalFormData;
  errors: ValidationErrors;
  onChange: <K extends keyof RentalFormData>(field: K, value: RentalFormData[K]) => void;
  disabled?: boolean;
}

export const FinancialDetails: React.FC<FinancialDetailsProps> = ({
  formData,
  errors,
  onChange,
  disabled = false,
}) => {
  // Helper to safely get Tamil words for live preview
  const getTamilWordsPreview = (val: string): string | null => {
    const num = parseINRInput(val);
    if (!Number.isNaN(num) && num > 0 && num <= Number.MAX_SAFE_INTEGER) {
      try {
        return tamilNumberToWords(num);
      } catch {
        return null;
      }
    }
    return null;
  };

  const advanceNum = parseINRInput(formData.advanceAmount);
  const rentNum = parseINRInput(formData.rentAmount);

  const advanceTamilWords = getTamilWordsPreview(formData.advanceAmount);
  const rentTamilWords = getTamilWordsPreview(formData.rentAmount);

  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-number">4</span> Financial Details / நிதி விவரங்கள்
      </h2>

      <div className="form-grid">
        {/* Field D1: Advance Amount */}
        <div className="form-group">
          <label htmlFor="advanceAmount" className="form-label">
            Advance / Security Deposit (INR) / முன்பணம் <span className="required-star">*</span>
          </label>
          <div className="currency-input-wrapper">
            <span className="currency-prefix">₹</span>
            <input
              id="advanceAmount"
              type="text"
              inputMode="numeric"
              className={`form-input currency-input ${errors.advanceAmount ? 'input-error' : ''}`}
              placeholder="e.g. 50000"
              value={formData.advanceAmount}
              onChange={(e) => {
                // Allow only digits and commas
                const raw = e.target.value.replace(/[^0-9,]/g, '');
                onChange('advanceAmount', raw);
              }}
              disabled={disabled}
            />
          </div>

          {!Number.isNaN(advanceNum) && advanceNum > 0 && (
            <div className="preview-badge">
              <span className="preview-formatted">{formatINR(advanceNum)}</span>
              {advanceTamilWords && (
                <span className="preview-tamil"> ({advanceTamilWords})</span>
              )}
            </div>
          )}

          {errors.advanceAmount && (
            <p className="error-message" role="alert">
              {errors.advanceAmount}
            </p>
          )}
        </div>

        {/* Field D2: Monthly Rental Amount */}
        <div className="form-group">
          <label htmlFor="rentAmount" className="form-label">
            Monthly Rent (INR) / மாத வாடகை <span className="required-star">*</span>
          </label>
          <div className="currency-input-wrapper">
            <span className="currency-prefix">₹</span>
            <input
              id="rentAmount"
              type="text"
              inputMode="numeric"
              className={`form-input currency-input ${errors.rentAmount ? 'input-error' : ''}`}
              placeholder="e.g. 12000"
              value={formData.rentAmount}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9,]/g, '');
                onChange('rentAmount', raw);
              }}
              disabled={disabled}
            />
          </div>

          {!Number.isNaN(rentNum) && rentNum > 0 && (
            <div className="preview-badge">
              <span className="preview-formatted">{formatINR(rentNum)}</span>
              {rentTamilWords && (
                <span className="preview-tamil"> ({rentTamilWords})</span>
              )}
            </div>
          )}

          {errors.rentAmount && (
            <p className="error-message" role="alert">
              {errors.rentAmount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
