import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Plane, Shield, Clock, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const SLIDES = [
  {
    title: "Dream It, Visit It",
    subtitle: "Premium Visa Services Since 2019",
    description: "Your trusted partner for visa stamping, attestation, and travel documentation services.",
    bgClass: "bg-gradient-to-br from-[#0A1628]/90 to-[#0A1628]/70",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
  },
  {
    title: "Gulf Countries Specialist",
    subtitle: "Expertise You Can Trust",
    description: "Specialized visa processing for Saudi Arabia, UAE, Kuwait, Qatar, Oman, and Bahrain.",
    bgClass: "bg-gradient-to-br from-[#1E2D44]/90 to-[#0A1628]/80",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "100% Genuine Services",
    subtitle: "Verified & Authentic",
    description: "We ensure complete transparency and authenticity in all our visa and attestation services.",
    bgClass: "bg-gradient-to-br from-[#0A1628]/90 to-[#1E2D44]/80",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "34,000+ Happy Clients",
    subtitle: "Join Our Success Story",
    description: "Our exceptional success rate and dedicated support make us the preferred choice.",
    bgClass: "bg-gradient-to-br from-[#1E2D44]/90 to-[#0A1628]/90",
    image: "https://images.unsplash.com/photo-1569974494991-389d380e9227?q=80&w=2070&auto=format&fit=crop"
  }
];

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center bg-primary pb-20 lg:pb-32">
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {SLIDES.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                style={{ backgroundImage: `url(${slide.image})`, transform: selectedIndex === index ? 'scale(1)' : 'scale(1.05)' }}
              >
                <div className={`absolute inset-0 ${slide.bgClass} mix-blend-multiply`}></div>
              </div>
              
              <div className="container relative h-full mx-auto px-4 flex items-center">
                <div className="max-w-4xl mx-auto text-center w-full mt-20 md:mt-16">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: selectedIndex === index ? 1 : 0, y: selectedIndex === index ? 0 : 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="inline-block mb-6 px-5 py-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-full font-medium tracking-wide backdrop-blur-sm">
                      {slide.subtitle}
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight font-serif drop-shadow-lg">
                      {slide.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-50/90 mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
                      <a
                        href="#contact"
                        className="bg-secondary text-primary px-8 py-4 rounded-lg hover:bg-[#E6D08B] transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] font-semibold text-lg relative overflow-hidden group"
                      >
                        <span className="relative z-10">Apply for Visa Now</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                      </a>
                      <a
                        href="https://wa.me/919873005319"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold text-lg flex items-center justify-center gap-2 group"
                      >
                        <span className="relative z-10 flex items-center gap-2">WhatsApp Us</span>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm border border-white/10 transition-all hidden md:flex z-10 hover:scale-110"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm border border-white/10 transition-all hidden md:flex z-10 hover:scale-110"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-28 lg:bottom-40 left-0 right-0 flex justify-center gap-3 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              selectedIndex === index 
                ? 'w-10 h-2.5 bg-secondary' 
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Stats Bar - overlaps into next section on desktop */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2 px-4">
        <div className="container mx-auto">
          {/* Desktop: 4-col card */}
          <div className="hidden lg:grid grid-cols-4 gap-0 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(10,22,40,0.2)] border border-border overflow-hidden">
            {[
              { icon: Shield, label: '100% Genuine', desc: 'Verified Services' },
              { icon: Clock, label: 'Fast Processing', desc: 'Quick Turnaround' },
              { icon: Award, label: '34K+ Subscribers', desc: 'Trust & Reliability' },
              { icon: Plane, label: 'Expert Guidance', desc: 'End-to-End Support' },
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center gap-4 p-6 group cursor-pointer hover:bg-accent/40 transition-colors ${idx < 3 ? 'border-r border-border/50' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-primary">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: 2×2 compact pills */}
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
