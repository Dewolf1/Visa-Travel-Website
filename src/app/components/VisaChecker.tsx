import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Briefcase, CheckCircle, XCircle } from 'lucide-react';

export function VisaChecker() {
  const [nationality, setNationality] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [result, setResult] = useState<null | { eligible: boolean; message: string; type: string }>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationality || !destination || !purpose) return;

    setIsChecking(true);
    
    // Simulate check
    setTimeout(() => {
      setIsChecking(false);
      // Dummy logic for demonstration
      if (destination === 'saudi' && purpose === 'work') {
        setResult({
          eligible: true,
          type: 'Work Visa Required',
          message: 'You are eligible to apply. Requires GAMCA medical, attested degree, and PCC.'
        });
      } else if (destination === 'uae' && purpose === 'tourist') {
        setResult({
          eligible: true,
          type: 'E-Visa Available',
          message: 'Tourist visa can be processed completely online within 48-72 hours.'
        });
      } else {
        setResult({
          eligible: true,
          type: 'Standard Visa Required',
          message: 'Please contact our consultants for exact document requirements.'
        });
      }
    }, 1200);
  };

  return (
    <section className="py-20 pt-28 lg:pt-36 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-secondary via-primary to-primary"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-3 block">Instant Check</span>
            <h2 className="text-4xl md:text-5xl mb-6 font-serif text-white">Check Visa Eligibility</h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto font-light">
              Find out your visa requirements in seconds before planning your journey.
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
                  <select 
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary appearance-none"
                    required
                  >
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
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary appearance-none"
                    required
                  >
                    <option value="" className="text-black">Select Destination</option>
                    <option value="saudi" className="text-black">Saudi Arabia</option>
                    <option value="uae" className="text-black">UAE</option>
                    <option value="kuwait" className="text-black">Kuwait</option>
                    <option value="qatar" className="text-black">Qatar</option>
                    <option value="oman" className="text-black">Oman</option>
                    <option value="bahrain" className="text-black">Bahrain</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100">Purpose</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <select 
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-secondary appearance-none"
                    required
                  >
                    <option value="" className="text-black">Select Purpose</option>
                    <option value="work" className="text-black">Work / Employment</option>
                    <option value="tourist" className="text-black">Tourist / Visit</option>
                    <option value="business" className="text-black">Business</option>
                    <option value="transit" className="text-black">Transit</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isChecking}
                className="bg-secondary text-primary font-bold rounded-xl py-3 px-6 hover:bg-[#E6D08B] transition-colors flex items-center justify-center gap-2 h-[50px] shadow-[0_0_15px_rgba(201,168,76,0.3)] disabled:opacity-70"
              >
                {isChecking ? (
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Check Now
                  </>
                )}
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
                  <div className={`p-6 rounded-xl border ${result.eligible ? 'bg-green-500/10 border-green-500/30 text-green-100' : 'bg-red-500/10 border-red-500/30 text-red-100'} flex items-start gap-4`}>
                    {result.eligible ? (
                      <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className={`text-xl font-bold mb-1 ${result.eligible ? 'text-green-400' : 'text-red-400'}`}>
                        {result.type}
                      </h4>
                      <p className="opacity-90">{result.message}</p>
                      
                      <div className="mt-4">
                        <a href="#contact" className="inline-block bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/20">
                          Consult with an Expert
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
