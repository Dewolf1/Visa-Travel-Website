import { useState, useEffect, useCallback } from 'react';
import { Phone, Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../imports/image.png';

const NAV_LINKS = [
  { name: 'Services', href: '#services', sectionId: 'services' },
  { name: 'Visa Check', href: '#process', sectionId: 'process' },
  { name: 'Countries', href: '#countries', sectionId: 'countries' },
  { name: 'Jobs', href: '#jobs', sectionId: 'jobs' },
  { name: 'About Us', href: '#about', sectionId: 'about' },
  { name: 'Reviews', href: '#testimonials', sectionId: 'testimonials' },
  { name: 'Contact', href: '#contact', sectionId: 'contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── active‑section via IntersectionObserver ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sectionId);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── smooth scroll with offset for sticky header ── */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;
      const offset = 80;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
      setMobileMenuOpen(false);
    },
    []
  );

  const headerBg = isScrolled
    ? 'bg-white/80 dark:bg-[#0A1628]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(10,22,40,0.12)] border-b border-white/20'
    : 'bg-transparent';

  return (
    <>
      {/* ── Top info strip (visible only before scrolling) ── */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 w-full z-50 bg-primary text-white text-xs overflow-hidden"
          >
            <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
              <span className="opacity-80 hidden md:block">
                📍 Mezzanine Floor, L-119, KG Marg, Connaught Place, New Delhi — Mon‑Sat 10AM–7PM
              </span>
              <div className="flex items-center gap-4 ml-auto">
                <a href="tel:+919873005319" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                  <Phone className="w-3 h-3" /> +91 98730 05319
                </a>
                <a
                  href="https://wa.me/919873005319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-secondary transition-colors"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main navbar ── */}
      <header
        className={`fixed w-full z-40 transition-all duration-500 ${headerBg} ${
          isScrolled ? 'top-0 py-3' : 'top-7 py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-6">

            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center flex-shrink-0">
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/85 backdrop-blur-sm'}`}>
                <img src={logo} alt="VisaOVisa" className="h-9 md:h-11 w-auto object-contain mix-blend-multiply" />
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 group
                      ${isActive
                        ? 'text-secondary'
                        : isScrolled
                          ? 'text-primary hover:text-secondary'
                          : 'text-white/90 hover:text-white'
                      }`}
                  >
                    {link.name}
                    {/* Active pill */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-secondary/10 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Hover underline */}
                    <span className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 ${isActive ? 'scale-x-100' : ''}`} />
                  </a>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <a
                href="tel:+919873005319"
                className={`flex items-center gap-2 text-sm font-bold transition-all duration-200 px-3 py-2 rounded-lg
                  ${isScrolled ? 'text-primary hover:text-secondary hover:bg-secondary/10' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isScrolled ? 'bg-secondary/10' : 'bg-white/10'}`}>
                  <Phone className="w-4 h-4 text-secondary" />
                </div>
                <span>+91 98730 05319</span>
              </a>

              <a
                href="https://wa.me/919873005319"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#1ebe5d] transition-all shadow-[0_4px_12px_rgba(37,211,102,0.35)] hover:shadow-[0_4px_18px_rgba(37,211,102,0.5)] hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-secondary hover:text-primary transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-white/20 to-secondary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </a>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                isScrolled ? 'bg-primary/10 text-primary' : 'bg-white/20 text-white backdrop-blur-sm'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Active-section gradient bar */}
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      </header>

      {/* ── Full‑screen mobile menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-30 bg-primary flex flex-col"
          >
            <div className="flex flex-col justify-center h-full px-8 pt-24 pb-10 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={`text-3xl font-serif py-4 border-b border-white/10 transition-colors flex items-center justify-between group
                    ${activeSection === link.sectionId ? 'text-secondary' : 'text-white hover:text-secondary'}`}
                >
                  {link.name}
                  <ChevronDown className="w-5 h-5 -rotate-90 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-8 flex flex-col gap-3"
              >
                <a
                  href="tel:+919873005319"
                  className="flex items-center justify-center gap-2 text-white/90 border border-white/20 p-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5 text-secondary" /> +91 98730 05319
                </a>
                <a
                  href="https://wa.me/919873005319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white p-4 rounded-xl text-lg font-bold shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
                >
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center gap-2 bg-secondary text-primary p-4 rounded-xl text-lg font-bold shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
                >
                  Get Started Today
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
