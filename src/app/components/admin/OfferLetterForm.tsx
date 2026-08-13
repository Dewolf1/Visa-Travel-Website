import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { generateOfferLetterPDF, OfferLetterData } from '../../utils/generateOfferLetterPDF';

export const OfferLetterForm = () => {
  const defaultTerms = `1. Designation: Visa Executive
2. Work Location: Delhi
3. Compensation: As per the Salary Annexure attached below
4. Other Allowances: Nil
5. Incentive: Based on individual performance and company policy
6. Notice Period: 1 month notice is required from either side in case of resignation/termination`;
  const defaultAnnexureNotes = `1. Salary will be credited on or before 7th of every month.
2. Incentive will be calculated and paid monthly/quarterly as per company policy.`;

  const [formData, setFormData] = useState<OfferLetterData>({
    employeeName: '',
    salutation: 'Mr.',
    designation: 'Visa Executive',
    workLocation: 'Delhi',
    dateOfLetter: new Date().toISOString().split('T')[0],
    joiningDate: new Date().toISOString().split('T')[0],
    otherAllowances: 'Nil',
    incentiveText: 'Based on individual performance and company policy',
    noticePeriod: '1 month notice is required from either side in case of resignation/termination',
    basicSalary1: '22000',
    basicSalary2: '25000',
    otherAllowances1: '*',
    otherAllowances2: '*',
    grossSalary1: '22000',
    grossSalary2: '25000',
    termsAndConditions: defaultTerms,
    employerName: 'Mr. Faisal Siddiqui',
    employerDesignation: 'Managing Director',
    companyName: 'Visaovisa',
    annexureNotes: defaultAnnexureNotes,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    try {
      await generateOfferLetterPDF(formData);
    } catch (err: any) {
      console.error('Error generating PDF:', err);
      alert(`Failed to generate PDF: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-zinc-800 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#d4af37] font-outfit">Offer Letter Generator</h1>
          <p className="text-zinc-400 mt-2">Fill the details below to generate a branded PDF.</p>
        </div>
        <Button onClick={handleGenerate} className="bg-[#d4af37] hover:bg-[#c5a017] text-black font-bold px-6 py-2">
          Generate PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Section 1: Employee Details */}
        <div className="space-y-6 bg-zinc-900/50 p-4 md:p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 border-b border-zinc-800 pb-2">Employee Details</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              <label className="block text-sm text-zinc-400 mb-2">Salutation</label>
              <select name="salutation" value={formData.salutation} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:border-[#d4af37]/50">
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
              </select>
            </div>
            <div className="w-full sm:w-2/3">
              <label className="block text-sm text-zinc-400 mb-2">Employee Name</label>
              <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:border-[#d4af37]/50" placeholder="e.g. Atif Kazmi" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Designation</label>
            <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Work Location</label>
            <input type="text" name="workLocation" value={formData.workLocation} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Date of Letter</label>
              <input type="date" name="dateOfLetter" value={formData.dateOfLetter} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Joining Date</label>
              <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>
        </div>

        {/* Section 2: Salary Annexure */}
        <div className="space-y-6 bg-zinc-900/50 p-4 md:p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 border-b border-zinc-800 pb-2">Salary Details (Annexure)</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Basic Salary (1st Mth)</label>
              <input type="text" name="basicSalary1" value={formData.basicSalary1} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Basic Salary (2nd Mth+)</label>
              <input type="text" name="basicSalary2" value={formData.basicSalary2} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Other Allowances (1st)</label>
              <input type="text" name="otherAllowances1" value={formData.otherAllowances1} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Other Allowances (2nd)</label>
              <input type="text" name="otherAllowances2" value={formData.otherAllowances2} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Gross Salary (1st)</label>
              <input type="text" name="grossSalary1" value={formData.grossSalary1} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Gross Salary (2nd)</label>
              <input type="text" name="grossSalary2" value={formData.grossSalary2} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Incentive Details</label>
            <input type="text" name="incentiveText" value={formData.incentiveText} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Salary Annexure Notes (Editable)</label>
            <textarea 
              name="annexureNotes" 
              value={formData.annexureNotes} 
              onChange={handleChange} 
              rows={3}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:border-[#d4af37]/50"
            />
          </div>
        </div>
        
        {/* Section 3: Terms & Extras */}
        <div className="space-y-6 bg-zinc-900/50 p-4 md:p-6 rounded-xl border border-zinc-800 md:col-span-2">
          <h2 className="text-xl font-semibold text-[#d4af37] mb-4 border-b border-zinc-800 pb-2">Terms & Employer Info</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Employer Name</label>
              <input type="text" name="employerName" value={formData.employerName} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Employer Designation</label>
              <input type="text" name="employerDesignation" value={formData.employerDesignation} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-[#d4af37]/50" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Terms & Conditions (Editable text that will appear on the PDF)</label>
            <textarea 
              name="termsAndConditions" 
              value={formData.termsAndConditions} 
              onChange={handleChange} 
              rows={5}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:border-[#d4af37]/50"
              placeholder="1. Designation: Visa Executive&#10;2. Work Location: Delhi&#10;3. Compensation: ..."
            />
          </div>
        </div>

      </div>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={handleGenerate} className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#c5a017] text-black px-10 py-6 text-lg font-bold rounded-xl shadow-lg shadow-[#d4af37]/20 transition-all duration-300 transform hover:scale-105">
          Generate Offer Letter PDF
        </Button>
      </div>
    </>
  );
};
