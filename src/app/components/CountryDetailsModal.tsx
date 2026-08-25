import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, ChevronDown, CheckCircle2, MessageCircle, Info } from 'lucide-react';
import { toast } from 'sonner';
import { submitForm } from '../utils/formSubmit';

interface Country {
  name: string;
  flag: string;
  popular: boolean;
  desc: string;
  visaTypes: string[];
  isSchengen?: boolean;
}

interface CountryDetailsModalProps {
  country: Country;
  onClose: () => void;
}

const getVisaRequirements = (visaType: string, country: Country) => {
  const isSchengen = country.isSchengen;
  const cName = country.name;

  const requirements: Record<string, string[]> = {
    'Tourist Visa': isSchengen ? [
      `Original passport containing at least 2 blank pages, valid for 6 months beyond intended stay in the Schengen Area.`,
      `Completed and signed Schengen visa application form for ${cName}.`,
      `Two recent colour photographs (3.5 x 4.5 cm) meeting ICAO standards with a light background.`,
      `Travel Medical Insurance covering emergency medical, hospitalization, and repatriation (minimum €30,000 coverage across all Schengen states).`,
      `Confirmed flight itineraries and proof of accommodation (e.g., hotel bookings in ${cName}).`,
      `Financial Proof (recent bank statements for the last 6 months, stamped and signed, and salary slips).`,
      `Cover letter detailing the purpose of your trip to ${cName} and your planned travel itinerary.`
    ] : [
      `Original passport containing at least 2 blank pages for visas, valid for a period of 6 months after the visa expires.`,
      `Online application form completed and signed by the applicant for ${cName}.`,
      `One colour photograph 3.5 x 4.5 cm with light-coloured background.`,
      `Tourist confirmation letter or hotel booking confirmation in ${cName}.`,
      `Day-to-day itinerary if travel is more than 14 days.`,
      `Confirmed return flight tickets.`,
      `Proof of sufficient funds (bank statements for the last 6 months).`
    ],
    'Business Visa': isSchengen ? [
      `Original passport valid for at least 6 months beyond intended stay in the Schengen Area.`,
      `Completed and signed Schengen business visa application form for ${cName}.`,
      `Travel Medical Insurance (minimum €30,000 coverage).`,
      `Invitation letter from the host organization/company in ${cName} detailing the purpose and duration of stay.`,
      `Covering letter from your current employer stating your position, purpose of visit, and financial sponsorship details.`,
      `Company bank statements for the last 6 months.`
    ] : [
      `Original passport containing at least 2 blank pages, valid for 6 months.`,
      `Application form completed and signed by the applicant for ${cName}.`,
      `Invitation letter from the host organization or Ministry of Foreign Affairs in ${cName}.`,
      `Covering letter from the applicant's company stating the purpose of visit.`,
      `Company bank statement for the last 6 months.`
    ],
    'Work Visa': [
      `Original passport with 6 months validity.`,
      `Employment contract or letter of intent from the employer in ${cName}.`,
      `Educational certificates (apostilled/attested).`,
      `Medical fitness certificate from an authorized center.`,
      `Police clearance certificate (PCC).`
    ],
    'Transit Visa': [
      `Original passport valid for at least 6 months.`,
      `Valid visa for the destination country.`,
      `Confirmed onward flight tickets from ${cName}.`,
      `One recent passport-sized photograph.`
    ]
  };
  
  // Default fallback
  const defaultReq = [
    `Original passport valid for at least 6 months.`,
    `Completed and signed visa application form for ${cName}.`,
    `Two recent passport-sized photographs.`,
    `Proof of sufficient funds for the duration of stay.`,
    `Confirmed travel itinerary.`
  ];
  
  // Match key or fallback
  for (const [key, value] of Object.entries(requirements)) {
    if (visaType.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return defaultReq;
};

// Mock table details based on visa types
const getVisaDetails = (visaType: string, country: Country) => {
  const isSchengen = country.isSchengen;

  if (isSchengen) {
    if (visaType.toLowerCase().includes('business')) {
      return { type: 'Short-Stay (Type C)', validity: 'up to 90 days (within 180 days)', processing: 'Approx. 15 Working days' };
    } else {
      return { type: 'Short-Stay (Type C)', validity: 'up to 90 days (within 180 days)', processing: 'Approx. 15 Working days' };
    }
  }

  if (visaType.toLowerCase().includes('business')) {
    return { type: 'Single/ Double Entry', validity: 'up to 1 years', processing: 'Minimum 5 Working days' };
  } else if (visaType.toLowerCase().includes('work')) {
    return { type: 'Single Entry', validity: 'up to 2 years', processing: 'Minimum 10-15 Working days' };
  } else {
    // Tourist / Visit
    return { type: 'Single/ Double Entry', validity: 'up to 30/90 days', processing: 'Minimum 5 Working days' };
  }
};


export function CountryDetailsModal({ country, onClose }: CountryDetailsModalProps) {
  const [activeTab, setActiveTab] = useState(country.visaTypes[0]);
  const [showForm, setShowForm] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visaType: activeTab, // initialize with active tab
    message: '',
  });

  // Keep form visaType in sync with activeTab when opening form
  const handleApplyClick = () => {
    setFormData(prev => ({ ...prev, visaType: activeTab }));
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { waLink, emailSent } = await submitForm({
      subject: `Visa Application — ${country.name}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination_country: country.name,
      visa_type: formData.visaType,
      message: formData.message,
    });
    setWaLink(waLink);
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success(
      emailSent ? `Application submitted for ${country.name}!` : 'Details received!',
      { description: 'Our expert will contact you within 24 hours.', duration: 5000 }
    );
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header - Banner Style */}
        <div className="relative bg-gradient-to-r from-[#0A1628] to-[#1E2D44] shrink-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:rotate-90 duration-300"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="px-6 py-8 sm:px-10 sm:py-12 relative z-10 text-center flex flex-col items-center">
             <div className="text-6xl mb-3 filter drop-shadow-xl">{country.flag}</div>
             <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold">{country.name}</h2>
             <p className="text-[#C9A84C] mt-2 font-medium tracking-wide">{country.desc}</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#F8F9FA]">
          {showForm ? (
            /* --- Application Form View --- */
            <div className="p-6 sm:p-10 max-w-2xl mx-auto">
              <button 
                onClick={() => setShowForm(false)}
                className="mb-6 text-sm font-semibold text-gray-500 hover:text-[#0A1628] flex items-center gap-1 transition-colors"
              >
                &larr; Back to Requirements
              </button>
              
              {submitted ? (
                <div className="py-10 flex flex-col items-center text-center gap-5">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-[#0A1628]">Application Received!</h4>
                  <p className="text-gray-600 max-w-sm">
                    We'll review your {country.name} visa application and contact you within 24 hours.
                    For the fastest response, send it on WhatsApp too.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#1ebe5d] transition-all shadow-lg w-full max-w-sm justify-center"
                  >
                    <MessageCircle className="w-5 h-5" /> Send via WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                     <h3 className="text-2xl font-serif font-bold text-[#0A1628]">Apply for {activeTab}</h3>
                     <p className="text-gray-500 text-sm mt-1">Please fill in your details to start the processing.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name *</label>
                        <input name="name" type="text" required value={formData.name} onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all shadow-sm text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Phone *</label>
                        <input name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                          placeholder="+91 XXXXX"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all shadow-sm text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email</label>
                      <input name="email" type="email" value={formData.email} onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all shadow-sm text-sm" />
                    </div>

                    <div className="relative">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Visa Type *</label>
                      <select name="visaType" required value={formData.visaType} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all shadow-sm text-sm appearance-none">
                        <option value="">Select visa type</option>
                        {country.visaTypes.map(vt => <option key={vt} value={vt}>{vt}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 bottom-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Message</label>
                      <textarea name="message" rows={3} value={formData.message} onChange={handleChange}
                        placeholder="Tell us more about your requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all shadow-sm text-sm resize-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className="w-full bg-[#0A1628] text-white font-bold py-4 rounded-xl hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 group mt-4"
                    >
                      {isSubmitting
                        ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <><Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Submit Application</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          ) : (
            /* --- Requirements / Details View --- */
            <div>
              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-gray-200 bg-white sticky top-0 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {country.visaTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`whitespace-nowrap px-4 sm:px-6 py-3.5 sm:py-4 text-[11px] sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                      activeTab === type
                        ? 'border-[#E32144] text-[#E32144] bg-[#E32144]/5'
                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="p-3 sm:p-6 lg:p-8 animate-in fade-in duration-300">
                {/* Information Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-8">
                  <div className="bg-[#E32144] px-4 py-3 text-center">
                     <h3 className="text-white font-bold tracking-wide uppercase text-base sm:text-lg">{activeTab.toUpperCase()}</h3>
                  </div>
                  
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-700 font-bold">
                          <th className="px-5 py-4">Type Of Visa</th>
                          <th className="px-5 py-4">Validity</th>
                          <th className="px-5 py-4">Processing</th>
                          <th className="px-5 py-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-4 text-sm text-gray-800 font-medium">
                            {getVisaDetails(activeTab, country).type}
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-600">
                            {getVisaDetails(activeTab, country).validity}
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-600">
                            {getVisaDetails(activeTab, country).processing}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <button 
                              onClick={handleApplyClick}
                              className="bg-[#28a745] text-white text-xs font-bold px-4 py-2 rounded shadow-sm hover:bg-[#218838] transition-colors uppercase tracking-wider inline-flex items-center gap-1.5"
                            >
                              Apply
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden flex flex-col p-4 gap-3.5 bg-gray-50/30">
                     <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wide">Type Of Visa</span>
                       <span className="text-sm font-semibold text-gray-800 text-right">{getVisaDetails(activeTab, country).type}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wide">Validity</span>
                       <span className="text-sm font-semibold text-gray-800 text-right">{getVisaDetails(activeTab, country).validity}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                       <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wide">Processing</span>
                       <span className="text-sm font-semibold text-gray-800 text-right">{getVisaDetails(activeTab, country).processing}</span>
                     </div>
                     <div className="pt-1">
                        <button 
                          onClick={handleApplyClick}
                          className="w-full bg-[#28a745] text-white text-sm font-bold px-4 py-3 rounded-xl shadow-md hover:bg-[#218838] transition-all uppercase tracking-wider flex justify-center items-center gap-2 active:scale-[0.98]"
                        >
                          Apply Now
                        </button>
                     </div>
                  </div>
                </div>

                {/* Visa Requirement Checklist */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="bg-[#E32144] px-4 py-3 text-center">
                     <h3 className="text-white font-bold tracking-wide uppercase text-base sm:text-lg">VISA REQUIREMENT</h3>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8">
                     <h4 className="text-[#E32144] font-serif font-bold text-lg sm:text-2xl mb-5 uppercase text-center leading-tight">
                        {country.name.toUpperCase()} {activeTab.toUpperCase()} CHECKLIST
                     </h4>
                     
                     <p className="font-bold text-gray-800 mb-5 italic">
                       Documents to be submitted while applying for {activeTab.toLowerCase()}:
                     </p>
                     
                     <ul className="space-y-4">
                       {getVisaRequirements(activeTab, country).map((req, i) => (
                         <li key={i} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
                           <span className="font-bold text-[#E32144] mt-0.5">{i + 1}.</span>
                           <span dangerouslySetInnerHTML={{ __html: req.replace(/Important:/g, '<strong>Important:</strong>').replace(/Please note:/g, '<em><strong>Please note:</strong></em>') }} />
                         </li>
                       ))}
                     </ul>
                     
                     <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 mb-6">
                           <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                           <p className="text-sm text-amber-800">
                             <strong>Note:</strong> Additional documents may be required based on the consulate's discretion. Ensure all documents are clear and valid.
                           </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                           <a 
                             href={`https://wa.me/919873005319?text=${encodeURIComponent(`Hi, I would like to inquire about the ${country.name} ${activeTab}.`)}`}
                             target="_blank" rel="noopener noreferrer"
                             className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#1ebe5d] transition-all shadow-md active:scale-95"
                           >
                             <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
                           </a>
                           
                           <a 
                             href="tel:+919873005319"
                             className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
                           >
                             Call +91 98730 05319
                           </a>
                        </div>
                     </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}
