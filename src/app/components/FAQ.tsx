import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: 'What documents are required for Saudi Work Visa stamping?',
    answer:
      'You generally need: original passport (valid ≥ 6 months), GAMCA medical fitness report, police clearance certificate (PCC), attested degree/diploma certificates, passport-size photographs, and the visa block number from your employer in Saudi Arabia.',
  },
  {
    question: 'How long does the GAMCA medical process take?',
    answer:
      'Medical appointments are usually available within 1–2 days. The tests take 2–3 hours and the final fitness report is typically available within 2–4 working days, depending on the center.',
  },
  {
    question: 'Do you provide attestation for all Gulf countries?',
    answer:
      'Yes. We handle full attestation (MEA, HRD, Embassy) for Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman — covering educational, personal, and commercial documents.',
  },
  {
    question: 'What is the processing time for a Kuwait Visa?',
    answer:
      'Normal processing takes 3–5 working days after all documents are submitted and the medical examination is cleared. Express processing may be available depending on the category.',
  },
  {
    question: 'Can I get a refund if my visa is rejected?',
    answer:
      'Visa approval is solely at the discretion of the respective embassy. Service charges are non-refundable once the application has been filed. However, our meticulous documentation process significantly minimises rejection risk.',
  },
  {
    question: 'Do you offer doorstep document pickup?',
    answer:
      'Yes! For clients in Delhi NCR, we offer convenient document pickup and delivery. Contact us via WhatsApp or phone to arrange a pickup at no extra charge for select services.',
  },
];

export function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-5">
                Got Questions?
              </span>
              <h2 className="text-4xl md:text-5xl mb-5 text-primary font-serif">
                Frequently <span className="text-gradient-gold">Asked</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
              <p className="text-muted-foreground font-light text-lg">
                Everything you need to know before your application.
              </p>
            </motion.div>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = active === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-secondary shadow-[0_4px_20px_-4px_rgba(201,168,76,0.2)]'
                      : 'border-border hover:border-secondary/40'
                  } bg-white overflow-hidden`}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-start gap-4 focus:outline-none"
                    onClick={() => setActive(isOpen ? null : idx)}
                  >
                    <HelpCircle
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                        isOpen ? 'text-secondary' : 'text-muted-foreground/50'
                      }`}
                    />
                    <span
                      className={`flex-1 font-semibold text-base leading-snug transition-colors duration-200 ${
                        isOpen ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-secondary mt-0.5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pl-[3.75rem] text-muted-foreground text-[15px] leading-relaxed border-t border-border/30 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom nudge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center bg-accent rounded-2xl p-8 border border-border/40"
          >
            <p className="text-primary font-semibold text-lg mb-1">Still have questions?</p>
            <p className="text-muted-foreground mb-5">Our experts are just a message away.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919873005319"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1ebe5d] transition-all"
              >
                Chat on WhatsApp
              </a>
              <a
                href="tel:+919873005319"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-secondary hover:text-primary transition-all"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
