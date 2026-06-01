import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Briefcase, CheckCircle, ArrowRight, FileText, Clock } from 'lucide-react';

type VisaResult = {
  type: string;
  message: string;
  documents: string[];
  time: string;
};

const VISA_MATRIX: Record<string, Record<string, VisaResult>> = {
  saudi: {
    work:    { type: 'Saudi Work Visa', message: 'Eligible! Your employer in Saudi Arabia must provide a visa block number.', time: '7–12 working days', documents: ['Passport (6+ months validity)', 'GAMCA Medical Fitness Report', 'Police Clearance Certificate (PCC)', 'Attested Educational Certificates', 'Employer Visa Block Number', 'Passport-size Photographs'] },
    tourist: { type: 'Saudi eVisa (Tourist)', message: 'Saudi Arabia offers online tourist visas — fast and convenient!', time: '3–5 working days', documents: ['Valid Passport', 'Passport-size Photograph', 'Travel Itinerary / Hotel Booking', 'Return Flight Ticket'] },
    business:{ type: 'Saudi Business Visa', message: 'Requires a formal invitation letter from a Saudi-registered company.', time: '5–8 working days', documents: ['Original Passport', 'Invitation Letter from Saudi Host Company', 'Chamber of Commerce Letter', 'Business Profile'] },
    transit: { type: 'Saudi Transit Visa', message: 'Transit visas are available for connecting flights via Saudi airports.', time: '2–3 working days', documents: ['Passport', 'Onward Confirmed Ticket', 'Destination Country Visa'] },
  },
  uae: {
    tourist: { type: 'UAE Tourist eVisa', message: 'UAE Tourist visa processed online — usually within 48–72 hours!', time: '2–4 working days', documents: ['Passport (6+ months validity)', 'Recent Photograph', 'Return Flight Ticket', 'Hotel Booking or Sponsor Details', 'Bank Statement (last 3 months)'] },
    work:    { type: 'UAE Employment Visa', message: 'Requires a valid employment offer from a UAE-registered company.', time: '7–14 working days', documents: ['Passport', 'Job Offer / Appointment Letter', 'Attested Educational Certificates', 'Medical Fitness Test Results'] },
    business:{ type: 'UAE Business Visa', message: 'Valid for attending meetings, conferences, or trade events in the UAE.', time: '3–5 working days', documents: ['Passport', 'Business Registration Certificate', 'Bank Statement (3 months)', 'Invitation from UAE Entity'] },
    transit: { type: 'UAE Transit Visa', message: 'Transit visas for Dubai / Abu Dhabi layovers available.', time: '1–2 working days', documents: ['Passport', 'Onward Confirmed Ticket'] },
  },
  kuwait: {
    work:    { type: 'Kuwait Work Visa', message: 'Kuwait Work Visa requires sponsorship from a Kuwaiti employer.', time: '7–15 working days', documents: ['Passport', 'GAMCA Medical Report', 'Police Clearance Certificate', 'Attested Educational Certificates', 'Employment Contract'] },
    tourist: { type: 'Kuwait Visit Visa', message: 'Visit visas require a local sponsor (friend or family) in Kuwait.', time: '5–10 working days', documents: ['Passport', "Kuwaiti Sponsor's Civil ID Copy", "Sponsor's Undertaking Letter", "Sponsor's NOC"] },
    business:{ type: 'Kuwait Business Visa', message: 'Required for commercial activities and meetings in Kuwait.', time: '5–8 working days', documents: ['Passport', 'Company Invitation Letter', 'Chamber of Commerce Documents', 'Business Profile'] },
    transit: { type: 'Kuwait Transit', message: 'Most nationalities can transit Kuwait for up to 72 hours without a visa.', time: 'Immediate', documents: ['Passport', 'Onward Confirmed Ticket'] },
  },
  qatar: {
    work:    { type: 'Qatar Work Visa', message: 'Work visa requires a valid work contract with a Qatari employer.', time: '7–14 working days', documents: ['Passport', 'Employment Contract', 'Medical Fitness Certificate', 'Attested Educational Certificates'] },
    tourist: { type: 'Qatar Tourist eVisa', message: 'Indian passport holders can apply online for a Qatar tourist visa.', time: '3–5 working days', documents: ['Passport', 'Hotel Booking', 'Return Ticket', 'Bank Statement'] },
    business:{ type: 'Qatar Business Visa', message: 'Required for business visits — invitation from a Qatar entity needed.', time: '4–7 working days', documents: ['Passport', 'Invitation Letter from Qatar Company', 'Company Letter'] },
    transit: { type: 'Qatar Transit Visa', message: 'Qatar offers free transit visas for Doha layovers (select nationalities).', time: 'Airport – Immediate', documents: ['Passport', 'Onward Confirmed Ticket'] },
  },
  oman: {
    work:    { type: 'Oman Employment Visa', message: 'Employment visas are sponsored by Omani employers via ORION system.', time: '10–20 working days', documents: ['Passport', 'GAMCA Medical Fitness Report', 'Police Clearance Certificate', 'Attested Educational Certificates'] },
    tourist: { type: 'Oman Tourist eVisa', message: "Indian nationals can apply for Oman's e-Visa online — simple process!", time: '3–5 working days', documents: ['Passport', 'Travel Insurance', 'Hotel Booking', 'Return Ticket'] },
    business:{ type: 'Oman Business Visa', message: 'Valid for commercial visits and meetings in Oman.', time: '5–7 working days', documents: ['Passport', 'Business Invitation Letter', 'Company Documents'] },
    transit: { type: 'Oman Transit', message: 'Short layovers may not require a visa — check with your airline.', time: 'N/A', documents: ['Passport', 'Onward Confirmed Ticket'] },
  },
  bahrain: {
    work:    { type: 'Bahrain Work Visa', message: 'Work visas processed through LMRA (Labour Market Regulatory Authority).', time: '7–14 working days', documents: ['Passport', 'Employment Contract', 'Medical Fitness Report', 'Police Clearance Certificate'] },
    tourist: { type: 'Bahrain Tourist eVisa', message: 'Bahrain offers e-Visa for Indian passport holders — quick online process!', time: '2–4 working days', documents: ['Passport', 'Photograph', 'Hotel Booking', 'Return Ticket'] },
    business:{ type: 'Bahrain Business Visa', message: 'Required for business activities, meetings, and conferences.', time: '3–5 working days', documents: ['Passport', 'Business Letter', 'Bank Statement'] },
    transit: { type: 'Bahrain Transit', message: 'Transit through Bahrain International Airport may not require a visa.', time: 'Airport – Immediate', documents: ['Passport', 'Onward Confirmed Ticket'] },
  },
};

export function VisaChecker() {
  const [nationality, setNationality] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose]         = useState('');
  const [result, setResult]           = useState<VisaResult | null>(null);
  const [isChecking, setIsChecking]   = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationality || !destination || !purpose) return;
    setIsChecking(true);
    setResult(null);
    setTimeout(() => {
      setIsChecking(false);
      const found = VISA_MATRIX[destination]?.[purpose];
      setResult(found ?? {
        type: 'Visa Required — Contact Us',
        message: 'Please contact our consultants for exact requirements for this combination.',
        documents: ['Passport (6+ months validity)', 'Photographs', 'Bank Statements', 'Other documents as advised'],
        time: 'Contact us for estimate',
      });
    }, 1000);
  };

  return (
    <section className="py-20 pt-28 lg:pt-36 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-secondary via-primary to-primary" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-3 block">Instant Check</span>
            <h2 className="text-4xl md:text-5xl mb-6 font-serif text-white">Check Visa Eligibility</h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto font-light">
              Get specific document requirements in seconds — before planning your journey.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl"
          >
            <form onSubmit={handleCheck} className="grid md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100">I am a citizen of</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <select value={nationality} onChange={e => setNationality(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary appearance-none" required>
                    <option value="" className="text-black">Select Country</option>
                    <option value="in" className="text-black">India</option>
                    <option value="np" className="text-black">Nepal</option>
                    <option value="bd" className="text-black">Bangladesh</option>
                    <option value="lk" className="text-black">Sri Lanka</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100">Traveling to</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <select value={destination} onChange={e => setDestination(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary appearance-none" required>
                    <option value="" className="text-black">Select Destination</option>
                    <option value="saudi"  className="text-black">Saudi Arabia</option>
                    <option value="uae"    className="text-black">UAE</option>
                    <option value="kuwait" className="text-black">Kuwait</option>
                    <option value="qatar"  className="text-black">Qatar</option>
                    <option value="oman"   className="text-black">Oman</option>
                    <option value="bahrain"className="text-black">Bahrain</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100">Purpose</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <select value={purpose} onChange={e => setPurpose(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary appearance-none" required>
                    <option value="" className="text-black">Select Purpose</option>
                    <option value="work"    className="text-black">Work / Employment</option>
                    <option value="tourist" className="text-black">Tourist / Visit</option>
                    <option value="business"className="text-black">Business</option>
                    <option value="transit" className="text-black">Transit</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={isChecking}
                className="bg-secondary text-primary font-bold rounded-xl py-3 px-6 hover:bg-[#E6D08B] transition-colors flex items-center justify-center gap-2 h-[50px] shadow-[0_0_15px_rgba(201,168,76,0.3)] disabled:opacity-70">
                {isChecking ? <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> : <><Search className="w-5 h-5" /> Check Now</>}
              </button>
            </form>

            <AnimatePresence>
              {result && !isChecking && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 rounded-xl border border-green-500/30 bg-green-500/10">
                    <div className="flex items-start gap-4 mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xl font-bold text-green-400 mb-1">{result.type}</h4>
                        <p className="text-blue-100/90">{result.message}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-3">
                          <FileText className="w-4 h-4" /> Documents Required
                        </div>
                        <ul className="space-y-1.5">
                          {result.documents.map((doc, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-blue-100/80">
                              <ArrowRight className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" /> {doc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-1">
                            <Clock className="w-4 h-4" /> Estimated Time
                          </div>
                          <p className="text-white font-semibold">{result.time}</p>
                        </div>
                        <a href="#contact"
                           className="flex items-center justify-center gap-2 bg-secondary text-primary font-bold px-4 py-3 rounded-xl hover:bg-[#E6D08B] transition-all text-sm">
                          Apply Now — Get Expert Help
                        </a>
                        <a href="https://wa.me/919873005319" target="_blank" rel="noopener noreferrer"
                           className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-3 rounded-xl border border-white/20 transition-colors">
                          Ask on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
