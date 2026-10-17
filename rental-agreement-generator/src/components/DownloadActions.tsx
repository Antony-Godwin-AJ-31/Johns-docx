import React, { useState } from 'react';
import type { GenerationResult, RentalFormData } from '../types/rentalAgreement';
import { downloadDocument } from '../lib/generateDocument';
import { PrintableDocument } from './PrintableDocument';

interface DownloadActionsProps {
  result: GenerationResult;
  formData: RentalFormData;
}

export const DownloadActions: React.FC<DownloadActionsProps> = ({ result, formData }) => {
  const [printModalLang, setPrintModalLang] = useState<'english' | 'tamil' | null>(null);

  if (!result.success) return null;

  return (
    <>
      <div className="download-section" role="region" aria-label="Generated Documents Download">
        <div className="download-card">
          <div className="download-header">
            <span className="success-icon" aria-hidden="true">✓</span>
            <div>
              <h3 className="download-title">Document(s) Ready for Download / அச்சிடத் தயார்</h3>
              <p className="download-subtitle">
                Download as Microsoft Word (.docx) or print / save as PDF with stamp paper layout.
              </p>
            </div>
          </div>

          <div className="download-buttons">
            {/* English Options */}
            {result.englishBlob && result.englishFilename && (
              <div className="download-action-group">
                <button
                  type="button"
                  className="btn btn-download"
                  onClick={() => downloadDocument(result.englishBlob!, result.englishFilename!)}
                >
                  <span className="btn-icon">📄</span>
                  <div className="btn-text-group">
                    <span className="btn-main-text">Download Word (.docx)</span>
                    <span className="btn-sub-text">English Agreement</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="btn btn-pdf"
                  onClick={() => setPrintModalLang('english')}
                >
                  <span className="btn-icon">🖨️</span>
                  <div className="btn-text-group">
                    <span className="btn-main-text">Print / Save as PDF</span>
                    <span className="btn-sub-text">English (Stamp Paper Ready)</span>
                  </div>
                </button>
              </div>
            )}

            {/* Tamil Options */}
            {result.tamilBlob && result.tamilFilename && (
              <div className="download-action-group">
                <button
                  type="button"
                  className="btn btn-download btn-download-tamil"
                  onClick={() => downloadDocument(result.tamilBlob!, result.tamilFilename!)}
                >
                  <span className="btn-icon">📄</span>
                  <div className="btn-text-group">
                    <span className="btn-main-text">Word கோப்பு (.docx)</span>
                    <span className="btn-sub-text">தமிழ் வாடகை ஒப்பந்தம்</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="btn btn-pdf btn-pdf-tamil"
                  onClick={() => setPrintModalLang('tamil')}
                >
                  <span className="btn-icon">🖨️</span>
                  <div className="btn-text-group">
                    <span className="btn-main-text">Print / Save as PDF</span>
                    <span className="btn-sub-text">தமிழ் (முத்திரைத் தாள் வடிவம்)</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {result.englishError && (
            <div className="partial-warning" role="alert">
              <strong>English document issue:</strong> {result.englishError}
            </div>
          )}
          {result.tamilError && (
            <div className="partial-warning" role="alert">
              <strong>Tamil document issue:</strong> {result.tamilError}
            </div>
          )}
        </div>
      </div>

      {/* Modal for PDF Preview & Print */}
      {printModalLang && (
        <PrintableDocument
          formData={formData}
          language={printModalLang}
          onClose={() => setPrintModalLang(null)}
        />
      )}
    </>
  );
};
