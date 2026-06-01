import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Briefcase, MapPin, User, Phone, Mail, GraduationCap, ChevronDown, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { submitForm } from '../utils/formSubmit';

const JOB_CATEGORIES = [
  { id: 'cook', label: 'House Cook / Chef', icon: '👨‍🍳' },
  { id: 'driver', label: 'House Driver', icon: '🚗' },
  { id: 'electrician', label: 'Electrician', icon: '⚡' },
  { id: 'plumber', label: 'Plumber', icon: '🔧' },
  { id: 'carpenter', label: 'Carpenter', icon: '🪚' },
  { id: 'welder', label: 'Welder / Fabricator', icon: '🔩' },
  { id: 'construction', label: 'Construction Labor', icon: '🏗️' },
  { id: 'security', label: 'Security Guard', icon: '🛡️' },
  { id: 'cleaner', label: 'Housekeeping / Cleaner', icon: '🧹' },
  { id: 'ac', label: 'AC Technician', icon: '❄️' },
  { id: 'mason', label: 'Mason / Tiler', icon: '🧱' },
  { id: 'other', label: 'Other Skilled Work', icon: '⚙️' },
];

const COUNTRIES = [
  'Saudi Arabia', 'Kuwait', 'UAE', 'Qatar', 'Oman', 'Bahrain',
];

const EXPERIENCE_LEVELS = [
  'No Experience (Fresher)', '6 months – 1 year', '1–3 years', '3–5 years', '5+ years',
];

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  nationality: string;
  destination: string;
  jobCategory: string;
  experience: string;
  education: string;
  languages: string;
  message: string;
};

export function JobApply() {
  const [selectedJob, setSelectedJob] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const jobLabel = JOB_CATEGORIES.find(j => j.id === data.jobCategory)?.label ?? data.jobCategory;

    // Submit via Web3Forms + get WhatsApp link
    const { waLink } = await submitForm({
      subject: 'Job Application — VisaOVisa',
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      nationality: data.nationality,
      destination_country: data.destination,
      job_category: jobLabel,
      experience: data.experience,
      education: data.education,
      languages: data.languages,
      message: data.message,
    });

    // Build a detailed WhatsApp message for easier reading
    const waMsg = encodeURIComponent(
      `*JOB APPLICATION — VisaOVisa*\n\n` +
      `👤 Name: ${data.fullName}\n` +
      `📞 Phone: ${data.phone}\n` +
      `📧 Email: ${data.email || 'N/A'}\n` +
      `🌍 Nationality: ${data.nationality}\n` +
      `🏳️ Destination: ${data.destination}\n` +
      `💼 Job: ${jobLabel}\n` +
      `⏳ Experience: ${data.experience}\n` +
      `🎓 Education: ${data.education}\n` +
      `🗣️ Languages: ${data.languages || 'N/A'}\n` +
      `📝 Message: ${data.message || 'N/A'}`
    );
    const detailedLink = `https://wa.me/919873005319?text=${waMsg}`;
    setWhatsappLink(detailedLink);
    setSubmitted(true);
    toast.success('Application submitted! We will contact you shortly.');
    reset();
    setSelectedJob('');
  };

  return (
    <section id="jobs" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-5">
              <Briefcase className="w-4 h-4" /> Job Opportunities
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-5 text-primary font-serif leading-tight">
              Work in the <span className="text-gradient-gold">Gulf</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              VisaOVisa connects skilled workers with verified employers across GCC countries. Apply below and we'll guide you every step of the way.
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Success State */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-10 text-center mb-10 shadow-lg"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">Application Received!</h3>
                <p className="text-muted-foreground mb-7 max-w-md mx-auto">
                  Our team at VisaOVisa will review your application and contact you within 24–48 hours. For faster response, send it directly on WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#1ebe5d] hover:-translate-y-0.5 transition-all shadow-lg"
                  >
                    Send via WhatsApp <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-7 py-3.5 rounded-xl hover:bg-secondary hover:text-primary transition-all"
                  >
                    Submit Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!submitted && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-background border border-border rounded-2xl shadow-[0_8px_40px_-12px_rgba(10,22,40,0.1)] overflow-hidden"
            >
              {/* Step: Pick a job */}
              <div className="p-8 border-b border-border">
                <h3 className="text-xl font-serif font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 bg-secondary text-primary text-sm font-black rounded-full flex items-center justify-center">1</span>
                  Select Job Category
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {JOB_CATEGORIES.map((job) => (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => {
                        setSelectedJob(job.id);
                        setValue('jobCategory', job.id);
                      }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 cursor-pointer
                        ${selectedJob === job.id
                          ? 'border-secondary bg-secondary/10 text-primary shadow-md scale-[1.02]'
                          : 'border-border bg-white text-muted-foreground hover:border-secondary/50 hover:bg-secondary/5'
                        }`}
                    >
                      <span className="text-2xl">{job.icon}</span>
                      <span className="text-center leading-tight">{job.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                <h3 className="text-xl font-serif font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 bg-secondary text-primary text-sm font-black rounded-full flex items-center justify-center">2</span>
                  Your Details
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-secondary" /> Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('fullName', { required: 'Name is required' })}
                      placeholder="Mohd Ali Khan"
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-secondary" /> Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('phone', { required: 'Phone is required', pattern: { value: /^[0-9+\s-]{7,15}$/, message: 'Invalid phone' } })}
                      placeholder="+91 XXXXX XXXXX"
                      type="tel"
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-secondary" /> Email Address
                    </label>
                    <input
                      {...register('email')}
                      placeholder="your@email.com"
                      type="email"
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </div>

                  {/* Nationality */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-secondary" /> Nationality <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register('nationality', { required: 'Nationality is required' })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all appearance-none"
                      >
                        <option value="">Select nationality</option>
                        <option>Indian</option>
                        <option>Nepali</option>
                        <option>Bangladeshi</option>
                        <option>Sri Lankan</option>
                        <option>Pakistani</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.nationality && <p className="text-red-500 text-xs">{errors.nationality.message}</p>}
                  </div>

                  {/* Destination */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-secondary" /> Preferred Country <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register('destination', { required: 'Destination is required' })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all appearance-none"
                      >
                        <option value="">Select country</option>
                        {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.destination && <p className="text-red-500 text-xs">{errors.destination.message}</p>}
                  </div>

                  {/* Experience */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-secondary" /> Work Experience <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register('experience', { required: 'Experience is required' })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all appearance-none"
                      >
                        <option value="">Select experience</option>
                        {EXPERIENCE_LEVELS.map((e) => <option key={e}>{e}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.experience && <p className="text-red-500 text-xs">{errors.experience.message}</p>}
                  </div>

                  {/* Education */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-secondary" /> Education Level <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register('education', { required: 'Education is required' })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all appearance-none"
                      >
                        <option value="">Select education</option>
                        <option>No formal education</option>
                        <option>Primary School (up to 5th)</option>
                        <option>Secondary School (up to 10th)</option>
                        <option>Higher Secondary (12th)</option>
                        <option>Diploma / ITI</option>
                        <option>Graduate & above</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.education && <p className="text-red-500 text-xs">{errors.education.message}</p>}
                  </div>

                  {/* Languages */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary">Languages Known</label>
                    <input
                      {...register('languages')}
                      placeholder="Hindi, Urdu, English..."
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mt-5 space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Additional Information</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Any special skills, certifications, or information you'd like us to know..."
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all resize-none"
                  />
                </div>

                {/* Validation hint for job */}
                {!selectedJob && (
                  <p className="text-amber-500 text-xs mt-3">⚠ Please select a job category above before submitting.</p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedJob}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary hover:text-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </button>

                  <a
                    href="https://wa.me/919873005319?text=Hi%20Faisal%20bhai%2C%20I%20want%20to%20apply%20for%20a%20job%20in%20Gulf%20countries%20through%20VisaOVisa."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-7 py-4 rounded-xl hover:bg-[#1ebe5d] hover:-translate-y-0.5 transition-all shadow-lg sm:flex-shrink-0"
                  >
                    Apply via WhatsApp
                  </a>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  📞 Your details will be shared with Mohd Faisal Siddique (VisaOVisa). We do not share your data with third parties.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
