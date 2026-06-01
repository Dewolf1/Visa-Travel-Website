import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { PHONE_LINK } from '../utils/constants';

/**
 * Call button — mirrors WhatsAppButton.tsx exactly.
 * WhatsApp sits at: bottom-6 right-6 (md: bottom-8 right-8), w-16 h-16
 * This sits one button-height + gap above it:
 *   mobile: bottom = 1.5rem (bottom-6) + 4rem (h-16) + 1rem (gap) = 6.5rem
 *   md:     bottom = 2rem   (md:bottom-8) + 4rem + 1rem             = 7rem
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-[6.5rem] right-6 z-50 md:bottom-28 md:right-8 group"
    >
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-primary px-4 py-2 rounded-xl shadow-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        Call Us!
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rotate-45 rounded-sm" />
      </div>

      <a
        href={PHONE_LINK}
        aria-label="Call Us"
        className="w-16 h-16 bg-[#1565C0] text-white rounded-full flex items-center justify-center hover:bg-[#1976D2] hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 relative shadow-[0_8px_24px_rgba(21,101,192,0.5)]"
      >
        <Phone className="w-7 h-7 drop-shadow-sm" />
      </a>
    </motion.div>
  );
}
