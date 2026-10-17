/**
 * Document Generation Module
 *
 * Generates completed .docx files from template files.
 * Browser-side only using Docxtemplater with PizZip.
 */

import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import type { RentalFormData, GenerationResult } from '../types/rentalAgreement';
import { formatIndianNumber } from './formatCurrency';
import { tamilNumberToWords } from './tamilNumberToWords';
import { englishNumberToWords } from './englishNumberToWords';
import {
  formatEnglishDate,
  formatTamilDate,
  getEffectiveFloor,
  getEffectiveSalutation,
} from './templateMappings';
import { parseAmount } from './validation';

const ENGLISH_TEMPLATE_PATH = '/templates/rental-agreement-english.docx';
const TAMIL_TEMPLATE_PATH = '/templates/rental-agreement-tamil.docx';

async function fetchTemplate(path: string): Promise<ArrayBuffer> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${path} (HTTP ${response.status})`);
  }
  return response.arrayBuffer();
}

export function buildTemplateData(
  formData: RentalFormData,
  language: 'english' | 'tamil'
): Record<string, string> {
  const advanceNum = parseAmount(formData.advanceAmount);
  const rentNum = parseAmount(formData.rentAmount);

  if (language === 'english') {
    return {
      AGREEMENT_DATE: formatEnglishDate(formData.agreementDate),
      OWNER_NAME: formData.ownerName.trim(),
      OWNER_AGE: formData.ownerAge.trim(),
      OWNER_ADDRESS: formData.ownerAddress.trim(),
      RENTER_SALUTATION: getEffectiveSalutation(formData.renterSalutation, 'english'),
      RENTER_NAME: formData.renterName.trim(),
      RENTER_AGE: formData.renterAge.trim(),
      PARENT_NAME: formData.parentName.trim(),
      RENTER_ADDRESS: formData.renterAddress.trim(),
      PROPERTY_ADDRESS: formData.propertyAddress.trim(),
      HOUSE_FLOOR: getEffectiveFloor(formData.houseFloor, formData.customFloor, 'english'),
      ADVANCE_AMOUNT: formatIndianNumber(advanceNum),
      ADVANCE_WORDS_EN: englishNumberToWords(advanceNum),
      RENT_AMOUNT: formatIndianNumber(rentNum),
      RENT_WORDS_EN: englishNumberToWords(rentNum),
      START_DATE: formatEnglishDate(formData.startDate),
      END_DATE: formatEnglishDate(formData.endDate),
    };
  } else {
    return {
      AGREEMENT_DATE_TA: formatTamilDate(formData.agreementDate),
      OWNER_NAME: formData.ownerName.trim(),
      OWNER_AGE: formData.ownerAge.trim(),
      OWNER_ADDRESS: formData.ownerAddress.trim(),
      RENTER_SALUTATION_TA: getEffectiveSalutation(formData.renterSalutation, 'tamil'),
      RENTER_NAME: formData.renterName.trim(),
      RENTER_AGE: formData.renterAge.trim(),
      PARENT_NAME: formData.parentName.trim(),
      RENTER_ADDRESS: formData.renterAddress.trim(),
      PROPERTY_ADDRESS: formData.propertyAddress.trim(),
      HOUSE_FLOOR: getEffectiveFloor(formData.houseFloor, formData.customFloor, 'tamil'),
      ADVANCE_AMOUNT: formatIndianNumber(advanceNum),
      ADVANCE_WORDS: tamilNumberToWords(advanceNum),
      RENT_AMOUNT: formatIndianNumber(rentNum),
      RENT_WORDS: tamilNumberToWords(rentNum),
      START_DATE_TA: formatTamilDate(formData.startDate),
      END_DATE_TA: formatTamilDate(formData.endDate),
    };
  }
}

async function generateSingleDocument(
  templatePath: string,
  formData: RentalFormData,
  language: 'english' | 'tamil'
): Promise<Blob> {
  const templateBuffer = await fetchTemplate(templatePath);
  const zip = new PizZip(templateBuffer);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: false,
    linebreaks: true,
  });

  const data = buildTemplateData(formData, language);
  doc.render(data);

  return doc.getZip().generate({
    type: 'blob',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

function getFilenameDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function generateDocument(
  formData: RentalFormData
): Promise<GenerationResult> {
  const date = getFilenameDate();
  const result: GenerationResult = { success: false };

  try {
    if (formData.language === 'english' || formData.language === 'both') {
      try {
        const englishBlob = await generateSingleDocument(
          ENGLISH_TEMPLATE_PATH,
          formData,
          'english'
        );
        result.englishBlob = englishBlob;
        result.englishFilename = `Rental_Agreement_English_${date}.docx`;
      } catch (e) {
        result.englishError =
          e instanceof Error ? e.message : 'English document generation failed.';
        if (formData.language === 'english') {
          result.error = result.englishError;
          return result;
        }
      }
    }

    if (formData.language === 'tamil' || formData.language === 'both') {
      try {
        const tamilBlob = await generateSingleDocument(
          TAMIL_TEMPLATE_PATH,
          formData,
          'tamil'
        );
        result.tamilBlob = tamilBlob;
        result.tamilFilename = `Rental_Agreement_Tamil_${date}.docx`;
      } catch (e) {
        result.tamilError =
          e instanceof Error ? e.message : 'Tamil document generation failed.';
        if (formData.language === 'tamil') {
          result.error = result.tamilError;
          return result;
        }
      }
    }

    if (formData.language === 'both') {
      result.success = !!(result.englishBlob || result.tamilBlob);
      if (result.englishError && result.tamilError) {
        result.error = 'Both document generations failed.';
        result.success = false;
      }
    } else {
      result.success = !!(result.englishBlob || result.tamilBlob);
    }

    return result;
  } catch (e) {
    result.error =
      e instanceof Error ? e.message : 'Document generation failed.';
    return result;
  }
}

export function downloadDocument(blob: Blob, filename: string): void {
  saveAs(blob, filename);
}
