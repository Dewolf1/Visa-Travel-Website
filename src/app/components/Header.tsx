import { useState, useEffect, useCallback } from 'react';
import { Phone, Menu, X, MessageCircle, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Country, schengenCountries } from '../../data/countriesList';

const NAV_LINKS = [
  { name: 'Services', href: '#services', sectionId: 'services' },
  { name: 'Visa Check', href: '#process', sectionId: 'process' },
  { name: 'Countries', href: '#countries', sectionId: 'countries' },
  { name: 'Schengen', href: '#countries', sectionId: 'schengen', isMegaMenu: true },
  { name: 'Jobs', href: '#jobs', sectionId: 'jobs' },
  { name: 'About Us', href: '#about', sectionId: 'about' },
  { name: 'Reviews', href: '#testimonials', sectionId: 'testimonials' },
  { name: 'Contact', href: '#contact', sectionId: 'contact' },
];

interface HeaderProps {
  onOpenModal: (country: Country) => void;
}

export function Header({ onOpenModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActive] = useState('');

  /* scroll state */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* active section highlight */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(sectionId); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ─── Fixed header wrapper ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] flex flex-col transition-shadow duration-300 ${scrolled ? 'shadow-[0_2px_24px_rgba(10,22,40,0.13)]' : ''
          }`}
      >
        {/* Top info bar — slides away when scrolled */}
        <AnimatePresence initial={false}>
          {!scrolled && (
            <motion.div
              key="topbar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden bg-[#0A1628] text-white text-xs"
            >
              <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
                <span className="opacity-70 hidden md:block">
                  🕒 Mon–Sat 10AM–7PM
                </span>
                <div className="flex items-center gap-5 ml-auto">
                  <div className="flex items-center gap-3">
                    <a href="tel:+919873005319" className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors">
                      <Phone className="w-3 h-3" /> +91 98730 05319
                    </a>
                    <span className="text-white/50">|</span>
                    <a href="tel:+919717248203" className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors">
                      +91 97172 48203
                    </a>
                  </div>
                  <a href="https://wa.me/919873005319" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors">
                    <MessageCircle className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main nav bar */}
        <div
          className={`transition-all duration-300 ${scrolled
              ? 'bg-white border-b border-gray-200 py-3'
              : 'bg-transparent py-4'
            }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-4 relative w-full">
              {/* Logo (Left at top, Centered on scroll for mobile) */}
              <a
                href="#"
                onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`${scrolled ? 'absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0' : 'static'} flex-shrink-0 z-10 transition-all duration-300`}
              >
                {scrolled ? (
                  /* On white nav — show original logo */
                  <img src="/favicon.png" alt="VisaOVisa" className="h-10 md:h-12 w-auto object-contain" />
                ) : (
                  /* On dark hero — show logo in a tiny frosted pill so it reads */
                  <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-2 py-1">
                    <img src="/favicon.png" alt="VisaOVisa" className="h-9 md:h-11 w-auto object-contain mix-blend-multiply" />
                  </div>
                )}
              </a>

              {/* Desktop nav links */}
              <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
                {NAV_LINKS.map(link => {
                  const active = activeSection === link.sectionId;
                  
                  if (link.isMegaMenu) {
                    return (
                      <div key={link.name} className="group relative">
                        <a
                          href={link.href}
                          onClick={(e) => e.preventDefault()}
                          className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1 ${
                            active
                              ? 'text-[#C9A84C]'
                              : scrolled
                                ? 'text-[#0A1628] hover:text-[#C9A84C]'
                                : 'text-white/90 hover:text-white'
                          }`}
                        >
                          {link.name}
                          <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                        </a>

                        {/* Mega Menu Dropdown */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                          <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-6 w-[500px]">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 pb-3 border-b border-gray-100">
                              Schengen Visa Services
                            </h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                              {schengenCountries.map(country => (
                                <button
                                  key={country.name}
                                  onClick={() => onOpenModal(country)}
                                  className="text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#C9A84C] hover:bg-gray-50 rounded-lg transition-all duration-300 hover:translate-x-1 hover:shadow-sm flex items-center gap-2"
                                >
                                  <span>{country.flag}</span>
                                  {country.name} Visa
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        active
                          ? 'text-[#C9A84C]'
                          : scrolled
                            ? 'text-[#0A1628] hover:text-[#C9A84C]'
                            : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.name}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-[#C9A84C]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">


                <a
                  href="https://wa.me/919873005319"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#1ebe5d] transition-all shadow-md hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>

                <a
                  href="#contact"
                  className={`text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover:-translate-y-0.5 ${scrolled
                      ? 'bg-[#0A1628] text-white hover:bg-[#C9A84C] hover:text-[#0A1628]'
                      : 'bg-[#C9A84C] text-[#0A1628] hover:bg-[#E6D08B]'
                    }`}
                >
                  Get Started
                </a>
              </div>

              {/* Mobile hamburger (Right at top, Left on scroll) */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
                className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors z-10 ${scrolled ? 'order-first bg-gray-100 text-[#0A1628]' : 'order-last bg-white/15 text-white backdrop-blur-sm'
                  }`}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Full-screen mobile menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] bg-[#0A1628] flex flex-col pt-28 pb-10 px-8 overflow-y-auto"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`flex items-center justify-between py-4 border-b border-white/10 text-2xl font-serif transition-colors ${activeSection === link.sectionId ? 'text-[#C9A84C]' : 'text-white hover:text-[#C9A84C]'
                    }`}
                >
                  {link.name}
                  <ChevronRight className="w-5 h-5 opacity-40" />
                </motion.a>
              ))}
            </nav>

            <div className="mt-10 flex flex-col gap-3">
              <div className="flex flex-col gap-2 border border-white/20 text-white py-4 rounded-xl items-center hover:bg-white/10 transition-colors">
                <a href="tel:+919873005319" className="flex items-center justify-center gap-2 text-base font-semibold">
                  <Phone className="w-5 h-5 text-[#C9A84C]" /> +91 98730 05319
                </a>
                <div className="w-12 h-px bg-white/20"></div>
                <a href="tel:+919717248203" className="flex items-center justify-center gap-2 text-base font-semibold">
                  <Phone className="w-5 h-5 text-[#C9A84C]" /> +91 97172 48203
                </a>
              </div>
              <a href="https://wa.me/919873005319" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl text-base font-bold">
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
              <a href="#contact" onClick={closeMenu}
                className="flex items-center justify-center bg-[#C9A84C] text-[#0A1628] py-4 rounded-xl text-base font-bold">
                Get Started Today
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
