import { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Countries } from './components/Countries';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { VisaChecker } from './components/VisaChecker';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Chatbot } from './components/Chatbot';
import { BackToTop } from './components/BackToTop';
import { JobApply } from './components/JobApply';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Toaster } from 'sonner';
import { CountryDetailsModal } from './components/CountryDetailsModal';
import { AnimatePresence } from 'motion/react';
import { Country } from '../data/countriesList';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const openModal = useCallback((country: Country) => setSelectedCountry(country), []);
  const closeModal = useCallback(() => setSelectedCountry(null), []);

  useEffect(() => {
    if (selectedCountry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenModal={openModal} />
      <Hero />
      <VisaChecker />
      <Process />
      <Services />
      <Countries onOpenModal={openModal} />
      <WhyChooseUs />
      <Testimonials />
      <JobApply />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <Chatbot onOpenModal={openModal} />
      <BackToTop />
      <StickyMobileCTA />
      <Toaster position="bottom-left" richColors closeButton />
      
      <AnimatePresence>
        {selectedCountry && (
          <CountryDetailsModal country={selectedCountry} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}