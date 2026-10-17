import React from 'react';
import { RentalForm } from './components/RentalForm';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Rental Agreement Generator</h1>
        <p className="app-subtitle">
          Generate bilingual (English &amp; Tamil) residential rental agreements
          in Word (.docx) format instantly in your browser.
        </p>
        <div className="privacy-badge">
          <span aria-hidden="true">🔒</span>
          <span>100% Private &amp; Offline — Generated entirely in your browser</span>
        </div>
      </header>

      <main>
        <RentalForm />
      </main>

      <footer className="app-footer">
        <p>
          Rental Agreement Generator &bull; Frontend-Only Document Utility &bull; No data is stored or transmitted
        </p>
      </footer>
    </div>
  );
};

export default App;
