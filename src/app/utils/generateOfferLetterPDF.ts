import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { loadImageData, addBanner, addWatermark, formatDate } from './pdfHelpers';

export interface OfferLetterData {
  employeeName: string;
  salutation: string;
  designation: string;
  workLocation: string;
  dateOfLetter: string;
  joiningDate: string;
  otherAllowances: string;
  incentiveText: string;
  noticePeriod: string;
  basicSalary1: string;
  basicSalary2: string;
  otherAllowances1: string;
  otherAllowances2: string;
  grossSalary1: string;
  grossSalary2: string;
  termsAndConditions: string;
  employerName: string;
  employerDesignation: string;
  companyName: string;
  annexureNotes: string;
}

export const generateOfferLetterPDF = async (
  data: OfferLetterData,
  bannerUrl: string = '/logo-banner.png',
  watermarkUrl: string = '/watermark.png'
) => {
  // Load images
  const [bannerImg, watermarkImg] = await Promise.all([
    loadImageData(bannerUrl),
    loadImageData(watermarkUrl),
  ]);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // --- PAGE 1: LETTER OF OFFER ---
  
  // Banner
  const bannerHeight = addBanner(doc, bannerImg);
  let currentY = bannerHeight + 15;

  // Watermark starts below the banner
  addWatermark(doc, watermarkImg, bannerHeight);

  // Title & Date
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('LETTER OF OFFER', pageWidth / 2, currentY, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`DATE – ${formatDate(data.dateOfLetter)}`, pageWidth - margin, currentY, { align: 'right' });
  
  currentY += 20;

  // Greeting
  doc.setFontSize(10);
  doc.text(`Dear ${data.salutation} ${data.employeeName},`, margin, currentY);
  currentY += 10;

  // Body paragraph
  const introText = `With reference to your application and subsequent discussion with us, we at "${data.companyName}" are pleased to offer you the position of "${data.designation}" at our ${data.workLocation} office.`;
  const splitIntro = doc.splitTextToSize(introText, contentWidth);
  doc.text(splitIntro, margin, currentY);
  currentY += (splitIntro.length * 5) + 10;

  // Joining Date
  doc.text(`You are required to join on ${formatDate(data.joiningDate)}`, margin, currentY);
  currentY += 10;

  // Terms & Conditions
  doc.setFont('helvetica', 'bold');
  doc.text('Terms & Conditions:', margin, currentY);
  doc.setFont('helvetica', 'normal');
  currentY += 8;

  const defaultTerms = [
    `1. Designation: ${data.designation}`,
    `2. Work Location: ${data.workLocation}`,
    `3. Compensation: As per the Salary Annexure attached below`,
    `4. Other Allowances: ${data.otherAllowances}`,
    `5. Incentive: ${data.incentiveText}`,
    `6. Notice Period: ${data.noticePeriod}`
  ];

  // If user provided custom terms, parse them, otherwise use defaults
  let termsToPrint = defaultTerms;
  if (data.termsAndConditions && data.termsAndConditions.trim() !== '') {
    termsToPrint = data.termsAndConditions.split('\n').filter(t => t.trim() !== '');
  }

  termsToPrint.forEach(term => {
    const splitTerm = doc.splitTextToSize(term, contentWidth - 5);
    doc.text(splitTerm, margin + 5, currentY); // Indent slightly
    currentY += splitTerm.length * 6;
  });

  currentY += 10;

  // Closing paragraph
  const closingText = `Please sign and return the duplicate copy of this letter along with the annexure as a token of your acceptance.\nWe look forward to having you on board and wish you a long and successful association with "${data.companyName}"`;
  const splitClosing = doc.splitTextToSize(closingText, contentWidth);
  doc.text(splitClosing, margin, currentY);
  currentY += (splitClosing.length * 5) + 15;

  // Signatures
  doc.text('Sincerely,', margin, currentY);
  doc.text('Acceptance:', pageWidth / 2 + 10, currentY);
  currentY += 15;

  doc.setFont('helvetica', 'bold');
  doc.text(data.employerName, margin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text('I accept the above offer and terms.', pageWidth / 2 + 10, currentY);
  currentY += 5;

  doc.text(data.employerDesignation, margin, currentY);
  doc.text(`Name: ${data.employeeName}`, pageWidth / 2 + 10, currentY);
  currentY += 5;

  doc.text(data.companyName, margin, currentY);
  doc.text('Signature:', pageWidth / 2 + 10, currentY);
  currentY += 10;
  
  doc.text('Date:', pageWidth / 2 + 10, currentY);

  // --- PAGE 2: SALARY ANNEXURE ---
  doc.addPage();
  
  // Banner & Watermark
  addBanner(doc, bannerImg);
  currentY = bannerHeight + 20;
  addWatermark(doc, watermarkImg, bannerHeight);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('*SALARY ANNEXURE*', margin, currentY);
  currentY += 10;

  // Table
  autoTable(doc, {
    startY: currentY,
    head: [['Particular', '1st Month', '2nd month onwards']],
    body: [
      ['Basic + Fixed Salary', `Rs ${data.basicSalary1}`, `Rs ${data.basicSalary2}`],
      ['Other allowances', data.otherAllowances1, data.otherAllowances2],
      ['Gross Salary', `Rs ${data.grossSalary1}`, `Rs ${data.grossSalary2}`],
      ['Incentive', data.incentiveText, data.incentiveText],
    ],
    theme: 'grid',
    styles: { 
      font: 'helvetica', 
      fontSize: 10,
      textColor: [0, 0, 0],
      lineColor: [100, 100, 100],
      lineWidth: 0.1
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    },
    margin: { left: margin, right: margin }
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 20;

  // Employee details below table
  doc.setFont('helvetica', 'normal');
  doc.text(`Employee Name : ${data.salutation} ${data.employeeName}`, margin, currentY);
  currentY += 6;
  doc.text(`Designation : ${data.designation}`, margin, currentY);
  currentY += 6;
  doc.text(`Company : ${data.companyName}`, margin, currentY);
  currentY += 6;
  doc.text(`Location : ${data.workLocation}`, margin, currentY);
  currentY += 15;

  // Notes
  doc.setFont('helvetica', 'bold');
  doc.text('Notes:', margin, currentY);
  doc.setFont('helvetica', 'normal');
  currentY += 6;
  
  const notesLines = data.annexureNotes 
    ? data.annexureNotes.split('\n').filter(n => n.trim() !== '')
    : [];
    
  notesLines.forEach(note => {
    const splitNote = doc.splitTextToSize(note, contentWidth);
    doc.text(splitNote, margin, currentY);
    currentY += splitNote.length * 6;
  });
  
  currentY += 9;

  // Regards
  doc.setFont('helvetica', 'bold');
  doc.text('Regards', margin, currentY);
  currentY += 10;
  doc.text(data.employerName, margin, currentY);
  currentY += 5;
  doc.setFont('helvetica', 'normal');
  doc.text(data.employerDesignation, margin, currentY);


  // Save PDF
  const filename = `${data.employeeName.replace(/\s+/g, '_')}_Offer_Letter.pdf`;
  doc.save(filename);
};
