import { FileSearch, ClipboardCheck, SendHorizontal, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    icon: FileSearch,
    step: '01',
    title: 'Free Consultation',
    description:
      'Book a free consultation. Our experts evaluate your profile and recommend the best visa pathway suited to your needs and timeline.',
    detail: 'Usually takes 15–30 minutes',
  },
  {
    icon: ClipboardCheck,
    step: '02',
    title: 'Document Preparation',
    description:
      'We provide a precise checklist and verify every document. Our team guides you through attestation, translations, and legalization requirements.',
    detail: '2–5 business days',
  },
  {
    icon: SendHorizontal,
    step: '03',
    title: 'Application & Follow-up',
    description:
      'We file your complete application to the embassy or authority and actively follow up at every stage, keeping you updated in real time.',
    detail: 'Varies by destination',
  },
  {
    icon: BadgeCheck,
    step: '04',
    title: 'Visa Delivered',
    description:
      'Receive your stamped visa and travel documents. We brief you on arrival procedures and remain on call for any last-minute questions.',
    detail: 'Ready to fly!',
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative line across center */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent pointer-events-none hidden lg:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
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
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Connector line (desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-border z-0" />
              )}

              {/* Icon circle */}
              <div className="relative z-10 w-20 h-20 rounded-full border-2 border-secondary/20 bg-accent flex items-center justify-center mb-6 group-hover:border-secondary group-hover:bg-secondary/10 transition-all duration-500 shadow-lg">
                <step.icon className="w-8 h-8 text-secondary" />
                {/* Step badge */}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-primary text-xs font-black flex items-center justify-center shadow-md">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.description}</p>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
                ⏱ {step.detail}
              </span>
            </motion.div>
          ))}
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
            <a
              href="https://wa.me/919873005319"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-[#1ebe5d] hover:-translate-y-0.5 transition-all"
            >
              WhatsApp Us
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 bg-secondary text-primary font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-[#E6D08B] hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
