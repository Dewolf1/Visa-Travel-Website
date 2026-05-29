import { Youtube, Facebook, Instagram, MapPin, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import logo from '../../imports/image.png';

export function Footer() {
  return (
    <footer className="bg-[#050B14] text-white pt-20 pb-10 border-t-4 border-secondary relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-secondary/10 blur-[100px] -z-10 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <div className="bg-white/10 p-2 rounded-xl inline-block mb-6 backdrop-blur-sm border border-white/10">
              <img src={logo} alt="VisaOVisa" className="h-14 w-auto brightness-0 invert" />
            </div>
            <div className="mb-5">
              <p className="text-secondary font-semibold text-sm tracking-wide">Founded by</p>
              <p className="text-white text-xl font-serif font-bold">Mohd Faisal Siddique</p>
            </div>
            <p className="text-blue-100/70 mb-8 font-light leading-relaxed pr-4 text-sm">
              Your trusted partner for premium visa stamping, attestation, and global travel documentation services since 2019. We turn your travel dreams into reality.
            </p>
            
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@visaOvisa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 border border-white/10 hover:border-secondary hover:-translate-y-1"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/visaovisa1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 border border-white/10 hover:border-secondary hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/visaovisa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 border border-white/10 hover:border-secondary hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xl font-serif mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-4 text-blue-100/80">
              <li><a href="#services" className="hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-4 h-4 text-secondary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Our Services</a></li>
              <li><a href="#countries" className="hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-4 h-4 text-secondary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Countries</a></li>
              <li><a href="#jobs" className="hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-4 h-4 text-secondary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Jobs Abroad</a></li>
              <li><a href="#about" className="hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-4 h-4 text-secondary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" /> About Us</a></li>
              <li><a href="#testimonials" className="hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-4 h-4 text-secondary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Testimonials</a></li>
              <li><a href="#contact" className="hover:text-secondary transition-colors inline-flex items-center gap-2 group"><ArrowRight className="w-4 h-4 text-secondary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xl font-serif mb-6 text-secondary">Our Services</h4>
            <ul className="space-y-4 text-blue-100/80">
              <li className="hover:text-white transition-colors cursor-pointer">Visa Stamping</li>
              <li className="hover:text-white transition-colors cursor-pointer">GAMCA Medical</li>
              <li className="hover:text-white transition-colors cursor-pointer">Document Attestation</li>
              <li className="hover:text-white transition-colors cursor-pointer">Flight Booking</li>
              <li className="hover:text-white transition-colors cursor-pointer">PCC Services</li>
              <li className="hover:text-white transition-colors cursor-pointer">Job Recruitment</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xl font-serif mb-6 text-secondary">Contact Info</h4>
            <ul className="space-y-5 text-blue-100/80">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <span className="pt-2 text-sm leading-relaxed">Mezzanine Floor, L-119, KG Marg, Connaught Place, New Delhi 110001</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-secondary group-hover:border-secondary transition-colors">
                  <Phone className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <a href="tel:+919873005319" className="hover:text-white transition-colors pt-1">+91 98730 05319</a>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-secondary group-hover:border-secondary transition-colors">
                  <Mail className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <a href="mailto:contact@visaovisa.com" className="hover:text-white transition-colors pt-1">contact@visaovisa.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-blue-100/60 text-sm font-light">
              &copy; {new Date().getFullYear()} VisaOVisa by <span className="text-secondary font-semibold">Mohd Faisal Siddique</span>. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2 text-blue-100/60 text-sm font-light">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>100% Genuine · Premium Services Since 2019</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
