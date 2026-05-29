import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIsVisible(true), 2000);
    const t2 = setTimeout(() => setShowBadge(true), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 group"
    >
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-primary px-4 py-2 rounded-xl shadow-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        Chat with us!
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rotate-45 rounded-sm" />
      </div>

      {/* Notification badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg z-10"
          >
            1
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/919873005319"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setShowBadge(false)}
        className="pulse-glow w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-[#1ebe5d] hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 relative shadow-[0_8px_24px_rgba(37,211,102,0.5)]"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 drop-shadow-sm" />
      </a>
    </motion.div>
  );
}

