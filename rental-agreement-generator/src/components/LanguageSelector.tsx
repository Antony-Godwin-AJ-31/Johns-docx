import React from 'react';
import type { DocumentLanguage } from '../types/rentalAgreement';

interface LanguageSelectorProps {
  value: DocumentLanguage;
  onChange: (language: DocumentLanguage) => void;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="form-section language-section">
      <h2 className="section-title">
        <span className="section-number">5</span> Document Language / ஆவண மொழி
      </h2>
      <p className="section-help">
        Select which document language version you want to generate.
      </p>

      <div className="radio-group" role="radiogroup" aria-label="Document Language Selection">
        <label className={`radio-label ${value === 'english' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="documentLanguage"
            value="english"
            checked={value === 'english'}
            onChange={() => onChange('english')}
            disabled={disabled}
          />
          <div className="radio-content">
            <span className="radio-title">English</span>
            <span className="radio-subtitle">Generates completed English agreement</span>
          </div>
        </label>

        <label className={`radio-label ${value === 'tamil' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="documentLanguage"
            value="tamil"
            checked={value === 'tamil'}
            onChange={() => onChange('tamil')}
            disabled={disabled}
          />
          <div className="radio-content">
            <span className="radio-title">Tamil / தமிழ்</span>
            <span className="radio-subtitle">Generates completed Tamil agreement with words in Tamil</span>
          </div>
        </label>

        <label className={`radio-label ${value === 'both' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="documentLanguage"
            value="both"
            checked={value === 'both'}
            onChange={() => onChange('both')}
            disabled={disabled}
          />
          <div className="radio-content">
            <span className="radio-title">Both Languages / இரு மொழிகளும்</span>
            <span className="radio-subtitle">Generates both English and Tamil documents separately</span>
          </div>
        </label>
      </div>
    </div>
  );
};
