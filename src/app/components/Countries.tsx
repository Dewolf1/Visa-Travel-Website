import { motion } from 'motion/react';
import { Globe2, ArrowRight } from 'lucide-react';

const countries = [
  { name: 'Kuwait',       flag: '🇰🇼', popular: true,  desc: 'Work & Visit Visas' },
  { name: 'Saudi Arabia', flag: '🇸🇦', popular: true,  desc: 'Multiple Entry Visas' },
  { name: 'UAE',          flag: '🇦🇪', popular: true,  desc: 'Tourist & Transit' },
  { name: 'Qatar',        flag: '🇶🇦', popular: false, desc: 'Business Visas' },
  { name: 'Bahrain',      flag: '🇧🇭', popular: false, desc: 'Work Permits' },
  { name: 'Oman',         flag: '🇴🇲', popular: false, desc: 'Employment Visas' },
  { name: 'Jordan',       flag: '🇯🇴', popular: false, desc: 'Tourist Visas' },
  { name: 'Iraq',         flag: '🇮🇶', popular: false, desc: 'Business Visas' },
  { name: 'Lebanon',      flag: '🇱🇧', popular: false, desc: 'Visit Visas' },
];

export function Countries() {
  return (
    <section id="countries" className="py-24 bg-primary relative overflow-hidden">
      {/* Radial glow centre */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,168,76,0.15),transparent)] pointer-events-none" />

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
              Expert visa processing for all GCC and Middle Eastern countries — fast, genuine, guaranteed.
            </p>
          </motion.div>
        </div>

        {/* Country grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-6">
          {countries.slice(0, 5).map((country, idx) => (
            <CountryCard key={idx} country={country} idx={idx} />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {countries.slice(5).map((country, idx) => (
            <CountryCard key={idx + 5} country={country} idx={idx + 5} />
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
  );
}

function CountryCard({ country, idx }: { country: typeof countries[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.06 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden flex flex-col items-center text-center"
    >
      {country.popular && (
        <span className="absolute top-3 right-3 bg-secondary text-primary text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
          Popular
        </span>
      )}

      {/* Shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-400 filter drop-shadow-md">
        {country.flag}
      </div>
      <h3 className="text-base font-bold text-white font-serif mb-1">{country.name}</h3>
      <p className="text-xs text-blue-300/70 font-medium">{country.desc}</p>
    </motion.div>
  );
}
