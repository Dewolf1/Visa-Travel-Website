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
import { BackToTop } from './components/BackToTop';
import { JobApply } from './components/JobApply';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <VisaChecker />
      <Process />
      <Services />
      <Countries />
      <WhyChooseUs />
      <Testimonials />
      <JobApply />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <Toaster position="bottom-left" richColors closeButton />
    </div>
  );
}