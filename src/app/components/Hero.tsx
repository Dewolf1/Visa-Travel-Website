import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Shield, Clock, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const SLIDES = [
  {
    title: "Dream It, Visit It",
    subtitle: "Genuine Visa Services Since 2016",
    description: "Your trusted partner for visa stamping, attestation, and travel documentation services.",
    bgClass: "bg-gradient-to-br from-[#0A1628]/95 to-[#0A1628]/75",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
  },
  {
    title: "Gulf Countries Specialist",
    subtitle: "Expertise You Can Trust",
    description: "Specialized visa processing for Saudi Arabia, UAE, Kuwait, Qatar, Oman, and Bahrain.",
    bgClass: "bg-gradient-to-br from-[#1E2D44]/95 to-[#0A1628]/85",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "100% Genuine Services",
    subtitle: "Verified & Authentic",
    description: "We ensure complete transparency and authenticity in all our visa and attestation services.",
    bgClass: "bg-gradient-to-br from-[#0A1628]/95 to-[#1E2D44]/85",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "34,000+ Happy Clients",
    subtitle: "Join Our Success Story",
    description: "Our exceptional success rate and dedicated support make us the preferred choice.",
    bgClass: "bg-gradient-to-br from-[#1E2D44]/95 to-[#0A1628]/95",
    image: "https://images.unsplash.com/photo-1569974494991-389d380e9227?q=80&w=2070&auto=format&fit=crop"
  }
];

const STATS_BAR_H = 80; // px — half this overhangs into next section

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    /*
     * Key fixes:
     * 1. NO overflow-hidden on the <section> — that was clipping the stats bar
     *    (which translate-y-1/2 overhangs downward).
     * 2. overflow-hidden lives ONLY on the embla outer div so slides don't bleed right.
     * 3. The embla div is w-full (not inset-0) so it truly fills the section width.
     * 4. Section gets enough padding-bottom so the content isn't hidden behind the stats bar.
     */
    <section
      className="relative bg-primary"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Carousel wrapper — overflow-hidden HERE prevents right bleed ── */}
      <div
        ref={emblaRef}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',   /* clamp slides inside this box */
          width: '100%',
          height: '100%',
        }}
      >
        {/* Flex track */}
        <div style={{ display: 'flex', height: '100%', willChange: 'transform' }}>
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 100%',   /* exactly one viewport-width per slide */
                minWidth: 0,
                position: 'relative',
                height: '100%',
              }}
            >
              {/* Background image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 1200ms ease-out',
                  transform: selectedIndex === index ? 'scale(1)' : 'scale(1.06)',
                }}
              >
                {/* Colour overlay */}
                <div className={`absolute inset-0 ${slide.bgClass}`} />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              </div>

              {/* Slide text */}
              <div className="container relative h-full mx-auto px-4 flex items-center justify-center">
                <div className="max-w-4xl w-full text-center" style={{ paddingTop: '80px', paddingBottom: `${STATS_BAR_H + 80}px` }}>
                  <AnimatePresence mode="wait">
                    {selectedIndex === index && (
                      <motion.div
                        key={`slide-${index}`}
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="inline-block mb-6 px-5 py-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-full font-medium tracking-wide backdrop-blur-sm text-sm md:text-base"
                        >
                          {slide.subtitle}
                        </motion.div>

                        <motion.h1
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight font-serif drop-shadow-lg"
                        >
                          {slide.title}
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="text-lg md:text-xl lg:text-2xl text-blue-50/90 mb-10 max-w-2xl mx-auto font-light drop-shadow-md"
                        >
                          {slide.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                          <a
                            href="#countries"
                            className="bg-secondary text-primary px-8 py-4 rounded-lg hover:bg-[#E6D08B] transition-all shadow-[0_0_24px_rgba(201,168,76,0.35)] hover:shadow-[0_0_36px_rgba(201,168,76,0.55)] font-semibold text-lg relative overflow-hidden group"
                          >
                            <span className="relative z-10">Apply for Visa Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
                          </a>
                          <a
                            href="https://wa.me/919873005319"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold text-lg flex items-center justify-center gap-2"
                          >
                            WhatsApp Us
                          </a>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Nav arrows — positioned relative to section, z above carousel ── */}
      <button
        onClick={scrollPrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/25 hover:bg-black/50 text-white backdrop-blur-sm border border-white/15 transition-all hidden md:flex z-20 hover:scale-110 hover:border-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/25 hover:bg-black/50 text-white backdrop-blur-sm border border-white/15 transition-all hidden md:flex z-20 hover:scale-110 hover:border-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* ── Pagination dots ── */}
      <div className="absolute bottom-16 lg:bottom-24 left-0 right-0 flex justify-center gap-2.5 z-20 pointer-events-none">
        <div className="flex gap-2.5 pointer-events-auto">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-400 rounded-full ${selectedIndex === index
                ? 'w-9 h-2.5 bg-secondary shadow-[0_0_10px_rgba(201,168,76,0.6)]'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute top-1/2 right-5 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-1 rounded-full transition-all duration-400 ${selectedIndex === index ? 'h-10 bg-secondary' : 'h-4 bg-white/30 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* ── Stats bar
           • Uses relative positioning at the bottom of the section via padding + a regular div
           • No translate-y trick — that was the culprit causing the clip issue
      ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{ transform: 'translateY(50%)' }}
      >
        <div className="container mx-auto px-4">
          {/* Desktop 4-col card */}
          <div className="hidden lg:grid grid-cols-4 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(10,22,40,0.22)] border border-border overflow-hidden">
            {[
              { icon: Shield, label: '100% Genuine', desc: 'Verified Services' },
              { icon: Clock, label: 'Fast Processing', desc: 'Quick Turnaround' },
              { icon: Award, label: '34K+ Clients', desc: 'Trust & Reliability' },
              { icon: Plane, label: 'Expert Guidance', desc: 'End-to-End Support' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-5 xl:p-6 group cursor-pointer hover:bg-accent/40 transition-colors duration-200 ${idx < 3 ? 'border-r border-border/50' : ''}`}
              >
                <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 flex-shrink-0 group-hover:scale-110">
                  <item.icon className="w-5 h-5 xl:w-6 xl:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-primary text-sm xl:text-base truncate">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile 2×2 pills */}
          <div className="lg:hidden grid grid-cols-2 gap-2">
            {[
              { icon: Shield, label: '100% Genuine' },
              { icon: Clock, label: 'Fast Processing' },
              { icon: Award, label: '34K+ Clients' },
              { icon: Plane, label: 'Expert Guidance' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2.5 shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-primary">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
