import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Indra Nag',
    review: 'Excellent service on time...tq so much faisal bhai❤️❤️',
    rating: 5,
    service: 'Kuwait Visa Stamping',
    initials: 'IN'
  },
  {
    name: 'Furqan Ahmed',
    review: 'Excellent experience for Saudi visa assistance with visaovisa.',
    rating: 5,
    service: 'Saudi Arabia Visa',
    initials: 'FA'
  },
  {
    name: 'Rockingme Rockingme',
    review: 'Sir did my stamping work for kuwait. Very professional and quick service.',
    rating: 5,
    service: 'Kuwait Work Visa',
    initials: 'RR'
  },
  {
    name: 'Mohd Adeeb',
    review: 'Great experience! They helped me throughout the entire process. Highly recommended.',
    rating: 5,
    service: 'Document Attestation',
    initials: 'MA'
  },
  {
    name: 'Sarah Khan',
    review: 'The best visa agency in Delhi. Very transparent process and helpful staff.',
    rating: 5,
    service: 'UAE Tourist Visa',
    initials: 'SK'
  }
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  }, [Autoplay({ delay: 4000, stopOnInteraction: true })]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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
    <section id="testimonials" className="relative overflow-hidden">
      {/* ── Dark top band ── */}
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-14 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 mb-5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <span className="text-sm font-semibold tracking-wide text-white">4.9 / 5.0 RATING</span>
              </div>

              <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-5 block">
                Trusted By Thousands
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl mb-5 font-serif text-white leading-tight">
                Client <span className="text-gradient-gold">Stories</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
              <p className="text-lg text-blue-100/80 max-w-2xl mx-auto font-light">
                Real reviews from real people who trusted us with their global journey.
              </p>
            </motion.div>
          </div>

          {/* Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden pb-4 pt-2" ref={emblaRef}>
              <div className="flex touch-pan-y -ml-4">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="h-full bg-white p-8 rounded-2xl border border-white/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] flex flex-col relative group"
                    >
                      <Quote className="absolute top-6 right-8 w-12 h-12 text-secondary/10 group-hover:text-secondary/20 transition-colors duration-500 transform group-hover:scale-110" />

                      <div className="flex gap-1 mb-5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                        ))}
                      </div>

                      <p className="text-foreground/85 mb-7 italic flex-grow text-base leading-relaxed">
                        "{testimonial.review}"
                      </p>

                      <div className="flex items-center gap-4 mt-auto pt-5 border-t border-border">
                        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-secondary font-serif text-base font-bold flex-shrink-0">
                          {testimonial.initials}
                        </div>
                        <div>
                          <div className="text-primary font-bold font-serif text-sm">{testimonial.name}</div>
                          <div className="text-xs font-semibold text-secondary">{testimonial.service}</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={scrollPrev}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 transition-all duration-300 rounded-full ${index === selectedIndex ? 'w-8 bg-secondary' : 'w-2 bg-white/30'}`}
                  />
                ))}
              </div>

              <button
                onClick={scrollNext}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Light bottom band (YouTube CTA) ── */}
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-medium mb-3">
            Based on Google reviews and our YouTube community
          </p>
          <a
            href="https://www.youtube.com/@visaOvisa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors text-lg"
          >
            Watch reviews on YouTube
            <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-md">34.8K subscribers</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
