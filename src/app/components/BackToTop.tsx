import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/** Back to Top — bottom LEFT, clean gold circle */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-[9980] w-12 h-12 rounded-full bg-[#C9A84C] text-[#0A1628] flex items-center justify-center shadow-[0_8px_24px_rgba(201,168,76,0.45)] hover:bg-[#E6D08B] hover:-translate-y-1 transition-all duration-200"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
