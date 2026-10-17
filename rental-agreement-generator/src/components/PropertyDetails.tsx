import React from 'react';
import { FLOOR_OPTIONS } from '../types/rentalAgreement';
import type { RentalFormData, ValidationErrors, FloorOption } from '../types/rentalAgreement';

interface PropertyDetailsProps {
  formData: RentalFormData;
  errors: ValidationErrors;
  onChange: <K extends keyof RentalFormData>(field: K, value: RentalFormData[K]) => void;
  disabled?: boolean;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  formData,
  errors,
  onChange,
  disabled = false,
}) => {
  const handleCopyOwnerAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange('propertyAddress', formData.ownerAddress);
    }
  };

  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-number">3</span> Rental Property Details / வாடகை சொத்து விவரங்கள்
      </h2>

      <div className="form-group full-width">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label htmlFor="propertyAddress" className="form-label">
            Address of Rented Property / வாடகைக்கு விடப்படும் வீட்டின் முகவரி <span className="required-star">*</span>
          </label>
          {formData.ownerAddress && (
            <label style={{ fontSize: '0.825rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-primary)' }}>
              <input
                type="checkbox"
                onChange={handleCopyOwnerAddress}
                disabled={disabled}
              />
              <span>Same as Owner Address / உரிமையாளர் முகவரியே</span>
            </label>
          )}
        </div>
        <textarea
          id="propertyAddress"
          rows={3}
          className={`form-textarea ${errors.propertyAddress ? 'input-error' : ''}`}
          placeholder="Enter exact address of the house being rented"
          value={formData.propertyAddress}
          onChange={(e) => onChange('propertyAddress', e.target.value)}
          disabled={disabled}
        />
        {errors.propertyAddress && (
          <p className="error-message" role="alert">
            {errors.propertyAddress}
          </p>
        )}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="houseFloor" className="form-label">
            Floor of the House / வீட்டின் தளம் <span className="required-star">*</span>
          </label>
          <select
            id="houseFloor"
            className={`form-select ${errors.houseFloor ? 'input-error' : ''}`}
            value={formData.houseFloor}
            onChange={(e) => {
              const val = e.target.value as FloorOption | '';
              onChange('houseFloor', val);
              if (val !== 'Other') {
                onChange('customFloor', '');
              }
            }}
            disabled={disabled}
          >
            <option value="">-- Select Floor / தளத்தைத் தேர்ந்தெடுக்கவும் --</option>
            {FLOOR_OPTIONS.map((floor) => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
          </select>
          {errors.houseFloor && (
            <p className="error-message" role="alert">
              {errors.houseFloor}
            </p>
          )}
        </div>

        {formData.houseFloor === 'Other' && (
          <div className="form-group">
            <label htmlFor="customFloor" className="form-label">
              Specify Floor / குறிப்பிட்ட தளம் <span className="required-star">*</span>
            </label>
            <input
              id="customFloor"
              type="text"
              className={`form-input ${errors.customFloor ? 'input-error' : ''}`}
              placeholder="e.g. Fourth Floor, Penthouse, Basement"
              value={formData.customFloor}
              onChange={(e) => onChange('customFloor', e.target.value)}
              disabled={disabled}
              autoFocus
            />
            {errors.customFloor && (
              <p className="error-message" role="alert">
                {errors.customFloor}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
