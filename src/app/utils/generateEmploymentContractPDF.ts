import jsPDF from 'jspdf';
import { loadImageData, addBanner, addWatermark, formatDate } from './pdfHelpers';

export interface EmploymentContractData {
  agreementDate: string;
  companyName: string;
  companyAddress: string;
  employeeName: string;
  employeeAddress: string;
  jobTitle: string;
  supervisorName: string;
  coreDuties: string;
  startDate: string;
  employmentType: string;
  workLocation: string;
  baseSalary: string;
  paymentSchedule: string;
  benefits: string;
  workingHours: string;
  annualLeaveDays: string;
  probationPeriod: string;
  probationNotice: string;
  standardNotice: string;
  governingLaw: string;
  signatoryName: string;
}

export const generateEmploymentContractPDF = async (
  data: EmploymentContractData,
  bannerUrl: string = '/logo-banner.png',
  watermarkUrl: string = '/watermark.png'
) => {
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
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  let bannerHeight = addBanner(doc, bannerImg);
  let currentY = bannerHeight + 15;
  addWatermark(doc, watermarkImg, bannerHeight);

  const checkPageBreak = (neededSpace: number) => {
    if (currentY + neededSpace > pageHeight - margin) {
      doc.addPage();
      bannerHeight = addBanner(doc, bannerImg);
      currentY = bannerHeight + 15;
      addWatermark(doc, watermarkImg, bannerHeight);
    }
  };

  const printText = (text: string, isBold: boolean = false, fontSize: number = 10, indent: number = 0, lineSpacing: number = 5) => {
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setFontSize(fontSize);
    
    if (text === '') {
      currentY += lineSpacing;
      return;
    }

    const lines = doc.splitTextToSize(text, contentWidth - indent);
    checkPageBreak(lines.length * lineSpacing);
    doc.text(lines, margin + indent, currentY);
    currentY += lines.length * lineSpacing;
  };

  // TITLE
  printText('EMPLOYMENT CONTRACT', true, 14);
  currentY += 5;

  printText(`This Employment Contract (the "Agreement") is entered into and made effective as of ${formatDate(data.agreementDate)} (the "Effective Date"), by and between:`);
  currentY += 5;

  printText('The Employer:', true);
  printText(`${data.companyName}, located at ${data.companyAddress} (hereinafter referred to as the "Company").`);
  currentY += 5;

  printText('The Employee:', true);
  printText(`${data.employeeName}, residing at ${data.employeeAddress} (hereinafter referred to as the "Employee").`);
  currentY += 8;

  // 1. POSITION AND DUTIES
  printText('1. POSITION AND DUTIES', true, 11);
  currentY += 2;
  printText(`The Company agrees to employ the Employee in the position of ${data.jobTitle}. The Employee will report directly to ${data.supervisorName}. The Employee's primary duties include:`);
  currentY += 2;
  
  const duties = data.coreDuties ? data.coreDuties.split('\n').filter(d => d.trim() !== '') : [];
  duties.forEach(duty => {
    printText(`• ${duty}`, false, 10, 5);
  });
  currentY += 8;

  // 2. COMMENCEMENT AND PLACE OF WORK
  printText('2. COMMENCEMENT AND PLACE OF WORK', true, 11);
  currentY += 2;
  printText(`Start Date: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`The Employee's employment will begin on ${formatDate(data.startDate)}.`, margin + 20, currentY); currentY += 6;
  checkPageBreak(6);
  printText(`Type: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`This is a ${data.employmentType} position.`, margin + 11, currentY); currentY += 6;
  checkPageBreak(6);
  printText(`Location: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`The primary place of work is ${data.workLocation}.`, margin + 18, currentY); currentY += 10;

  // 3. COMPENSATION AND BENEFITS
  printText('3. COMPENSATION AND BENEFITS', true, 11);
  currentY += 2;
  printText(`Base Salary: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`The Company will pay the Employee a gross annual salary of`, margin + 24, currentY); 
  currentY += 5; printText(`${data.baseSalary}, payable in monthly instalments on the ${data.paymentSchedule}.`);
  currentY += 2;
  printText(`Taxes: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`All payments are subject to standard statutory tax deductions at source.`, margin + 13, currentY); currentY += 6;
  checkPageBreak(6);
  printText(`Benefits: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`The Employee is eligible to participate in company-provided benefits, including`, margin + 17, currentY); 
  currentY += 5; printText(`${data.benefits}, subject to company policy.`);
  currentY += 8;

  // 4. WORKING HOURS AND LEAVE
  printText('4. WORKING HOURS AND LEAVE', true, 11);
  currentY += 2;
  printText(`Hours: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`The standard working hours are ${data.workingHours}.`, margin + 13, currentY); currentY += 6;
  checkPageBreak(6);
  printText(`Leave: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`The Employee is entitled to ${data.annualLeaveDays} days of paid annual leave per calendar year, accrued monthly.`, margin + 13, currentY); currentY += 10;

  // 5. CONFIDENTIALITY AND PROPRIETARY RIGHTS
  printText('5. CONFIDENTIALITY AND PROPRIETARY RIGHTS', true, 11);
  currentY += 2;
  printText(`Confidentiality: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`The Employee agrees to keep all company trade secrets, client data, and`, margin + 28, currentY); 
  currentY += 5; printText(`business strategies strictly confidential during and after employment.`);
  currentY += 2;
  printText(`Intellectual Property: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`Any work, software, code, designs, or materials created by the`, margin + 38, currentY); 
  currentY += 5; printText(`Employee during working hours belong exclusively to the Company.`);
  currentY += 8;

  // 6. PROBATION AND TERMINATION
  printText('6. PROBATION AND TERMINATION', true, 11);
  currentY += 2;
  printText(`Probationary Period: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`The first ${data.probationPeriod} of employment constitute a probationary period.`, margin + 37, currentY); 
  currentY += 5; printText(`During this time, either party can terminate employment with ${data.probationNotice} written notice.`);
  currentY += 2;
  printText(`Standard Notice Period: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`After probation, either party may terminate this Agreement by giving`, margin + 43, currentY); 
  currentY += 5; printText(`${data.standardNotice} written notice.`);
  currentY += 2;
  printText(`Termination for Cause: `, true, 10, 0, 0); doc.setFont('helvetica', 'normal'); doc.text(`The Company reserves the right to terminate employment immediately`, margin + 42, currentY); 
  currentY += 5; printText(`without notice or severance for gross misconduct, fraud, or neglect of duty.`);
  currentY += 8;

  // 7. GOVERNING LAW
  printText('7. GOVERNING LAW', true, 11);
  currentY += 2;
  printText(`This Agreement shall be governed by, and construed in accordance with, the laws of ${data.governingLaw}.`);
  currentY += 15;

  // SIGNATURES
  checkPageBreak(40);
  printText('IN WITNESS WHEREOF, the parties hereto have executed this Employment Contract as of the date first written above.');
  currentY += 15;

  const sigY = currentY;
  
  // Left Signature
  doc.setFont('helvetica', 'bold');
  doc.text(`For ${data.companyName}`, margin, sigY);
  currentY += 20;
  doc.text(data.signatoryName, margin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text('(Authorized Signatory)', margin, currentY + 5);
  doc.text('Date: _________________', margin, currentY + 15);

  // Right Signature
  doc.setFont('helvetica', 'bold');
  doc.text(data.employeeName, pageWidth / 2 + 10, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text('(Employee Signature)', pageWidth / 2 + 10, currentY + 5);
  doc.text('Date: _________________', pageWidth / 2 + 10, currentY + 15);

  const filename = `${data.employeeName.replace(/\s+/g, '_')}_Contract.pdf`;
  doc.save(filename);
};
