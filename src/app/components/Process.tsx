import { FileSearch, ClipboardCheck, SendHorizontal, BadgeCheck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const steps = [
  {
    icon: FileSearch,
    step: '01',
    title: 'Free Consultation',
    description: 'Our experts evaluate your profile and recommend the best visa pathway suited to your needs and timeline.',
    detail: '15–30 minutes',
    checklist: [
      'Profile & travel history evaluation',
      'Visa type recommendation',
      'Full document checklist provided',
      'Cost & timeline estimate',
    ],
  },
  {
    icon: ClipboardCheck,
    step: '02',
    title: 'Document Preparation',
    description: 'We verify every document and guide you through attestation, translations, and legalization.',
    detail: '2–5 business days',
    checklist: [
      'Document checklist verification',
      'MEA / HRD / Embassy attestation',
      'Translation services if needed',
      'GAMCA medical scheduling',
    ],
  },
  {
    icon: SendHorizontal,
    step: '03',
    title: 'Application & Follow-up',
    description: 'We file your complete application and actively follow up at every stage with real-time updates.',
    detail: 'Varies by destination',
    checklist: [
      'Embassy submission',
      'Active status tracking',
      'Real-time SMS/WhatsApp updates',
      'Any additional document handling',
    ],
  },
  {
    icon: BadgeCheck,
    step: '04',
    title: 'Visa Delivered',
    description: 'Receive your stamped visa. We brief you on arrival procedures and remain on call for last-minute questions.',
    detail: 'Ready to fly!',
    checklist: [
      'Visa stamp verification',
      'Arrival procedure briefing',
      'On-call support until departure',
      'Post-visa documentation help',
    ],
  },
];

export function Process() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent pointer-events-none hidden lg:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-5">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-5 text-primary font-serif leading-tight">
              Your Journey, <span className="text-gradient-gold">4 Steps</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              We've streamlined the entire visa process so you never have to worry about complexity.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const isOpen = expanded === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-border z-0" />
                )}

                {/* Icon circle */}
                <button
                  onClick={() => setExpanded(isOpen ? null : idx)}
                  className="relative z-10 w-20 h-20 rounded-full border-2 border-secondary/20 bg-accent flex items-center justify-center mb-6 group-hover:border-secondary group-hover:bg-secondary/10 transition-all duration-500 shadow-lg focus:outline-none"
                  aria-label={`${isOpen ? 'Collapse' : 'Expand'} step ${step.step}`}
                >
                  <step.icon className="w-8 h-8 text-secondary" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-primary text-xs font-black flex items-center justify-center shadow-md">
                    {step.step}
                  </span>
                </button>

                <h3 className="text-xl font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{step.description}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full mb-3">
                  ⏱ {step.detail}
                </span>

                {/* Click-to-expand checklist */}
                <button
                  onClick={() => setExpanded(isOpen ? null : idx)}
                  className="flex items-center gap-1 text-xs text-secondary font-semibold hover:underline"
                >
                  {isOpen ? 'Hide details' : 'View checklist'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-3 text-left w-full bg-accent rounded-xl px-4 py-3 space-y-1.5"
                    >
                      {step.checklist.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-primary/80">
                          <span className="text-secondary mt-0.5">✓</span> {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 bg-gradient-to-r from-primary to-[#1E2D44] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl max-w-4xl mx-auto"
        >
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-serif mb-2 text-white">Ready to start your journey?</h3>
            <p className="text-blue-200/80 font-light">Our team is available Mon–Sat, 10AM to 7PM.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="https://wa.me/919873005319" target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-[#1ebe5d] hover:-translate-y-0.5 transition-all">
              WhatsApp Us
            </a>
            <a href="#contact"
               className="flex items-center justify-center gap-2 bg-secondary text-primary font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-[#E6D08B] hover:-translate-y-0.5 transition-all">
              Get Started
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
