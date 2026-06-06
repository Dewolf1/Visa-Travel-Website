import { CheckCircle, ThumbsUp, Headphones, TrendingUp, MapPin, Clock } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  return count;
}

const stats = [
  { icon: CheckCircle, value: 100, suffix: '%',  label: 'Genuine Services', desc: 'Zero fake documentation' },
  { icon: ThumbsUp,   value: 95,  suffix: '%+', label: 'Success Rate',     desc: 'Across all applications' },
  { icon: Headphones, value: 24,  suffix: '/7', label: 'Client Support',   desc: 'Always here for you' },
  { icon: TrendingUp, value: 34,  suffix: 'K+', label: 'Happy Clients',    desc: 'And growing every day' },
];

/** Extracted so useCounter is called at component level — fixes Rules of Hooks violation */
function StatCard({ s, idx, inView }: { s: typeof stats[0]; idx: number; inView: boolean }) {
  const count = useCounter(s.value, 2500, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="bg-white rounded-2xl border border-border hover:border-secondary/30 transition-all duration-300 hover:shadow-xl group p-8 flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:scale-110 transition-all duration-500">
        <s.icon className="w-8 h-8 text-secondary group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="text-5xl font-serif font-black text-gradient-gold mb-1">
        {count}{s.suffix}
      </div>
      <div className="text-sm font-bold text-primary uppercase tracking-wide mb-2">{s.label}</div>
      <div className="text-sm text-muted-foreground">{s.desc}</div>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-5">
              Our Excellence
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-5 text-primary font-serif leading-tight">
              Why Choose <span className="text-gradient-gold">VisaOVisa?</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Experience the gold standard in visa processing — trusted by thousands across India.
            </p>
          </motion.div>
        </div>

        {/* Stats grid — uses StatCard so hook is at component level */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          {stats.map((s, idx) => (
            <StatCard key={idx} s={s} idx={idx} inView={inView} />
          ))}
        </div>

        {/* Office card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#0f1e35] to-[#1E2D44]" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
          <div className="relative p-10 md:p-14 grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3 text-white">
              <h3 className="text-3xl md:text-4xl font-serif mb-5 drop-shadow text-white">Visit Our Premium Office</h3>
              <p className="text-blue-100/80 text-lg mb-8 font-light leading-relaxed">
                Experience our luxury consultation in person. Our counsellors are ready to craft your perfect travel strategy.
              </p>
              <div className="space-y-4">

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0 border border-secondary/30">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Monday to Saturday</p>
                    <p className="text-blue-200/60 text-sm">10:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-3">
              <a href="#contact" className="w-full text-center bg-secondary text-primary font-bold px-8 py-4 rounded-xl hover:bg-[#E6D08B] transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:-translate-y-0.5">
                Book a Consultation
              </a>
              <a href="https://wa.me/919873005319" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1ebe5d] transition-all shadow-lg hover:-translate-y-0.5">
                WhatsApp Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
