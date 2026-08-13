import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { generateEmploymentContractPDF, EmploymentContractData } from '../../utils/generateEmploymentContractPDF';

export const EmploymentContractForm = () => {
  const [formData, setFormData] = useState<EmploymentContractData>({
    agreementDate: new Date().toISOString().split('T')[0],
    companyName: 'Visaovisa',
    companyAddress: 'Delhi, India',
    employeeName: '',
    employeeAddress: '',
    jobTitle: 'Visa Executive',
    supervisorName: 'Mr. Faisal Siddiqui',
    coreDuties: `Processing visa applications efficiently.\nManaging client communications.\nMaintaining accurate records.`,
    startDate: new Date().toISOString().split('T')[0],
    employmentType: 'Full-Time',
    workLocation: 'Delhi Office',
    baseSalary: 'INR 3,00,000',
    paymentSchedule: 'last day of each month',
    benefits: 'health insurance and performance bonuses',
    workingHours: '9:00 AM to 6:00 PM, Monday through Saturday',
    annualLeaveDays: '15',
    probationPeriod: '3 months',
    probationNotice: '7 days',
    standardNotice: '30 days',
    governingLaw: 'Delhi, India',
    signatoryName: 'Mr. Faisal Siddiqui'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    try {
      await generateEmploymentContractPDF(formData);
    } catch (err: any) {
      console.error('Error generating PDF:', err);
      alert(`Failed to generate PDF: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-zinc-800 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#d4af37] font-outfit">Employment Contract</h1>
          <p className="text-zinc-400 mt-2">Generate a formal Employment Contract PDF.</p>
        </div>
        <Button onClick={handleGenerate} className="bg-[#d4af37] hover:bg-[#c5a017] text-black font-bold px-6 py-2">
          Generate PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Section 1: Parties */}
        <div className="space-y-6 bg-zinc-900/50 p-4 md:p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 border-b border-zinc-800 pb-2">1. Parties & Dates</h2>
          
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Agreement Date</label>
            <input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Company Address</label>
              <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Employee Name</label>
              <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Employee Address</label>
              <input type="text" name="employeeAddress" value={formData.employeeAddress} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>
        </div>

        {/* Section 2: Job Details */}
        <div className="space-y-6 bg-zinc-900/50 p-4 md:p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 border-b border-zinc-800 pb-2">2. Job Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Job Title</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Supervisor Name</label>
              <input type="text" name="supervisorName" value={formData.supervisorName} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Type</label>
              <input type="text" name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Location</label>
              <input type="text" name="workLocation" value={formData.workLocation} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Core Duties (One per line)</label>
            <textarea name="coreDuties" value={formData.coreDuties} onChange={handleChange} rows={3} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:border-[#d4af37]/50" />
          </div>
        </div>

        {/* Section 3: Compensation & Hours */}
        <div className="space-y-6 bg-zinc-900/50 p-4 md:p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 border-b border-zinc-800 pb-2">3. Compensation & Hours</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Base Salary</label>
              <input type="text" name="baseSalary" value={formData.baseSalary} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Payment Schedule</label>
              <input type="text" name="paymentSchedule" value={formData.paymentSchedule} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Benefits</label>
            <input type="text" name="benefits" value={formData.benefits} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Working Hours</label>
              <input type="text" name="workingHours" value={formData.workingHours} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Annual Leave Days</label>
              <input type="text" name="annualLeaveDays" value={formData.annualLeaveDays} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>
        </div>

        {/* Section 4: Terms & Signatures */}
        <div className="space-y-6 bg-zinc-900/50 p-4 md:p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 border-b border-zinc-800 pb-2">4. Terms & Signatures</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Probation Period</label>
              <input type="text" name="probationPeriod" value={formData.probationPeriod} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Probation Notice</label>
              <input type="text" name="probationNotice" value={formData.probationNotice} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Standard Notice</label>
              <input type="text" name="standardNotice" value={formData.standardNotice} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Governing Law</label>
              <input type="text" name="governingLaw" value={formData.governingLaw} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Signatory Name</label>
              <input type="text" name="signatoryName" value={formData.signatoryName} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>
        </div>

      </div>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={handleGenerate} className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#c5a017] text-black px-10 py-6 text-lg font-bold rounded-xl shadow-lg shadow-[#d4af37]/20 transition-all duration-300 transform hover:scale-105">
          Generate Contract PDF
        </Button>
      </div>
    </>
  );
};
