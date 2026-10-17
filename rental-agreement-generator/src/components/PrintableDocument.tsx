import React from 'react';
import type { RentalFormData } from '../types/rentalAgreement';
import { buildTemplateData } from '../lib/generateDocument';

interface PrintableDocumentProps {
  formData: RentalFormData;
  language: 'english' | 'tamil';
  onClose: () => void;
}

export const PrintableDocument: React.FC<PrintableDocumentProps> = ({
  formData,
  language,
  onClose,
}) => {
  const data = buildTemplateData(formData, language);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-modal-overlay">
      <div className="printable-modal-container">
        <div className="printable-modal-header no-print">
          <div>
            <h3>
              {language === 'english'
                ? 'Print / Save as PDF (English Agreement)'
                : 'Print / Save as PDF (Tamil Agreement / வாடகை ஒப்பந்தம்)'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Choose &quot;Save as PDF&quot; in the print dialog. Top space on Page 1 is preserved for stamp paper.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="btn btn-primary" onClick={handlePrint}>
              🖨️ Print / Save as PDF
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              ✕ Close
            </button>
          </div>
        </div>

        {/* The Printable Agreement Pages */}
        <div className="printable-document-content">
          {language === 'english' ? (
            <div className="agreement-paper english-doc">
              {/* PAGE 1: Stamp paper space at top */}
              <div className="page page-1">
                <div className="stamp-paper-spacer" />
                <h1 className="doc-title">RENTAL AGREEMENT</h1>
                <p className="doc-para">
                  On {data.AGREEMENT_DATE}, Mr. {data.OWNER_NAME}, aged {data.OWNER_AGE}, residing at {data.OWNER_ADDRESS}, hereinafter referred to as the First Party (House Owner),
                </p>
                <p className="doc-para">
                  and {data.RENTER_SALUTATION} {data.RENTER_NAME}, aged {data.RENTER_AGE}, son/daughter of {data.PARENT_NAME}, residing at {data.RENTER_ADDRESS}, hereinafter referred to as the Second Party (Tenant),
                </p>
              </div>

              {/* PAGE 2 */}
              <div className="page page-break-before">
                <p className="doc-para">
                  The Second Party has requested to rent the house situated at {data.PROPERTY_ADDRESS}, on the {data.HOUSE_FLOOR}, for residential purposes. The First Party has agreed to rent the said house to the Second Party subject to the following terms and conditions.
                </p>

                <h2 className="doc-heading">TERMS AND CONDITIONS</h2>

                <h3 className="clause-title">1. Advance / Security Deposit</h3>
                <p className="doc-para">
                  The Second Party shall pay an advance amount of INR {data.ADVANCE_AMOUNT}/- (Rupees {data.ADVANCE_WORDS_EN} only) on {data.AGREEMENT_DATE}. This agreement shall serve as an acknowledgment of receipt of the said amount by the First Party.
                </p>
                <p className="doc-para">
                  No interest shall be payable on the said amount. When the Second Party vacates the house and hands it over to the First Party, the advance amount shall be returned by the First Party to the Second Party, subject to the applicable deductions specified in this agreement.
                </p>

                <h3 className="clause-title">2. Monthly Rent</h3>
                <p className="doc-para">
                  The Second Party shall pay a monthly rent of INR {data.RENT_AMOUNT}/- (Rupees {data.RENT_WORDS_EN} only) to the First Party on or before the 5th day of every month. The Second Party shall pay the rent regularly every month.
                </p>

                <h3 className="clause-title">3. Use of the House</h3>
                <p className="doc-para">
                  The Second Party shall use the house only for residential purposes and shall not engage in any unlawful activities on the premises. The Second Party shall not sublet the house to any other person.
                </p>

                <h3 className="clause-title">4. Maintenance of the House</h3>
                <p className="doc-para">
                  During the rental period, the Second Party shall maintain the house in good condition without causing any damage. If any damage occurs, the Second Party shall bear the cost of repairing such damage.
                </p>
                <p className="doc-para">
                  When vacating the house, the Second Party shall repaint the house before handing it over. If the Second Party fails to do so, the Second Party shall bear the entire cost of painting.
                </p>

                <h3 className="clause-title">5. Inspection of the House</h3>
                <p className="doc-para">
                  Whenever the First Party needs to inspect the house, the Second Party shall not object to such inspection.
                </p>
              </div>

              {/* PAGE 3 */}
              <div className="page page-break-before">
                <h3 className="clause-title">6. Duration of the Agreement</h3>
                <p className="doc-para">
                  This agreement shall be valid for eleven (11) months only, from {data.START_DATE} to {data.END_DATE}.
                </p>
                <p className="doc-para">
                  After the expiry of this period, if both parties mutually agree, they may determine the rental amount based on the prevailing conditions at that time and execute a new rental agreement.
                </p>

                <h3 className="clause-title">7. Vehicle Parking</h3>
                <p className="doc-para">
                  Only one vehicle shall be permitted per house or apartment.
                </p>

                <h3 className="clause-title">8. Entrance Light and Maintenance Charge</h3>
                <p className="doc-para">
                  The entrance light must remain switched on every day from 6:00 PM to 9:30 PM. If the light is not kept switched on during these hours, the tenants shall pay a monthly maintenance charge of INR 300.
                </p>

                <h3 className="clause-title">9. Vacating the House and Refund of Advance</h3>
                <p className="doc-para">
                  If the Second Party wishes to vacate the house, or if the First Party asks the Second Party to vacate the house, either party must provide at least one month&apos;s prior written notice.
                </p>
                <p className="doc-para">
                  When the Second Party vacates and hands over the house, the First Party shall, on the same day, deduct any outstanding rent or electricity charges from the advance amount paid by the Second Party and refund the remaining balance to the Second Party.
                </p>
                <p className="doc-para">
                  The Second Party shall be fully responsible for handing over the house without any damage.
                </p>
                <p className="doc-para">
                  Both the First Party and the Second Party have willingly agreed to the above terms and have executed this rental agreement in the presence of the witnesses mentioned below.
                </p>

                <h3 className="clause-title">10. Alcohol Consumption and Smoking</h3>
                <p className="doc-para">
                  Drinking alcohol and smoking inside the house are not permitted.
                </p>

                <div className="signature-grid">
                  <div>
                    <p><strong>FIRST PARTY</strong></p>
                    <p>(House Owner)</p>
                    <div className="sig-line">Signature: __________________</div>
                  </div>
                  <div>
                    <p><strong>SECOND PARTY</strong></p>
                    <p>(Tenant)</p>
                    <div className="sig-line">Signature: __________________</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="agreement-paper tamil-doc">
              {/* PAGE 1: Stamp paper space at top */}
              <div className="page page-1">
                <div className="stamp-paper-spacer" />
                <h1 className="doc-title">வாடகை ஒப்பந்தப் பத்திரம்</h1>
                <p className="doc-para">
                  {data.AGREEMENT_DATE_TA} தேதி, {data.OWNER_ADDRESS} என்ற முகவரியில் வசித்து வரும் திரு. {data.OWNER_NAME}, வயது {data.OWNER_AGE}, முதல் தரப்பினராகவும் வீட்டு உரிமையாளர்,
                </p>
                <p className="doc-para">
                  {data.RENTER_ADDRESS} என்ற முகவரியில் வசித்து வரும் {data.RENTER_SALUTATION_TA} {data.RENTER_NAME}, வயது {data.RENTER_AGE}, {data.PARENT_NAME} அவர்களின் மகன்/மகள் ஆகிய இவர் இரண்டாம் தரப்பினராகவும்.
                </p>
              </div>

              {/* PAGE 2 */}
              <div className="page page-break-before">
                <p className="doc-para">
                  மேற்கூறிய முதல் மற்றும் இரண்டாம் தரப்பினர் மனமொப்பி, கீழ்க்கண்ட சாட்சிகளின் முன்னிலையில் எழுதிக்கொண்ட வாடகை ஒப்பந்தப் பத்திரம் என்னவென்றால், {data.PROPERTY_ADDRESS} என்ற முகவரியில் உள்ள {data.HOUSE_FLOOR} வீட்டை இரண்டாம் தரப்பினர் குடியிருப்பதற்காக வாடகைக்குக் கேட்க, அதற்கு முதல் தரப்பினரும் இரண்டாம் தரப்பினருக்கு வாடகைக்கு விடச் சம்மதித்து, கீழ்க்கண்ட நிபந்தனைகளின்படி இரு தரப்பினரும் சம்மதித்து எழுதிக்கொண்ட வாடகை ஒப்பந்தப் பத்திரம் இதுவாகும்.
                </p>

                <h2 className="doc-heading" style={{ textAlign: 'center' }}>நிபந்தனைகள்</h2>

                <p className="doc-para">
                  1. மேற்படி வீட்டிற்கு முன்பணமாக ரூ. {data.ADVANCE_AMOUNT}/- (ரூபாய் {data.ADVANCE_WORDS} மட்டும்) {data.AGREEMENT_DATE_TA} அன்று கொடுக்கிறோம். அதனை முதல் தரப்பினர் பெற்றுக்கொண்டதற்கான ரசீதாக இதுவே அமையும். மேற்படி தொகைக்கு வட்டி எதுவும் கிடையாது. இரண்டாம் தரப்பினர் மேற்படி வீட்டைக் காலி செய்து முதல் தரப்பினரிடம் ஒப்படைக்கும் சமயத்தில், முதல் தரப்பினரிடமிருந்து முன்பணத் தொகையைத் திரும்பப் பெற்றுக்கொள்ள வேண்டும்.
                </p>

                <p className="doc-para">
                  2. இரண்டாம் தரப்பினர் மேற்படி வீட்டிற்கான மாத வாடகையாக ரூ. {data.RENT_AMOUNT}/- (ரூபாய் {data.RENT_WORDS} மட்டும்) தொகையைப் பிரதிமாதம் 5ஆம் தேதிக்குள் முதல் தரப்பினரிடம் செலுத்த வேண்டும். இரண்டாம் தரப்பினர் ஒவ்வொரு மாதமும் தவறாமல் வாடகை செலுத்தி வர வேண்டும்.
                </p>

                <p className="doc-para">
                  3. இரண்டாம் தரப்பினர் மேற்படி வீட்டில் குடியிருப்பதற்காக மட்டுமே பயன்படுத்த வேண்டும். வேறு எந்தவிதமான சட்டத்திற்குப் புறம்பான நடவடிக்கைகளிலும் ஈடுபடக்கூடாது. மேலும், வீட்டை வேறு எவருக்கும் உள்வாடகைக்கு விடக்கூடாது.
                </p>

                <p className="doc-para">
                  4. இரண்டாம் தரப்பினர் வாடகைக் காலத்தில் வீட்டிற்கு எவ்விதச் சேதமும் ஏற்படுத்தாமல் நல்ல முறையில் பராமரித்து வர வேண்டும். ஏதேனும் சேதம் ஏற்பட்டால், அதனைச் சரிசெய்வதற்கான செலவை இரண்டாம் தரப்பினரே ஏற்றுக்கொள்ள வேண்டும்.
                </p>
                <p className="doc-para">
                  வீட்டைக் காலி செய்யும்போது, இரண்டாம் தரப்பினர் வீட்டிற்குப் புதிதாகப் பெயிண்ட் அடித்துக் கொடுத்துவிட்டுச் செல்ல வேண்டும். அவ்வாறு செய்யாவிட்டால், அதற்கான முழுச் செலவையும் இரண்டாம் தரப்பினரே ஏற்றுக்கொள்ள வேண்டும்.
                </p>

                <p className="doc-para">
                  5. முதல் தரப்பினருக்கு மேற்படி வீட்டைப் பார்வையிட வேண்டிய அவசியம் ஏற்படும் பொழுது, இரண்டாம் தரப்பினர் அதற்கு எவ்வித மறுப்பும் தெரிவிக்கக்கூடாது.
                </p>
              </div>

              {/* PAGE 3 */}
              <div className="page page-break-before">
                <p className="doc-para">
                  6. இந்த ஒப்பந்தம் பதினொன்று (11) மாதங்களுக்கு மட்டுமே பொருந்தும். ஒப்பந்தக் காலம் {data.START_DATE_TA} முதல் {data.END_DATE_TA} வரை அமலில் இருக்கும். அதன் பின்னர், இரு தரப்பினரும் சம்மதித்தால், அக்கால நிலவரப்படி வாடகைத் தொகையை நிர்ணயித்துக்கொண்டு புதிய ஒப்பந்தப் பத்திரம் எழுதிக்கொள்ளலாம்.
                </p>

                <p className="doc-para">
                  7. ஒரு வீட்டிற்கு ஒரு வாகனம் மட்டுமே அனுமதிக்கப்படும்.
                </p>

                <p className="doc-para">
                  8. தினமும் மாலை 6:00 மணி முதல் இரவு 9:30 மணி வரை வாசல் விளக்கு எரிய வேண்டும். அவ்வாறு விளக்கு எரியவிடப்படாவிட்டால், வாடகைதாரர்கள் ஒவ்வொரு மாதமும் ரூ.300/- பராமரிப்புக் கட்டணமாகச் செலுத்த வேண்டும்.
                </p>

                <p className="doc-para">
                  9. இரண்டாம் தரப்பினர் வீட்டைக் காலி செய்ய விரும்பினாலும் அல்லது முதல் தரப்பினர் வீட்டைக் காலி செய்யுமாறு இரண்டாம் தரப்பினரிடம் கேட்டுக்கொண்டாலும், இரு தரப்பினரும் குறைந்தபட்சம் ஒரு மாதத்திற்கு முன்பாக எழுத்துப்பூர்வமாக அறிவிப்பு வழங்க வேண்டும்.
                </p>
                <p className="doc-para">
                  இரண்டாம் தரப்பினர் வீட்டைக் காலி செய்து ஒப்படைக்கும் பொழுது, அன்றைய தினமே, இரண்டாம் தரப்பினர் செலுத்திய முன்பணத் தொகையிலிருந்து வாடகை பாக்கி அல்லது மின்சாரக் கட்டண பாக்கி ஏதேனும் இருந்தால், அவற்றைப் பிடித்தம் செய்துகொண்டு மீதமுள்ள தொகையை முதல் தரப்பினர் இரண்டாம் தரப்பினரிடம் திருப்பிக் கொடுக்க வேண்டும்.
                </p>
                <p className="doc-para">
                  வீட்டில் எவ்விதச் சேதமும் இல்லாமல் வீட்டை ஒப்படைப்பது இரண்டாம் தரப்பினரின் முழுப் பொறுப்பாகும்.
                </p>
                <p className="doc-para">
                  இவ்வாறு முதல் மற்றும் இரண்டாம் தரப்பினர் மேற்கண்ட நிபந்தனைகளுக்கு மனப்பூர்வமாகச் சம்மதித்து, கீழ்க்கண்ட சாட்சிகளின் முன்னிலையில் இந்த வாடகை ஒப்பந்தப் பத்திரத்தை எழுதிக்கொண்டனர்.
                </p>

                <p className="doc-para">
                  10. வீட்டிற்குள் மது அருந்துதல் மற்றும் சிகரெட் புகைத்தல் ஆகியவை அனுமதிக்கப்படாது.
                </p>

                <div className="signature-grid">
                  <div>
                    <p><strong>முதல் தரப்பினர்</strong></p>
                    <p>(வீட்டு உரிமையாளர்)</p>
                    <div className="sig-line">கையொப்பம்: __________________</div>
                  </div>
                  <div>
                    <p><strong>இரண்டாம் தரப்பினர்</strong></p>
                    <p>(வீட்டு வாடகைதாரர்)</p>
                    <div className="sig-line">கையொப்பம்: __________________</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
