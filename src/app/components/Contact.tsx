import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { submitForm } from '../utils/formSubmit';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const name    = fd.get('name')    as string;
    const phone   = fd.get('phone')   as string;
    const email   = fd.get('email')   as string;
    const country = fd.get('country') as string;
    const service = fd.get('service') as string;
    const message = fd.get('message') as string;

    const { waLink, emailSent } = await submitForm({
      subject: 'New Visa Enquiry',
      name,
      phone,
      email,
      destination_country: country,
      service_required: service,
      message,
    });

    setWaLink(waLink);
    setIsSubmitting(false);
    setSubmitted(true);

    toast.success(emailSent ? 'Message sent!' : 'Message received!', {
      description: emailSent
        ? "We'll get back to you within 24 hours."
        : 'Tap \'Send on WhatsApp\' for the fastest response.',
      duration: 6000,
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10 translate-x-[30%] translate-y-[-20%]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-[-30%] translate-y-[20%]" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-3 block">Reach Out</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6 text-primary font-serif">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Ready to start your visa journey? Contact us today for a free expert consultation.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6 md:space-y-8"
          >
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-border/60 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/20 transition-colors duration-500" />

              <h3 className="text-2xl mb-8 text-primary font-serif font-bold">Contact Information</h3>

              <div className="space-y-6">
                <a href="tel:+919873005319" className="flex items-start gap-5 group/item">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-accent text-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-secondary group-hover/item:text-white transition-all duration-300 shadow-sm">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-1">Call Us</div>
                    <div className="text-lg md:text-xl text-primary font-bold group-hover/item:text-secondary transition-colors">+91 98730 05319</div>
                  </div>
                </a>

                <a href="https://wa.me/919873005319" target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 group/item">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-green-600 group-hover/item:text-white transition-all duration-300 shadow-sm">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-1">WhatsApp</div>
                    <div className="text-lg md:text-xl text-primary font-bold group-hover/item:text-green-600 transition-colors">Instant Chat</div>
                  </div>
                </a>

                <div className="flex items-start gap-5 group/item">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-accent text-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-secondary group-hover/item:text-white transition-all duration-300 shadow-sm">
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-1">Email</div>
                    <div className="text-base md:text-xl text-primary font-bold break-all">contact@visaovisa.com</div>
                  </div>
                </div>


              </div>
            </div>


          </motion.div>

          {/* Right: form or success */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white p-6 md:p-10 rounded-2xl border border-border/60 shadow-xl relative"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-5">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary">Message Received!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Our team will get back to you within 24 hours. For the fastest response, tap the button below.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#1ebe5d] transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" /> Send on WhatsApp Too
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-muted-foreground underline hover:text-primary transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl md:text-3xl mb-2 text-primary font-serif font-bold">Send Us a Message</h3>
                <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">Fill out the form below and we'll get back to you within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-semibold text-primary">Full Name <span className="text-destructive">*</span></label>
                      <input type="text" id="name" name="name" required
                        className="w-full px-4 py-3.5 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-primary">Phone Number <span className="text-destructive">*</span></label>
                      <input type="tel" id="phone" name="phone" required
                        className="w-full px-4 py-3.5 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-semibold text-primary">Email Address</label>
                    <input type="email" id="email" name="email"
                      className="w-full px-4 py-3.5 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="country" className="block mb-2 text-sm font-semibold text-primary">Destination Country</label>
                      <div className="relative">
                        <select id="country" name="country"
                          className="w-full px-4 py-3.5 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none text-sm"
                        >
                          <option value="">Select a country</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="UAE">UAE</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Oman">Oman</option>
                          <option value="Russia">Russia</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block mb-2 text-sm font-semibold text-primary">Service Required</label>
                      <div className="relative">
                        <select id="service" name="service"
                          className="w-full px-4 py-3.5 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none text-sm"
                        >
                          <option value="">Select a service</option>
                          <option value="Visa Stamping">Visa Stamping</option>
                          <option value="GAMCA Medical">GAMCA Medical</option>
                          <option value="Document Attestation">Document Attestation</option>
                          <option value="Flight Booking">Flight Booking</option>
                          <option value="Job Recruitment">Job Recruitment</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-semibold text-primary">Your Message</label>
                    <textarea id="message" name="message" rows={4}
                      className="w-full px-4 py-3.5 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none text-sm"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 font-bold text-base md:text-lg shadow-[0_10px_20px_-10px_rgba(10,22,40,0.5)] group disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center pt-1">
                    Your details are shared only with VisaOVisa. We do not sell your data.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
