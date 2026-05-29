import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully!', {
        description: 'Our team will get back to you shortly.',
        duration: 5000,
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10 translate-x-[30%] translate-y-[-20%]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-[-30%] translate-y-[20%]"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-3 block">Reach Out</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-primary font-serif">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Ready to start your visa journey? Contact us today for a free expert consultation.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl border border-border/60 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/20 transition-colors duration-500"></div>
              
              <h3 className="text-2xl mb-8 text-primary font-serif font-bold">Contact Information</h3>

              <div className="space-y-6">
                <a
                  href="tel:+919873005319"
                  className="flex items-start gap-5 group/item"
                >
                  <div className="w-14 h-14 bg-accent text-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-secondary group-hover/item:text-white transition-all duration-300 shadow-sm group-hover/item:shadow-md">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-1">Call Us</div>
                    <div className="text-xl text-primary font-bold group-hover/item:text-secondary transition-colors">+91 98730 05319</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/919873005319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-5 group/item"
                >
                  <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-green-600 group-hover/item:text-white transition-all duration-300 shadow-sm group-hover/item:shadow-md">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-1">WhatsApp</div>
                    <div className="text-xl text-primary font-bold group-hover/item:text-green-600 transition-colors">Instant Chat</div>
                  </div>
                </a>

                <div className="flex items-start gap-5 group/item">
                  <div className="w-14 h-14 bg-accent text-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-secondary group-hover/item:text-white transition-all duration-300 shadow-sm group-hover/item:shadow-md">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-1">Email</div>
                    <div className="text-xl text-primary font-bold">contact@visaovisa.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-5 pt-4 border-t border-border/50">
                  <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-1">Visit Our Office</div>
                    <div className="text-lg text-primary font-medium leading-tight">Mezzanine Floor, L-119, KG Marg</div>
                    <div className="text-primary leading-tight mt-1">Connaught Place, New Delhi 110001</div>
                    <div className="text-sm text-secondary font-medium mt-2">Mon-Sat: 10:00 AM - 7:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Embed */}
            <div className="bg-white p-2 rounded-2xl border border-border/60 shadow-lg overflow-hidden h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.040055106655!2d77.2201!3d28.6302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd34208a3d43%3A0x1d3a5a7f9a1bd147!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1716500000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.75rem' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="VisaOVisa Office Location"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white p-8 md:p-10 rounded-2xl border border-border/60 shadow-xl relative"
          >
            <h3 className="text-3xl mb-2 text-primary font-serif font-bold">Send Us a Message</h3>
            <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-semibold text-primary">Full Name <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-primary">Phone Number <span className="text-destructive">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country" className="block mb-2 text-sm font-semibold text-primary">Destination Country</label>
                  <div className="relative">
                    <select
                      id="country"
                      className="w-full px-5 py-4 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none"
                    >
                      <option value="">Select a country</option>
                      <option value="kuwait">Kuwait</option>
                      <option value="saudi">Saudi Arabia</option>
                      <option value="uae">UAE</option>
                      <option value="qatar">Qatar</option>
                      <option value="bahrain">Bahrain</option>
                      <option value="oman">Oman</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block mb-2 text-sm font-semibold text-primary">Service Required</label>
                  <div className="relative">
                    <select
                      id="service"
                      className="w-full px-5 py-4 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="visa-stamping">Visa Stamping</option>
                      <option value="gamca">GAMCA Medical</option>
                      <option value="attestation">Document Attestation</option>
                      <option value="flight">Flight Booking</option>
                      <option value="pcc">PCC Services</option>
                      <option value="recruitment">Job Recruitment</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-semibold text-primary">Your Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl bg-accent/30 border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 font-bold text-lg shadow-[0_10px_20px_-10px_rgba(10,22,40,0.5)] group disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
