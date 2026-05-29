import { FileCheck, Stethoscope, Stamp, Plane, FileText, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

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
    icon: FileText,
    title: 'PCC Services',
    description: 'Police Clearance Certificate services for work visa applications with fast processing across all states.',
    features: ['Quick Processing', 'All States', 'Express Service', 'Door Pickup'],
    color: 'from-amber-600 to-amber-800',
    lightColor: 'bg-amber-50',
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

export function Services() {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-5">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-5 text-primary font-serif leading-tight">
              Premium <span className="text-gradient-gold">Services</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Comprehensive visa and travel documentation solutions, expertly handled from start to finish.
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative bg-white rounded-2xl border border-border/50 hover:border-secondary/30 transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(10,22,40,0.12)] hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              {/* Top gradient accent */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${service.color}`} />

              <div className="p-8 flex flex-col flex-1">
                {/* Icon */}
                <div className={`w-14 h-14 ${service.lightColor} rounded-2xl flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-2xl mb-3 text-primary font-serif font-bold group-hover:text-secondary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm flex-1">
                  {service.description}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold bg-accent text-primary/70 px-3 py-1 rounded-full border border-border/40"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors"
                >
                  Enquire Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </a>
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
          className="mt-16 text-center"
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
  );
}
