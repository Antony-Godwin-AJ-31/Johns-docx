import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import os

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_english_template(output_path):
    doc = docx.Document()
    
    # Page setup - standard Letter/A4
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        section.page_width = Inches(8.27)  # A4
        section.page_height = Inches(11.69)
    
    # ---------------- PAGE 1 ----------------
    # Top space for stamp paper (approx 5.5 inches from top)
    spacer = doc.add_paragraph()
    spacer.paragraph_format.space_before = Pt(360) # ~5 inches
    spacer.paragraph_format.line_spacing = 1.0
    
    # Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = p_title.add_run("RENTAL AGREEMENT")
    run_title.font.name = "Times New Roman"
    run_title.font.size = Pt(14)
    run_title.bold = True
    run_title.underline = True
    p_title.paragraph_format.space_after = Pt(18)
    
    # Paragraph 1
    p1 = doc.add_paragraph()
    p1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p1.paragraph_format.line_spacing = 1.3
    p1.paragraph_format.space_after = Pt(14)
    r1 = p1.add_run("On {AGREEMENT_DATE}, Mr. {OWNER_NAME}, aged {OWNER_AGE}, residing at {OWNER_ADDRESS}, hereinafter referred to as the First Party (House Owner),")
    r1.font.name = "Times New Roman"
    r1.font.size = Pt(11)
    
    # Paragraph 2
    p2 = doc.add_paragraph()
    p2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p2.paragraph_format.line_spacing = 1.3
    p2.paragraph_format.space_after = Pt(14)
    r2 = p2.add_run("and {RENTER_SALUTATION} {RENTER_NAME}, aged {RENTER_AGE}, son/daughter of {PARENT_NAME}, residing at {RENTER_ADDRESS}, hereinafter referred to as the Second Party (Tenant),")
    r2.font.name = "Times New Roman"
    r2.font.size = Pt(11)
    
    # Page break to Page 2
    doc.add_page_break()
    
    # ---------------- PAGE 2 ----------------
    p_recital = doc.add_paragraph()
    p_recital.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_recital.paragraph_format.line_spacing = 1.25
    p_recital.paragraph_format.space_after = Pt(16)
    r_rec = p_recital.add_run("The Second Party has requested to rent the house situated at {PROPERTY_ADDRESS}, on the {HOUSE_FLOOR}, for residential purposes. The First Party has agreed to rent the said house to the Second Party subject to the following terms and conditions.")
    r_rec.font.name = "Times New Roman"
    r_rec.font.size = Pt(11)
    
    # Terms and Conditions Heading
    p_tc = doc.add_paragraph()
    r_tc = p_tc.add_run("TERMS AND CONDITIONS")
    r_tc.font.name = "Times New Roman"
    r_tc.font.size = Pt(12)
    r_tc.bold = True
    p_tc.paragraph_format.space_after = Pt(14)
    
    # Clause 1
    p_c1_t = doc.add_paragraph()
    r_c1_t = p_c1_t.add_run("1. Advance / Security Deposit")
    r_c1_t.font.name = "Times New Roman"
    r_c1_t.font.size = Pt(11)
    r_c1_t.bold = True
    p_c1_t.paragraph_format.space_after = Pt(4)
    
    p_c1_b1 = doc.add_paragraph()
    p_c1_b1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c1_b1.paragraph_format.line_spacing = 1.25
    p_c1_b1.paragraph_format.space_after = Pt(6)
    r_c1_b1 = p_c1_b1.add_run("The Second Party shall pay an advance amount of INR {ADVANCE_AMOUNT}/- (Rupees {ADVANCE_WORDS_EN} only) on {AGREEMENT_DATE}. This agreement shall serve as an acknowledgment of receipt of the said amount by the First Party.")
    r_c1_b1.font.name = "Times New Roman"
    r_c1_b1.font.size = Pt(11)
    
    p_c1_b2 = doc.add_paragraph()
    p_c1_b2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c1_b2.paragraph_format.line_spacing = 1.25
    p_c1_b2.paragraph_format.space_after = Pt(14)
    r_c1_b2 = p_c1_b2.add_run("No interest shall be payable on the said amount. When the Second Party vacates the house and hands it over to the First Party, the advance amount shall be returned by the First Party to the Second Party, subject to the applicable deductions specified in this agreement.")
    r_c1_b2.font.name = "Times New Roman"
    r_c1_b2.font.size = Pt(11)
    
    # Clause 2
    p_c2_t = doc.add_paragraph()
    r_c2_t = p_c2_t.add_run("2. Monthly Rent")
    r_c2_t.font.name = "Times New Roman"
    r_c2_t.font.size = Pt(11)
    r_c2_t.bold = True
    p_c2_t.paragraph_format.space_after = Pt(4)
    
    p_c2_b = doc.add_paragraph()
    p_c2_b.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c2_b.paragraph_format.line_spacing = 1.25
    p_c2_b.paragraph_format.space_after = Pt(14)
    r_c2_b = p_c2_b.add_run("The Second Party shall pay a monthly rent of INR {RENT_AMOUNT}/- (Rupees {RENT_WORDS_EN} only) to the First Party on or before the 5th day of every month. The Second Party shall pay the rent regularly every month.")
    r_c2_b.font.name = "Times New Roman"
    r_c2_b.font.size = Pt(11)
    
    # Clause 3
    p_c3_t = doc.add_paragraph()
    r_c3_t = p_c3_t.add_run("3. Use of the House")
    r_c3_t.font.name = "Times New Roman"
    r_c3_t.font.size = Pt(11)
    r_c3_t.bold = True
    p_c3_t.paragraph_format.space_after = Pt(4)
    
    p_c3_b = doc.add_paragraph()
    p_c3_b.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c3_b.paragraph_format.line_spacing = 1.25
    p_c3_b.paragraph_format.space_after = Pt(14)
    r_c3_b = p_c3_b.add_run("The Second Party shall use the house only for residential purposes and shall not engage in any unlawful activities on the premises. The Second Party shall not sublet the house to any other person.")
    r_c3_b.font.name = "Times New Roman"
    r_c3_b.font.size = Pt(11)
    
    # Clause 4
    p_c4_t = doc.add_paragraph()
    r_c4_t = p_c4_t.add_run("4. Maintenance of the House")
    r_c4_t.font.name = "Times New Roman"
    r_c4_t.font.size = Pt(11)
    r_c4_t.bold = True
    p_c4_t.paragraph_format.space_after = Pt(4)
    
    p_c4_b1 = doc.add_paragraph()
    p_c4_b1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c4_b1.paragraph_format.line_spacing = 1.25
    p_c4_b1.paragraph_format.space_after = Pt(6)
    r_c4_b1 = p_c4_b1.add_run("During the rental period, the Second Party shall maintain the house in good condition without causing any damage. If any damage occurs, the Second Party shall bear the cost of repairing such damage.")
    r_c4_b1.font.name = "Times New Roman"
    r_c4_b1.font.size = Pt(11)
    
    p_c4_b2 = doc.add_paragraph()
    p_c4_b2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c4_b2.paragraph_format.line_spacing = 1.25
    p_c4_b2.paragraph_format.space_after = Pt(14)
    r_c4_b2 = p_c4_b2.add_run("When vacating the house, the Second Party shall repaint the house before handing it over. If the Second Party fails to do so, the Second Party shall bear the entire cost of painting.")
    r_c4_b2.font.name = "Times New Roman"
    r_c4_b2.font.size = Pt(11)
    
    # Clause 5
    p_c5_t = doc.add_paragraph()
    r_c5_t = p_c5_t.add_run("5. Inspection of the House")
    r_c5_t.font.name = "Times New Roman"
    r_c5_t.font.size = Pt(11)
    r_c5_t.bold = True
    p_c5_t.paragraph_format.space_after = Pt(4)
    
    p_c5_b = doc.add_paragraph()
    p_c5_b.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c5_b.paragraph_format.line_spacing = 1.25
    p_c5_b.paragraph_format.space_after = Pt(14)
    r_c5_b = p_c5_b.add_run("Whenever the First Party needs to inspect the house, the Second Party shall not object to such inspection.")
    r_c5_b.font.name = "Times New Roman"
    r_c5_b.font.size = Pt(11)
    
    # Page break to Page 3
    doc.add_page_break()
    
    # ---------------- PAGE 3 ----------------
    # Clause 6
    p_c6_t = doc.add_paragraph()
    r_c6_t = p_c6_t.add_run("6. Duration of the Agreement")
    r_c6_t.font.name = "Times New Roman"
    r_c6_t.font.size = Pt(11)
    r_c6_t.bold = True
    p_c6_t.paragraph_format.space_after = Pt(4)
    
    p_c6_b1 = doc.add_paragraph()
    p_c6_b1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c6_b1.paragraph_format.line_spacing = 1.25
    p_c6_b1.paragraph_format.space_after = Pt(6)
    r_c6_b1 = p_c6_b1.add_run("This agreement shall be valid for eleven (11) months only, from {START_DATE} to {END_DATE}.")
    r_c6_b1.font.name = "Times New Roman"
    r_c6_b1.font.size = Pt(11)
    
    p_c6_b2 = doc.add_paragraph()
    p_c6_b2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c6_b2.paragraph_format.line_spacing = 1.25
    p_c6_b2.paragraph_format.space_after = Pt(14)
    r_c6_b2 = p_c6_b2.add_run("After the expiry of this period, if both parties mutually agree, they may determine the rental amount based on the prevailing conditions at that time and execute a new rental agreement.")
    r_c6_b2.font.name = "Times New Roman"
    r_c6_b2.font.size = Pt(11)
    
    # Clause 7
    p_c7_t = doc.add_paragraph()
    r_c7_t = p_c7_t.add_run("7. Vehicle Parking")
    r_c7_t.font.name = "Times New Roman"
    r_c7_t.font.size = Pt(11)
    r_c7_t.bold = True
    p_c7_t.paragraph_format.space_after = Pt(4)
    
    p_c7_b = doc.add_paragraph()
    p_c7_b.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c7_b.paragraph_format.line_spacing = 1.25
    p_c7_b.paragraph_format.space_after = Pt(14)
    r_c7_b = p_c7_b.add_run("Only one vehicle shall be permitted per house or apartment.")
    r_c7_b.font.name = "Times New Roman"
    r_c7_b.font.size = Pt(11)
    
    # Clause 8
    p_c8_t = doc.add_paragraph()
    r_c8_t = p_c8_t.add_run("8. Entrance Light and Maintenance Charge")
    r_c8_t.font.name = "Times New Roman"
    r_c8_t.font.size = Pt(11)
    r_c8_t.bold = True
    p_c8_t.paragraph_format.space_after = Pt(4)
    
    p_c8_b = doc.add_paragraph()
    p_c8_b.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c8_b.paragraph_format.line_spacing = 1.25
    p_c8_b.paragraph_format.space_after = Pt(14)
    r_c8_b = p_c8_b.add_run("The entrance light must remain switched on every day from 6:00 PM to 9:30 PM. If the light is not kept switched on during these hours, the tenants shall pay a monthly maintenance charge of INR 300.")
    r_c8_b.font.name = "Times New Roman"
    r_c8_b.font.size = Pt(11)
    
    # Clause 9
    p_c9_t = doc.add_paragraph()
    r_c9_t = p_c9_t.add_run("9. Vacating the House and Refund of Advance")
    r_c9_t.font.name = "Times New Roman"
    r_c9_t.font.size = Pt(11)
    r_c9_t.bold = True
    p_c9_t.paragraph_format.space_after = Pt(4)
    
    p_c9_b1 = doc.add_paragraph()
    p_c9_b1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c9_b1.paragraph_format.line_spacing = 1.25
    p_c9_b1.paragraph_format.space_after = Pt(6)
    r_c9_b1 = p_c9_b1.add_run("If the Second Party wishes to vacate the house, or if the First Party asks the Second Party to vacate the house, either party must provide at least one month's prior written notice.")
    r_c9_b1.font.name = "Times New Roman"
    r_c9_b1.font.size = Pt(11)
    
    p_c9_b2 = doc.add_paragraph()
    p_c9_b2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c9_b2.paragraph_format.line_spacing = 1.25
    p_c9_b2.paragraph_format.space_after = Pt(6)
    r_c9_b2 = p_c9_b2.add_run("When the Second Party vacates and hands over the house, the First Party shall, on the same day, deduct any outstanding rent or electricity charges from the advance amount paid by the Second Party and refund the remaining balance to the Second Party.")
    r_c9_b2.font.name = "Times New Roman"
    r_c9_b2.font.size = Pt(11)
    
    p_c9_b3 = doc.add_paragraph()
    p_c9_b3.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c9_b3.paragraph_format.line_spacing = 1.25
    p_c9_b3.paragraph_format.space_after = Pt(6)
    r_c9_b3 = p_c9_b3.add_run("The Second Party shall be fully responsible for handing over the house without any damage.")
    r_c9_b3.font.name = "Times New Roman"
    r_c9_b3.font.size = Pt(11)
    
    p_c9_b4 = doc.add_paragraph()
    p_c9_b4.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c9_b4.paragraph_format.line_spacing = 1.25
    p_c9_b4.paragraph_format.space_after = Pt(14)
    r_c9_b4 = p_c9_b4.add_run("Both the First Party and the Second Party have willingly agreed to the above terms and have executed this rental agreement in the presence of the witnesses mentioned below.")
    r_c9_b4.font.name = "Times New Roman"
    r_c9_b4.font.size = Pt(11)
    
    # Clause 10
    p_c10_t = doc.add_paragraph()
    r_c10_t = p_c10_t.add_run("10. Alcohol Consumption and Smoking")
    r_c10_t.font.name = "Times New Roman"
    r_c10_t.font.size = Pt(11)
    r_c10_t.bold = True
    p_c10_t.paragraph_format.space_after = Pt(4)
    
    p_c10_b = doc.add_paragraph()
    p_c10_b.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c10_b.paragraph_format.line_spacing = 1.25
    p_c10_b.paragraph_format.space_after = Pt(28)
    r_c10_b = p_c10_b.add_run("Drinking alcohol and smoking inside the house are not permitted.")
    r_c10_b.font.name = "Times New Roman"
    r_c10_b.font.size = Pt(11)
    
    # Signatures Table
    table = doc.add_table(rows=3, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    for row in table.rows:
        row.cells[0].width = Inches(3.2)
        row.cells[1].width = Inches(3.2)
        
    cell_00 = table.cell(0, 0)
    p = cell_00.paragraphs[0]
    r = p.add_run("FIRST PARTY\n(House Owner)")
    r.font.name = "Times New Roman"
    r.font.size = Pt(11)
    r.bold = True
    
    cell_01 = table.cell(0, 1)
    p = cell_01.paragraphs[0]
    r = p.add_run("SECOND PARTY\n(Tenant)")
    r.font.name = "Times New Roman"
    r.font.size = Pt(11)
    r.bold = True
    
    cell_10 = table.cell(1, 0)
    p = cell_10.paragraphs[0]
    p.paragraph_format.space_before = Pt(36)
    r = p.add_run("Signature:\n__________________")
    r.font.name = "Times New Roman"
    r.font.size = Pt(11)
    
    cell_11 = table.cell(1, 1)
    p = cell_11.paragraphs[0]
    p.paragraph_format.space_before = Pt(36)
    r = p.add_run("Signature:\n__________________")
    r.font.name = "Times New Roman"
    r.font.size = Pt(11)
    
    doc.save(output_path)
    print(f"Created: {output_path}")

def create_tamil_template(output_path):
    doc = docx.Document()
    
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        section.page_width = Inches(8.27)
        section.page_height = Inches(11.69)
        
    font_name = "Nirmala UI"
    
    # ---------------- PAGE 1 ----------------
    # Top space for stamp paper (approx 5.5 inches)
    spacer = doc.add_paragraph()
    spacer.paragraph_format.space_before = Pt(360)
    spacer.paragraph_format.line_spacing = 1.0
    
    # Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = p_title.add_run("வாடகை ஒப்பந்தப் பத்திரம்")
    run_title.font.name = font_name
    run_title.font.size = Pt(14)
    run_title.bold = True
    p_title.paragraph_format.space_after = Pt(18)
    
    # Paragraph 1
    p1 = doc.add_paragraph()
    p1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p1.paragraph_format.line_spacing = 1.35
    p1.paragraph_format.space_after = Pt(14)
    r1 = p1.add_run("{AGREEMENT_DATE_TA} தேதி, {OWNER_ADDRESS} என்ற முகவரியில் வசித்து வரும் திரு. {OWNER_NAME}, வயது {OWNER_AGE}, முதல் தரப்பினராகவும் வீட்டு உரிமையாளர்,")
    r1.font.name = font_name
    r1.font.size = Pt(11)
    
    # Paragraph 2
    p2 = doc.add_paragraph()
    p2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p2.paragraph_format.line_spacing = 1.35
    p2.paragraph_format.space_after = Pt(14)
    r2 = p2.add_run("{RENTER_ADDRESS} என்ற முகவரியில் வசித்து வரும் {RENTER_SALUTATION_TA} {RENTER_NAME}, வயது {RENTER_AGE}, {PARENT_NAME} அவர்களின் மகன்/மகள் ஆகிய இவர் இரண்டாம் தரப்பினராகவும்.")
    r2.font.name = font_name
    r2.font.size = Pt(11)
    
    doc.add_page_break()
    
    # ---------------- PAGE 2 ----------------
    p_recital = doc.add_paragraph()
    p_recital.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_recital.paragraph_format.line_spacing = 1.35
    p_recital.paragraph_format.space_after = Pt(16)
    r_rec = p_recital.add_run("மேற்கூறிய முதல் மற்றும் இரண்டாம் தரப்பினர் மனமொப்பி, கீழ்க்கண்ட சாட்சிகளின் முன்னிலையில் எழுதிக்கொண்ட வாடகை ஒப்பந்தப் பத்திரம் என்னவென்றால், {PROPERTY_ADDRESS} என்ற முகவரியில் உள்ள {HOUSE_FLOOR} வீட்டை இரண்டாம் தரப்பினர் குடியிருப்பதற்காக வாடகைக்குக் கேட்க, அதற்கு முதல் தரப்பினரும் இரண்டாம் தரப்பினருக்கு வாடகைக்கு விடச் சம்மதித்து, கீழ்க்கண்ட நிபந்தனைகளின்படி இரு தரப்பினரும் சம்மதித்து எழுதிக்கொண்ட வாடகை ஒப்பந்தப் பத்திரம் இதுவாகும்.")
    r_rec.font.name = font_name
    r_rec.font.size = Pt(11)
    
    # Heading
    p_tc = doc.add_paragraph()
    p_tc.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_tc = p_tc.add_run("நிபந்தனைகள்")
    r_tc.font.name = font_name
    r_tc.font.size = Pt(12)
    r_tc.bold = True
    p_tc.paragraph_format.space_after = Pt(14)
    
    # Clause 1
    p_c1 = doc.add_paragraph()
    p_c1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c1.paragraph_format.line_spacing = 1.35
    p_c1.paragraph_format.space_after = Pt(12)
    r_c1 = p_c1.add_run("1. மேற்படி வீட்டிற்கு முன்பணமாக ரூ. {ADVANCE_AMOUNT}/- (ரூபாய் {ADVANCE_WORDS} மட்டும்) {AGREEMENT_DATE_TA} அன்று கொடுக்கிறோம். அதனை முதல் தரப்பினர் பெற்றுக்கொண்டதற்கான ரசீதாக இதுவே அமையும். மேற்படி தொகைக்கு வட்டி எதுவும் கிடையாது. இரண்டாம் தரப்பினர் மேற்படி வீட்டைக் காலி செய்து முதல் தரப்பினரிடம் ஒப்படைக்கும் சமயத்தில், முதல் தரப்பினரிடமிருந்து முன்பணத் தொகையைத் திரும்பப் பெற்றுக்கொள்ள வேண்டும்.")
    r_c1.font.name = font_name
    r_c1.font.size = Pt(11)
    
    # Clause 2
    p_c2 = doc.add_paragraph()
    p_c2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c2.paragraph_format.line_spacing = 1.35
    p_c2.paragraph_format.space_after = Pt(12)
    r_c2 = p_c2.add_run("2. இரண்டாம் தரப்பினர் மேற்படி வீட்டிற்கான மாத வாடகையாக ரூ. {RENT_AMOUNT}/- (ரூபாய் {RENT_WORDS} மட்டும்) தொகையைப் பிரதிமாதம் 5ஆம் தேதிக்குள் முதல் தரப்பினரிடம் செலுத்த வேண்டும். இரண்டாம் தரப்பினர் ஒவ்வொரு மாதமும் தவறாமல் வாடகை செலுத்தி வர வேண்டும்.")
    r_c2.font.name = font_name
    r_c2.font.size = Pt(11)
    
    # Clause 3
    p_c3 = doc.add_paragraph()
    p_c3.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c3.paragraph_format.line_spacing = 1.35
    p_c3.paragraph_format.space_after = Pt(12)
    r_c3 = p_c3.add_run("3. இரண்டாம் தரப்பினர் மேற்படி வீட்டில் குடியிருப்பதற்காக மட்டுமே பயன்படுத்த வேண்டும். வேறு எந்தவிதமான சட்டத்திற்குப் புறம்பான நடவடிக்கைகளிலும் ஈடுபடக்கூடாது. மேலும், வீட்டை வேறு எவருக்கும் உள்வாடகைக்கு விடக்கூடாது.")
    r_c3.font.name = font_name
    r_c3.font.size = Pt(11)
    
    # Clause 4
    p_c4_1 = doc.add_paragraph()
    p_c4_1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c4_1.paragraph_format.line_spacing = 1.35
    p_c4_1.paragraph_format.space_after = Pt(6)
    r_c4_1 = p_c4_1.add_run("4. இரண்டாம் தரப்பினர் வாடகைக் காலத்தில் வீட்டிற்கு எவ்விதச் சேதமும் ஏற்படுத்தாமல் நல்ல முறையில் பராமரித்து வர வேண்டும். ஏதேனும் சேதம் ஏற்பட்டால், அதனைச் சரிசெய்வதற்கான செலவை இரண்டாம் தரப்பினரே ஏற்றுக்கொள்ள வேண்டும்.")
    r_c4_1.font.name = font_name
    r_c4_1.font.size = Pt(11)
    
    p_c4_2 = doc.add_paragraph()
    p_c4_2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c4_2.paragraph_format.line_spacing = 1.35
    p_c4_2.paragraph_format.space_after = Pt(12)
    r_c4_2 = p_c4_2.add_run("வீட்டைக் காலி செய்யும்போது, இரண்டாம் தரப்பினர் வீட்டிற்குப் புதிதாகப் பெயிண்ட் அடித்துக் கொடுத்துவிட்டுச் செல்ல வேண்டும். அவ்வாறு செய்யாவிட்டால், அதற்கான முழுச் செலவையும் இரண்டாம் தரப்பினரே ஏற்றுக்கொள்ள வேண்டும்.")
    r_c4_2.font.name = font_name
    r_c4_2.font.size = Pt(11)
    
    # Clause 5
    p_c5 = doc.add_paragraph()
    p_c5.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c5.paragraph_format.line_spacing = 1.35
    p_c5.paragraph_format.space_after = Pt(14)
    r_c5 = p_c5.add_run("5. முதல் தரப்பினருக்கு மேற்படி வீட்டைப் பார்வையிட வேண்டிய அவசியம் ஏற்படும் பொழுது, இரண்டாம் தரப்பினர் அதற்கு எவ்வித மறுப்பும் தெரிவிக்கக்கூடாது.")
    r_c5.font.name = font_name
    r_c5.font.size = Pt(11)
    
    doc.add_page_break()
    
    # ---------------- PAGE 3 ----------------
    # Clause 6
    p_c6 = doc.add_paragraph()
    p_c6.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c6.paragraph_format.line_spacing = 1.35
    p_c6.paragraph_format.space_after = Pt(12)
    r_c6 = p_c6.add_run("6. இந்த ஒப்பந்தம் பதினொன்று (11) மாதங்களுக்கு மட்டுமே பொருந்தும். ஒப்பந்தக் காலம் {START_DATE_TA} முதல் {END_DATE_TA} வரை அமலில் இருக்கும். அதன் பின்னர், இரு தரப்பினரும் சம்மதித்தால், அக்கால நிலவரப்படி வாடகைத் தொகையை நிர்ணயித்துக்கொண்டு புதிய ஒப்பந்தப் பத்திரம் எழுதிக்கொள்ளலாம்.")
    r_c6.font.name = font_name
    r_c6.font.size = Pt(11)
    
    # Clause 7
    p_c7 = doc.add_paragraph()
    p_c7.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c7.paragraph_format.line_spacing = 1.35
    p_c7.paragraph_format.space_after = Pt(12)
    r_c7 = p_c7.add_run("7. ஒரு வீட்டிற்கு ஒரு வாகனம் மட்டுமே அனுமதிக்கப்படும்.")
    r_c7.font.name = font_name
    r_c7.font.size = Pt(11)
    
    # Clause 8
    p_c8 = doc.add_paragraph()
    p_c8.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c8.paragraph_format.line_spacing = 1.35
    p_c8.paragraph_format.space_after = Pt(12)
    r_c8 = p_c8.add_run("8. தினமும் மாலை 6:00 மணி முதல் இரவு 9:30 மணி வரை வாசல் விளக்கு எரிய வேண்டும். அவ்வாறு விளக்கு எரியவிடப்படாவிட்டால், வாடகைதாரர்கள் ஒவ்வொரு மாதமும் ரூ.300/- பராமரிப்புக் கட்டணமாகச் செலுத்த வேண்டும்.")
    r_c8.font.name = font_name
    r_c8.font.size = Pt(11)
    
    # Clause 9
    p_c9_1 = doc.add_paragraph()
    p_c9_1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c9_1.paragraph_format.line_spacing = 1.35
    p_c9_1.paragraph_format.space_after = Pt(6)
    r_c9_1 = p_c9_1.add_run("9. இரண்டாம் தரப்பினர் வீட்டைக் காலி செய்ய விரும்பினாலும் அல்லது முதல் தரப்பினர் வீட்டைக் காலி செய்யுமாறு இரண்டாம் தரப்பினரிடம் கேட்டுக்கொண்டாலும், இரு தரப்பினரும் குறைந்தபட்சம் ஒரு மாதத்திற்கு முன்பாக எழுத்துப்பூர்வமாக அறிவிப்பு வழங்க வேண்டும்.")
    r_c9_1.font.name = font_name
    r_c9_1.font.size = Pt(11)
    
    p_c9_2 = doc.add_paragraph()
    p_c9_2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c9_2.paragraph_format.line_spacing = 1.35
    p_c9_2.paragraph_format.space_after = Pt(6)
    r_c9_2 = p_c9_2.add_run("இரண்டாம் தரப்பினர் வீட்டைக் காலி செய்து ஒப்படைக்கும் பொழுது, அன்றைய தினமே, இரண்டாம் தரப்பினர் செலுத்திய முன்பணத் தொகையிலிருந்து வாடகை பாக்கி அல்லது மின்சாரக் கட்டண பாக்கி ஏதேனும் இருந்தால், அவற்றைப் பிடித்தம் செய்துகொண்டு மீதமுள்ள தொகையை முதல் தரப்பினர் இரண்டாம் தரப்பினரிடம் திருப்பிக் கொடுக்க வேண்டும்.")
    r_c9_2.font.name = font_name
    r_c9_2.font.size = Pt(11)
    
    p_c9_3 = doc.add_paragraph()
    p_c9_3.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c9_3.paragraph_format.line_spacing = 1.35
    p_c9_3.paragraph_format.space_after = Pt(6)
    r_c9_3 = p_c9_3.add_run("வீட்டில் எவ்விதச் சேதமும் இல்லாமல் வீட்டை ஒப்படைப்பது இரண்டாம் தரப்பினரின் முழுப் பொறுப்பாகும்.")
    r_c9_3.font.name = font_name
    r_c9_3.font.size = Pt(11)
    
    p_c9_4 = doc.add_paragraph()
    p_c9_4.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c9_4.paragraph_format.line_spacing = 1.35
    p_c9_4.paragraph_format.space_after = Pt(14)
    r_c9_4 = p_c9_4.add_run("இவ்வாறு முதல் மற்றும் இரண்டாம் தரப்பினர் மேற்கண்ட நிபந்தனைகளுக்கு மனப்பூர்வமாகச் சம்மதித்து, கீழ்க்கண்ட சாட்சிகளின் முன்னிலையில் இந்த வாடகை ஒப்பந்தப் பத்திரத்தை எழுதிக்கொண்டனர்.")
    r_c9_4.font.name = font_name
    r_c9_4.font.size = Pt(11)
    
    # Clause 10
    p_c10 = doc.add_paragraph()
    p_c10.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_c10.paragraph_format.line_spacing = 1.35
    p_c10.paragraph_format.space_after = Pt(28)
    r_c10 = p_c10.add_run("10. வீட்டிற்குள் மது அருந்துதல் மற்றும் சிகரெட் புகைத்தல் ஆகியவை அனுமதிக்கப்படாது.")
    r_c10.font.name = font_name
    r_c10.font.size = Pt(11)
    
    # Signatures Table
    table = doc.add_table(rows=3, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    for row in table.rows:
        row.cells[0].width = Inches(3.2)
        row.cells[1].width = Inches(3.2)
        
    cell_00 = table.cell(0, 0)
    p = cell_00.paragraphs[0]
    r = p.add_run("முதல் தரப்பினர்\n(வீட்டு உரிமையாளர்)")
    r.font.name = font_name
    r.font.size = Pt(11)
    r.bold = True
    
    cell_01 = table.cell(0, 1)
    p = cell_01.paragraphs[0]
    r = p.add_run("இரண்டாம் தரப்பினர்\n(வீட்டு வாடகைதாரர்)")
    r.font.name = font_name
    r.font.size = Pt(11)
    r.bold = True
    
    cell_10 = table.cell(1, 0)
    p = cell_10.paragraphs[0]
    p.paragraph_format.space_before = Pt(36)
    r = p.add_run("கையொப்பம்:\n__________________")
    r.font.name = font_name
    r.font.size = Pt(11)
    
    cell_11 = table.cell(1, 1)
    p = cell_11.paragraphs[0]
    p.paragraph_format.space_before = Pt(36)
    r = p.add_run("கையொப்பம்:\n__________________")
    r.font.name = font_name
    r.font.size = Pt(11)
    
    doc.save(output_path)
    print(f"Created: {output_path}")

if __name__ == '__main__':
    out_dir = r"d:\Johns docx\rental-agreement-generator\public\templates"
    os.makedirs(out_dir, exist_ok=True)
    create_english_template(os.path.join(out_dir, "rental-agreement-english.docx"))
    create_tamil_template(os.path.join(out_dir, "rental-agreement-tamil.docx"))
