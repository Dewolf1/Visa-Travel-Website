import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, ArrowRight } from 'lucide-react';
import { CountryDetailsModal } from './CountryDetailsModal';

const countries = [
  { name: 'Kuwait',       flag: '🇰🇼', popular: true,  desc: 'Work & Visit Visas',    visaTypes: ['Work Visa', 'Visit Visa', 'Tourist Visa', 'Business Visa'] },
  { name: 'Saudi Arabia', flag: '🇸🇦', popular: true,  desc: 'Multiple Entry Visas',   visaTypes: ['Work Visa', 'Multiple Entry', 'Business Visa', 'Umrah Visa'] },
  { name: 'UAE',          flag: '🇦🇪', popular: true,  desc: 'Tourist & Transit',       visaTypes: ['Tourist Visa', 'Transit Visa', 'Work Visa', 'Business Visa'] },
  { name: 'Qatar',        flag: '🇶🇦', popular: false, desc: 'Business Visas',          visaTypes: ['Business Visa', 'Work Visa', 'Visit Visa', 'Tourist Visa'] },
  { name: 'Bahrain',      flag: '🇧🇭', popular: false, desc: 'Work Permits',            visaTypes: ['Work Permit', 'Visit Visa', 'Business Visa', 'Tourist Visa'] },
  { name: 'Oman',         flag: '🇴🇲', popular: false, desc: 'Employment Visas',        visaTypes: ['Employment Visa', 'Visit Visa', 'Tourist Visa', 'Business Visa'] },
  { name: 'Russia',       flag: '🇷🇺', popular: false, desc: 'Tourist & Work Visas',    visaTypes: ['Tourist Visa', 'Work Visa', 'Business Visa', 'Student Visa'] },
];

export type Country = typeof countries[0];

export function Countries() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const openModal = useCallback((country: Country) => setSelectedCountry(country), []);
  const closeModal = useCallback(() => setSelectedCountry(null), []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCountry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCountry]);

  return (
    <>
      <section id="countries" className="py-24 bg-primary relative overflow-hidden">
        {/* Radial glow centre */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,168,76,0.15),transparent)] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C9A84C]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-5">
                <Globe2 className="w-4 h-4" /> Global Reach
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl mb-5 font-serif text-white leading-tight">
                Countries We <span className="text-gradient-gold">Serve</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
              <p className="text-lg text-blue-100/75 max-w-2xl mx-auto font-light">
                Expert visa processing for GCC, Middle East & beyond — click any country to apply instantly.
              </p>
            </motion.div>
          </div>

          {/* Country grid — single responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 max-w-6xl mx-auto">
            {countries.map((country, idx) => (
              <CountryCard
                key={idx}
                country={country}
                idx={idx}
                onClick={() => openModal(country)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md px-8 py-6 rounded-2xl">
              <p className="text-blue-100/80 text-lg">
                Need a visa for another country? We cover <span className="text-secondary font-bold">50+ destinations</span> worldwide.
              </p>
              <a
                href="#contact"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-secondary text-primary font-bold px-6 py-3 rounded-xl hover:bg-[#E6D08B] hover:-translate-y-0.5 transition-all shadow-[0_0_16px_rgba(201,168,76,0.3)] whitespace-nowrap"
              >
                Check Requirements <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal — rendered via portal at body level */}
      <AnimatePresence>
        {selectedCountry && (
          <CountryDetailsModal country={selectedCountry} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}

function CountryCard({ country, idx, onClick }: { country: Country; idx: number; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.07 }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/12 hover:border-secondary/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center text-center w-full"
    >
      {country.popular && (
        <span className="absolute top-2.5 right-2.5 bg-secondary text-primary text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
          Popular
        </span>
      )}

      {/* Shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Glow ring on hover */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-secondary/30 transition-all duration-300 pointer-events-none" />

      <div className="text-5xl mb-3 group-hover:scale-115 transition-transform duration-300 filter drop-shadow-md">
        {country.flag}
      </div>
      <h3 className="text-sm font-bold text-white font-serif mb-1 leading-tight">{country.name}</h3>
      <p className="text-[11px] text-blue-300/70 font-medium mb-3">{country.desc}</p>

      {/* Apply pill — always visible so mobile users know it's tappable */}
      <div className="flex items-center gap-1 bg-secondary/20 border border-secondary/30 text-secondary text-[10px] font-bold px-3 py-1 rounded-full group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
        Apply Now <ArrowRight className="w-2.5 h-2.5" />
      </div>
    </motion.button>
  );
}
