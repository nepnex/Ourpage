import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Phone, ArrowRight, Laptop, Sparkles } from 'lucide-react';
import { Button, Input, Textarea, Container, Section } from '@/components/ui';
import { useInView, useReducedMotion } from '@/hooks';

// ─── Schema ───────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  serviceInterested: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactPage() {
  const reducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [heroRef, heroInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [formRef, formInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        toast.error('Configuration Error', {
          description: 'The email service is not configured. Please contact us via WhatsApp.',
        });
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...data,
          subject: `NepNex Technologies Contact Request - ${data.serviceInterested}`,
          from_name: data.name,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Project request sent! 🎉', {
          description: "Thanks for reaching out — we'll get back to you within 24 hours.",
          duration: 6000,
        });
        reset();
      } else {
        toast.error('Failed to send request', {
          description: result.message || 'Please try again later or use our WhatsApp number.',
        });
      }
    } catch (error) {
      toast.error('Network error', {
        description: 'Please check your internet connection and try again.',
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <Container className="relative z-10">
          <div ref={heroRef} className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left side text/CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20"
              >
                <Sparkles className="w-4 h-4 text-primary-300" />
                <span className="text-sm font-medium text-white/90">Let's Build Something Together</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Let's Build <br />
                <span className="text-primary-400">Something Together</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-secondary-300 max-w-xl"
              >
                Have an idea, project, or business challenge? Let's discuss how NepNex can help you build and grow digitally.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <a
                  href="https://wa.me/9779769729063"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold text-base hover:bg-[#20ba5a] transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <Phone className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <a
                  href="mailto:info.nepnex@gmail.com"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 text-white border border-white/20 font-semibold text-base hover:bg-white/20 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Email US
                </a>
              </motion.div>
            </div>

            {/* Right side interactive visual */}
            <div className="lg:col-span-6 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="relative w-full max-w-[450px] aspect-square rounded-3xl bg-gradient-to-tr from-primary-600/20 to-secondary-800/40 border border-white/10 flex items-center justify-center overflow-hidden"
              >
                {/* Simulated workspace interactive animations */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,150,219,0.15),transparent_70%)]" />

                {/* Floating particle systems */}
                {!reducedMotion && !isMobile && Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-primary-400/40"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}

                {/* Dashboard layout SVG */}
                <svg width="240" height="180" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-2xl">
                  {/* Laptop body */}
                  <rect x="30" y="20" width="180" height="120" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="3" />
                  <rect x="36" y="26" width="168" height="108" rx="4" fill="#0f172a" />
                  <rect x="20" y="140" width="200" height="10" rx="5" fill="#334155" />
                  <rect x="110" y="140" width="20" height="4" rx="2" fill="#475569" />

                  {/* AI Orbit Circle */}
                  <motion.circle
                    cx="120"
                    cy="80"
                    r="45"
                    stroke="rgba(18,150,219,0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Code Elements and Charts inside screen */}
                  <line x1="45" y1="40" x2="95" y2="40" stroke="#1296DB" strokeWidth="4" strokeLinecap="round" />
                  <line x1="45" y1="52" x2="115" y2="52" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                  <line x1="45" y1="64" x2="75" y2="64" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />

                  {/* Small floating node representing AI/Marketing charts */}
                  <motion.circle
                    cx="120"
                    cy="35"
                    r="6"
                    fill="#10B981"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="165"
                    cy="80"
                    r="6"
                    fill="#F59E0B"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </svg>

                {/* Floating tags */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-10 right-10 px-3 py-1.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-xs font-semibold text-white/80 flex items-center gap-1.5"
                >
                  <Laptop className="w-3.5 h-3.5 text-primary-400" />
                  Studio
                </motion.div>
              </motion.div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Form Section ────────────────────────────────────────────────── */}
      <Section className="py-20 bg-secondary-50">
        <Container>
          <div ref={formRef} className="grid lg:grid-cols-12 gap-12 sm:gap-16 items-start">

            {/* Left side details & location map */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 mb-4">NepNex Digital Studio</h2>
                <p className="text-secondary-600 leading-relaxed">
                  We partner with ambitious startups, forward-thinking small businesses, and global brands to engineer next-level digital products, campaigns, and identities.
                </p>
              </div>

              {/* Location Card with Map illustration */}
              <div className="p-6 rounded-2xl bg-white border border-secondary-200/60 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🇳🇵</span>
                  <h3 className="font-bold text-secondary-900">Based in Nepal</h3>
                </div>
                <p className="text-sm text-secondary-500 mb-6">
                  Serving clients locally and globally.
                </p>

                {/* Custom Nepal Map graphic representation */}
                <div className="w-full h-32 rounded-xl bg-secondary-50 border border-secondary-100 flex items-center justify-center relative overflow-hidden">
                  <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                    {/* Simplified geometric shape representing Nepal outline */}
                    <path d="M 10 30 Q 30 15 50 35 T 90 20 T 130 40 T 170 25 T 190 35 L 180 60 Q 140 55 100 65 T 20 50 Z" fill="#94a3b8" />
                  </svg>

                  {/* Glowing hotspot in Kathmandu */}
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-6 h-6 rounded-full bg-primary-500/30 flex items-center justify-center"
                    style={{ left: '55%', top: '45%' }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right side glassmorphic form card */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                className="bg-white/80 border border-secondary-200/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl shadow-secondary-900/5"
              >
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">Send Project Request</h3>
                <p className="text-secondary-500 mb-8 text-sm">Tell us about your business goals and service interests.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Name"
                      required
                      placeholder="Your name"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email"
                      required
                      type="email"
                      placeholder="you@example.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number (Optional)"
                      placeholder="e.g. +977..."
                      {...register('phone')}
                    />
                    <Input
                      label="Business Name (Optional)"
                      placeholder="Your company name"
                      {...register('businessName')}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-secondary-700 mb-2">Service Interested *</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-secondary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-secondary-800"
                      {...register('serviceInterested')}
                    >
                      <option value="">Select a service...</option>
                      <option value="Web Development">Web Development</option>
                      <option value="SEO">SEO</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Digital Advertising">Digital Advertising</option>
                      <option value="Creative Services">Creative Services</option>
                      <option value="AI & Coaching">AI & Coaching</option>
                    </select>
                    {errors.serviceInterested && (
                      <span className="text-xs text-red-500 mt-1">{errors.serviceInterested.message}</span>
                    )}
                  </div>

                  <Textarea
                    label="Message *"
                    required
                    placeholder="Tell us about your project, timeline, and goals..."
                    rows={5}
                    error={errors.message?.message}
                    {...register('message')}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    fullWidth
                    isLoading={isSubmitting}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    {isSubmitting ? 'Sending Request…' : 'Send Project Request'}
                  </Button>
                </form>
              </motion.div>
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}

export default ContactPage;
