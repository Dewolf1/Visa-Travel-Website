import { FileCheck, Stethoscope, Stamp, Plane, Users, ArrowRight, X, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { submitForm } from '../utils/formSubmit';

const services = [
  {
    icon: Stamp,
    title: 'Visa Stamping',
    description: 'Fast and reliable visa stamping services for all Gulf countries including Kuwait, Saudi Arabia, UAE, and more.',
    features: ['Work Visa', 'Tourist Visa', 'Business Visa', 'Visit Visa'],
    color: 'from-blue-600 to-blue-800',
    lightColor: 'bg-blue-50',
  },
  {
    icon: Stethoscope,
    title: 'GAMCA Medical',
    description: 'Complete GAMCA medical assistance with 100% fit guarantee. Expert guidance for medical fitness certification.',
    features: ['Medical Booking', 'Fit Guarantee', 'Expert Tips', 'Follow-up Support'],
    color: 'from-emerald-600 to-emerald-800',
    lightColor: 'bg-emerald-50',
  },
  {
    icon: FileCheck,
    title: 'Document Attestation',
    description: 'Complete attestation services for all types of documents including educational, personal, and commercial certificates.',
    features: ['MEA Attestation', 'Embassy Attestation', 'HRD Attestation', 'Notary Services'],
    color: 'from-purple-600 to-purple-800',
    lightColor: 'bg-purple-50',
  },
  {
    icon: Plane,
    title: 'Flight Booking',
    description: 'Competitive rates for international flight bookings with flexible options and the best fares guaranteed.',
    features: ['Best Prices', 'Flexible Dates', 'Group Bookings', '24/7 Support'],
    color: 'from-sky-600 to-sky-800',
    lightColor: 'bg-sky-50',
  },
  {
    icon: Users,
    title: 'Recruitment',
    description: 'Overseas job placement services for various positions in Gulf countries with verified, trusted employers.',
    features: ['House Cook', 'House Driver', 'Labor', 'Skilled Workers'],
    color: 'from-rose-600 to-rose-800',
    lightColor: 'bg-rose-50',
  },
];

type Service = typeof services[0];

/* ─── Enquiry Modal ─── */
function EnquiryModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { waLink, emailSent } = await submitForm({
      subject: `Service Enquiry — ${service.title}`,
      name: form.name,
      phone: form.phone,
      email: form.email,
      service: service.title,
      message: form.message,
    });
    setWaLink(waLink);
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success(
      emailSent ? `Enquiry sent for ${service.title}!` : 'Enquiry received!',
      { description: 'Our team will reach out within 24 hours.', duration: 5000 }
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        className="relative bg-white rounded-3xl shadow-[0_32px_80px_-10px_rgba(10,22,40,0.35)] w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${service.color} px-6 md:px-7 pt-6 md:pt-7 pb-7 md:pb-8 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-white/30" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:rotate-90 duration-300 z-10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="relative z-10 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl ${service.lightColor} flex items-center justify-center flex-shrink-0`}>
              <service.icon className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-0.5">Enquiry</p>
              <h3 className="text-lg md:text-xl font-serif text-white font-bold leading-tight">{service.title}</h3>
            </div>
          </div>
        </div>

        {submitted ? (
          /* ── Success ── */
          <div className="px-6 md:px-7 py-8 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-xl font-serif font-bold text-primary">Enquiry Received!</h4>
            <p className="text-muted-foreground text-sm max-w-xs">
              Our team will contact you within 24 hours regarding {service.title}.
              For the fastest response, use WhatsApp.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1ebe5d] transition-all shadow-lg w-full justify-center text-sm"
            >
              <MessageCircle className="w-4 h-4" /> Send via WhatsApp
            </a>
            <button onClick={onClose} className="text-sm text-muted-foreground underline hover:text-primary">
              Close
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="px-6 md:px-7 py-5 md:py-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#0A1628]/70 mb-1 uppercase tracking-wide">Full Name *</label>
                <input
                  name="name" type="text" required value={form.name} onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F4EEDF]/50 border border-[rgba(10,22,40,0.1)] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#0A1628]/70 mb-1 uppercase tracking-wide">Phone *</label>
                <input
                  name="phone" type="tel" required value={form.phone} onChange={handleChange}
                  placeholder="+91 XXXXX"
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F4EEDF]/50 border border-[rgba(10,22,40,0.1)] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#0A1628]/70 mb-1 uppercase tracking-wide">Email</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3.5 py-3 rounded-xl bg-[#F4EEDF]/50 border border-[rgba(10,22,40,0.1)] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#0A1628]/70 mb-1 uppercase tracking-wide">Message</label>
              <textarea
                name="message" rows={3} value={form.message} onChange={handleChange}
                placeholder="Tell us about your requirements..."
                className="w-full px-3.5 py-3 rounded-xl bg-[#F4EEDF]/50 border border-[rgba(10,22,40,0.1)] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0A1628] text-white font-bold py-3.5 rounded-xl hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_6px_20px_-4px_rgba(10,22,40,0.35)] hover:shadow-[0_6px_20px_-4px_rgba(201,168,76,0.35)] disabled:opacity-70 group text-sm"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Send Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}

/* ─── Services Section ─── */
export function Services() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <>
      <section id="services" className="py-16 md:py-24 bg-background relative overflow-hidden">
        {/* Subtle dot grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Heading */}
          <div className="text-center mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-5">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl mb-5 text-primary font-serif leading-tight">
                Premium <span className="text-gradient-gold">Services</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Comprehensive visa and travel documentation solutions, expertly handled from start to finish.
              </p>
            </motion.div>
          </div>

          {/* Cards — 5 services: 2+3 layout on desktop, 1-col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setActiveService(service)}
                className="group relative bg-white rounded-2xl border border-border/50 hover:border-secondary/30 transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(10,22,40,0.12)] hover:-translate-y-2 overflow-hidden flex flex-col cursor-pointer select-none"
              >
                {/* Always-visible top-right enquire badge */}
                <span className="absolute top-3 right-3 z-10 bg-secondary/10 text-secondary text-[10px] font-bold px-2.5 py-1 rounded-full border border-secondary/20 group-hover:bg-secondary group-hover:text-primary transition-all duration-200">
                  Enquire →
                </span>
                {/* Top gradient accent */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${service.color}`} />

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 ${service.lightColor} rounded-2xl flex items-center justify-center mb-5 md:mb-7 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                    <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>

                  <h3 className="text-xl md:text-2xl mb-2 md:mb-3 text-primary font-serif font-bold group-hover:text-secondary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-5 md:mb-6 leading-relaxed text-sm flex-1">
                    {service.description}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2 mb-5 md:mb-7">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold bg-accent text-primary/70 px-3 py-1 rounded-full border border-border/40"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                    Enquire Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </div>

                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 md:mt-16 text-center"
          >
            <p className="text-muted-foreground mb-5">
              Can't find what you're looking for? We offer customized solutions too.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-secondary hover:text-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Talk to an Expert <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {activeService && (
          <EnquiryModal service={activeService} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
