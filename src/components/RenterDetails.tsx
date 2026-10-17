import React from 'react';
import { SALUTATION_OPTIONS } from '../types/rentalAgreement';
import type { RentalFormData, ValidationErrors, SalutationOption } from '../types/rentalAgreement';

interface RenterDetailsProps {
  formData: RentalFormData;
  errors: ValidationErrors;
  onChange: <K extends keyof RentalFormData>(field: K, value: RentalFormData[K]) => void;
  disabled?: boolean;
}

export const RenterDetails: React.FC<RenterDetailsProps> = ({
  formData,
  errors,
  onChange,
  disabled = false,
}) => {
  const isSon = formData.renterSalutation === 'Mr.';
  const relationshipBadge = isSon ? 'மகன் / Son of' : 'மகள் / Daughter of';

  return (
    <div className="form-section">
      <h2 className="section-title">
        <span className="section-number">2</span> Renter (Tenant) Details / வாடகைதாரர் விவரங்கள்
      </h2>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="renterName" className="form-label">
            Renter Name / வாடகைதாரர் பெயர் <span className="required-star">*</span>
          </label>
          <div className="salutation-input-group">
            <select
              className="form-select salutation-select"
              value={formData.renterSalutation}
              onChange={(e) => onChange('renterSalutation', e.target.value as SalutationOption)}
              disabled={disabled}
              aria-label="Renter Salutation"
            >
              {SALUTATION_OPTIONS.map((sal) => (
                <option key={sal} value={sal}>
                  {sal} {sal === 'Mr.' ? '(திரு.)' : sal === 'Mrs.' ? '(திருமதி.)' : '(செல்வி.)'}
                </option>
              ))}
            </select>
            <input
              id="renterName"
              type="text"
              className={`form-input ${errors.renterName ? 'input-error' : ''}`}
              placeholder="e.g. M. Karthik / மு. கார்த்திக்"
              value={formData.renterName}
              onChange={(e) => onChange('renterName', e.target.value)}
              disabled={disabled}
              autoComplete="name"
            />
          </div>
          {errors.renterName && (
            <p className="error-message" role="alert">
              {errors.renterName}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="renterAge" className="form-label">
            Renter Age / வயது <span className="required-star">*</span>
          </label>
          <input
            id="renterAge"
            type="number"
            min="18"
            max="120"
            className={`form-input ${errors.renterAge ? 'input-error' : ''}`}
            placeholder="e.g. 30"
            value={formData.renterAge}
            onChange={(e) => onChange('renterAge', e.target.value)}
            disabled={disabled}
          />
          {errors.renterAge && (
            <p className="error-message" role="alert">
              {errors.renterAge}
            </p>
          )}
        </div>
      </div>

      <div className="form-group full-width">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
          <label htmlFor="parentName" className="form-label">
            Renter&apos;s Parent Name / பெற்றோர் பெயர் <span className="required-star">*</span>
          </label>
          <span className="relationship-indicator-badge">
            {relationshipBadge}
          </span>
        </div>
        <div className="salutation-input-group">
          <select
            className="form-select salutation-select"
            value={formData.parentSalutation}
            onChange={(e) => onChange('parentSalutation', e.target.value as SalutationOption)}
            disabled={disabled}
            aria-label="Parent Salutation"
          >
            {SALUTATION_OPTIONS.map((sal) => (
              <option key={sal} value={sal}>
                {sal} {sal === 'Mr.' ? '(திரு.)' : sal === 'Mrs.' ? '(திருமதி.)' : '(செல்வி.)'}
              </option>
            ))}
          </select>
          <input
            id="parentName"
            type="text"
            className={`form-input ${errors.parentName ? 'input-error' : ''}`}
            placeholder="e.g. K. Murugan / கே. முருகன்"
            value={formData.parentName}
            onChange={(e) => onChange('parentName', e.target.value)}
            disabled={disabled}
          />
        </div>
        {errors.parentName && (
          <p className="error-message" role="alert">
            {errors.parentName}
          </p>
        )}
      </div>

      <div className="form-group full-width">
        <label htmlFor="renterAddress" className="form-label">
          Renter Permanent Address / வாடகைதாரர் நிரந்தர முகவரி <span className="required-star">*</span>
        </label>
        <textarea
          id="renterAddress"
          rows={3}
          className={`form-textarea ${errors.renterAddress ? 'input-error' : ''}`}
          placeholder="Enter complete permanent address of tenant"
          value={formData.renterAddress}
          onChange={(e) => onChange('renterAddress', e.target.value)}
          disabled={disabled}
        />
        {errors.renterAddress && (
          <p className="error-message" role="alert">
            {errors.renterAddress}
          </p>
        )}
      </div>
    </div>
  );
};
