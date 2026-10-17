import React, { useState } from 'react';
import type {
  RentalFormData,
  ValidationErrors,
  GenerationResult,
} from '../types/rentalAgreement';
import { INITIAL_FORM_DATA } from '../types/rentalAgreement';
import { validateForm, isFormValid } from '../lib/validation';
import { generateDocument } from '../lib/generateDocument';
import { OwnerDetails } from './OwnerDetails';
import { RenterDetails } from './RenterDetails';
import { PropertyDetails } from './PropertyDetails';
import { FinancialDetails } from './FinancialDetails';
import { AgreementDates } from './AgreementDates';
import { LanguageSelector } from './LanguageSelector';
import { DownloadActions } from './DownloadActions';

export const RentalForm: React.FC = () => {
  const [formData, setFormData] = useState<RentalFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);

  const handleFieldChange = <K extends keyof RentalFormData>(
    field: K,
    value: RentalFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleReset = () => {
    const hasData =
      Boolean(formData.ownerName.trim()) ||
      Boolean(formData.renterName.trim()) ||
      Boolean(formData.advanceAmount.trim());

    if (hasData) {
      const confirmReset = window.confirm(
        'Are you sure you want to reset the form? All entered details will be cleared.'
      );
      if (!confirmReset) return;
    }

    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setGenerationError(null);
    setGenerationResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;

    setGenerationError(null);
    setGenerationResult(null);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) {
      setGenerationError(
        'Please correct the highlighted errors before generating the document.'
      );
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }

    setIsGenerating(true);

    try {
      const result = await generateDocument(formData);
      setGenerationResult(result);

      if (!result.success) {
        setGenerationError(
          result.error || 'Failed to generate document. Please try again.'
        );
      }
    } catch (err) {
      setGenerationError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during document generation.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form className="rental-form" onSubmit={handleSubmit} noValidate>
      {generationError && (
        <div className="alert alert-error" role="alert">
          <span className="alert-icon">⚠️</span>
          <div className="alert-content">
            <h4 className="alert-title">Unable to generate document</h4>
            <p>{generationError}</p>
          </div>
        </div>
      )}

      {/* Agreement Dates & Duration */}
      <AgreementDates
        formData={formData}
        errors={errors}
        onChange={handleFieldChange}
        disabled={isGenerating}
      />

      {/* Section 1: Owner Details */}
      <OwnerDetails
        formData={formData}
        errors={errors}
        onChange={handleFieldChange}
        disabled={isGenerating}
      />

      {/* Section 2: Renter Details */}
      <RenterDetails
        formData={formData}
        errors={errors}
        onChange={handleFieldChange}
        disabled={isGenerating}
      />

      {/* Section 3: Property Details */}
      <PropertyDetails
        formData={formData}
        errors={errors}
        onChange={handleFieldChange}
        disabled={isGenerating}
      />

      {/* Section 4: Financial Details */}
      <FinancialDetails
        formData={formData}
        errors={errors}
        onChange={handleFieldChange}
        disabled={isGenerating}
      />

      {/* Section 5: Document Language */}
      <LanguageSelector
        value={formData.language}
        onChange={(lang) => handleFieldChange('language', lang)}
        disabled={isGenerating}
      />

      {/* Actions: Generate and Reset */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
          disabled={isGenerating}
        >
          Reset Form / மீட்டமை
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="spinner" aria-hidden="true" />
              <span>Generating Document...</span>
            </>
          ) : (
            <>
              <span>Generate Document / ஆவணத்தை உருவாக்கு</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>

      {/* Download controls */}
      {generationResult && (
        <DownloadActions result={generationResult} formData={formData} />
      )}
    </form>
  );
};
