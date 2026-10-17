import React from 'react';
import type { RentalFormData, ValidationErrors } from '../types/rentalAgreement';

interface OwnerDetailsProps {
  formData: RentalFormData;
  errors: ValidationErrors;
  onChange: <K extends keyof RentalFormData>(field: K, value: RentalFormData[K]) => void;
  disabled?: boolean;
}

export const OwnerDetails: React.FC<OwnerDetailsProps> = ({
  formData,
  errors,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-number">1</span> House Owner Details / வீட்டு உரிமையாளர் விவரங்கள்
      </h2>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="ownerName" className="form-label">
            House Owner Name / உரிமையாளர் பெயர் <span className="required-star">*</span>
          </label>
          <input
            id="ownerName"
            type="text"
            className={`form-input ${errors.ownerName ? 'input-error' : ''}`}
            placeholder="e.g. S. Ramanathan / எஸ். ராமநாதன்"
            value={formData.ownerName}
            onChange={(e) => onChange('ownerName', e.target.value)}
            disabled={disabled}
            autoComplete="name"
          />
          {errors.ownerName && (
            <p className="error-message" role="alert">
              {errors.ownerName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ownerAge" className="form-label">
            House Owner Age / வயது <span className="required-star">*</span>
          </label>
          <input
            id="ownerAge"
            type="number"
            min="18"
            max="120"
            className={`form-input ${errors.ownerAge ? 'input-error' : ''}`}
            placeholder="e.g. 52"
            value={formData.ownerAge}
            onChange={(e) => onChange('ownerAge', e.target.value)}
            disabled={disabled}
          />
          {errors.ownerAge && (
            <p className="error-message" role="alert">
              {errors.ownerAge}
            </p>
          )}
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="ownerAddress" className="form-label">
          House Owner Permanent Address / உரிமையாளர் முகவரி <span className="required-star">*</span>
        </label>
        <textarea
          id="ownerAddress"
          rows={3}
          className={`form-textarea ${errors.ownerAddress ? 'input-error' : ''}`}
          placeholder="Enter complete residential address with door no, street, area, city, pincode"
          value={formData.ownerAddress}
          onChange={(e) => onChange('ownerAddress', e.target.value)}
          disabled={disabled}
        />
        {errors.ownerAddress && (
          <p className="error-message" role="alert">
            {errors.ownerAddress}
          </p>
        )}
      </div>
    </div>
  );
};
