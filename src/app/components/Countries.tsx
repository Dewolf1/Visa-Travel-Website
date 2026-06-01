import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, ArrowRight, X, Send, ChevronDown, CheckCircle2, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { submitForm } from '../utils/formSubmit';

const countries = [
  { name: 'Kuwait',       flag: '🇰🇼', popular: true,  desc: 'Work & Visit Visas',    visaTypes: ['Work Visa', 'Visit Visa', 'Tourist Visa', 'Business Visa'] },
  { name: 'Saudi Arabia', flag: '🇸🇦', popular: true,  desc: 'Multiple Entry Visas',   visaTypes: ['Work Visa', 'Multiple Entry', 'Business Visa', 'Umrah Visa'] },
  { name: 'UAE',          flag: '🇦🇪', popular: true,  desc: 'Tourist & Transit',       visaTypes: ['Tourist Visa', 'Transit Visa', 'Work Visa', 'Business Visa'] },
  { name: 'Qatar',        flag: '🇶🇦', popular: false, desc: 'Business Visas',          visaTypes: ['Business Visa', 'Work Visa', 'Visit Visa', 'Tourist Visa'] },
  { name: 'Bahrain',      flag: '🇧🇭', popular: false, desc: 'Work Permits',            visaTypes: ['Work Permit', 'Visit Visa', 'Business Visa', 'Tourist Visa'] },
  { name: 'Oman',         flag: '🇴🇲', popular: false, desc: 'Employment Visas',        visaTypes: ['Employment Visa', 'Visit Visa', 'Tourist Visa', 'Business Visa'] },
  { name: 'Russia',       flag: '🇷🇺', popular: false, desc: 'Tourist & Work Visas',    visaTypes: ['Tourist Visa', 'Work Visa', 'Business Visa', 'Student Visa'] },
];

type Country = typeof countries[0];

interface VisaModalProps {
  country: Country;
  onClose: () => void;
}

function VisaModal({ country, onClose }: VisaModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visaType: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { waLink, emailSent } = await submitForm({
      subject: `Visa Application — ${country.name}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      country: country.name,
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 32 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative bg-white rounded-3xl shadow-[0_32px_80px_-10px_rgba(10,22,40,0.35)] w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0A1628] via-[#0f1e35] to-[#1E2D44] px-6 md:px-8 pt-6 md:pt-8 pb-8 md:pb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,168,76,0.18),transparent)]" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:rotate-90 duration-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="relative z-10 flex items-center gap-4">
            <span className="text-5xl drop-shadow-lg">{country.flag}</span>
            <div>
              <p className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-1">Visa Application</p>
              <h3 className="text-xl md:text-2xl font-serif text-white font-bold">{country.name}</h3>
              <p className="text-blue-200/70 text-xs md:text-sm mt-0.5">{country.desc}</p>
            </div>
          </div>
        </div>

        {submitted ? (
          /* ── Success state ── */
          <div className="px-6 md:px-8 py-8 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-xl font-serif font-bold text-primary">Application Received!</h4>
            <p className="text-muted-foreground text-sm max-w-xs">
              We'll review your {country.name} visa application and contact you within 24 hours.
              For the fastest response, send it on WhatsApp too.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1ebe5d] transition-all shadow-lg w-full justify-center"
            >
              <MessageCircle className="w-4 h-4" /> Send via WhatsApp
            </a>
            <button onClick={onClose} className="text-sm text-muted-foreground underline hover:text-primary">
              Close
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="px-6 md:px-8 py-5 md:py-7 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-[#0A1628] mb-1.5 uppercase tracking-wide">Full Name *</label>
                <input name="name" type="text" required value={formData.name} onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F4EEDF]/60 border border-[rgba(10,22,40,0.1)] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#0A1628] mb-1.5 uppercase tracking-wide">Phone *</label>
                <input name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                  placeholder="+91 XXXXX"
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F4EEDF]/60 border border-[rgba(10,22,40,0.1)] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-[#0A1628] mb-1.5 uppercase tracking-wide">Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3.5 py-3 rounded-xl bg-[#F4EEDF]/60 border border-[rgba(10,22,40,0.1)] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all text-sm" />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-semibold text-[#0A1628] mb-1.5 uppercase tracking-wide">Visa Type *</label>
              <select name="visaType" required value={formData.visaType} onChange={handleChange}
                className="w-full px-3.5 py-3 rounded-xl bg-[#F4EEDF]/60 border border-[rgba(10,22,40,0.1)] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all text-sm appearance-none">
                <option value="">Select visa type</option>
                {country.visaTypes.map(vt => <option key={vt} value={vt}>{vt}</option>)}
              </select>
              <ChevronDown className="absolute right-4 bottom-3.5 w-4 h-4 text-[#64748B] pointer-events-none" />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-[#0A1628] mb-1.5 uppercase tracking-wide">Message</label>
              <textarea name="message" rows={3} value={formData.message} onChange={handleChange}
                placeholder="Tell us more about your requirements..."
                className="w-full px-3.5 py-3 rounded-xl bg-[#F4EEDF]/60 border border-[rgba(10,22,40,0.1)] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 focus:border-[#C9A84C] transition-all text-sm resize-none" />
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full bg-[#0A1628] text-white font-bold py-3.5 rounded-xl hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_24px_-6px_rgba(10,22,40,0.4)] hover:shadow-[0_8px_24px_-6px_rgba(201,168,76,0.4)] disabled:opacity-70 group text-sm"
            >
              {isSubmitting
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /> Submit Application</>}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}

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
          <VisaModal country={selectedCountry} onClose={closeModal} />
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
