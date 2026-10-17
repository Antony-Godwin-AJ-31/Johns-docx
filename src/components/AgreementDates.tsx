import React from 'react';
import type { RentalFormData, ValidationErrors } from '../types/rentalAgreement';

interface AgreementDatesProps {
  formData: RentalFormData;
  errors: ValidationErrors;
  onChange: <K extends keyof RentalFormData>(field: K, value: RentalFormData[K]) => void;
  disabled?: boolean;
}

export const AgreementDates: React.FC<AgreementDatesProps> = ({
  formData,
  errors,
  onChange,
  disabled = false,
}) => {
  const handleStartDateChange = (val: string) => {
    onChange('startDate', val);
    // Auto-calculate 11 months later if val is valid date
    if (val) {
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        d.setMonth(d.getMonth() + 11);
        d.setDate(d.getDate() - 1); // 11 months duration ends 1 day prior
        const endStr = d.toISOString().split('T')[0];
        onChange('endDate', endStr);
      }
    }
  };

  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-number">📅</span> Agreement Dates &amp; Duration / ஒப்பந்தத் தேதிகள் மற்றும் காலம்
      </h2>
      <p className="section-help">
        Standard tenancy agreements run for 11 months. End date is calculated automatically.
      </p>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="agreementDate" className="form-label">
            Date of Execution / ஒப்பந்தத் தேதி <span className="required-star">*</span>
          </label>
          <input
            id="agreementDate"
            type="date"
            className={`form-input ${errors.agreementDate ? 'input-error' : ''}`}
            value={formData.agreementDate}
            onChange={(e) => onChange('agreementDate', e.target.value)}
            disabled={disabled}
          />
          {errors.agreementDate && (
            <p className="error-message" role="alert">
              {errors.agreementDate}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="startDate" className="form-label">
            Tenancy Start Date / தொடங்கும் தேதி <span className="required-star">*</span>
          </label>
          <input
            id="startDate"
            type="date"
            className={`form-input ${errors.startDate ? 'input-error' : ''}`}
            value={formData.startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            disabled={disabled}
          />
          {errors.startDate && (
            <p className="error-message" role="alert">
              {errors.startDate}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="endDate" className="form-label">
            Tenancy End Date (11 Months) / முடிவடையும் தேதி <span className="required-star">*</span>
          </label>
          <input
            id="endDate"
            type="date"
            className={`form-input ${errors.endDate ? 'input-error' : ''}`}
            value={formData.endDate}
            onChange={(e) => onChange('endDate', e.target.value)}
            disabled={disabled}
          />
          {errors.endDate && (
            <p className="error-message" role="alert">
              {errors.endDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
