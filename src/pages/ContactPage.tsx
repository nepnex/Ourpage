import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { Button, Input, Textarea, Container, Section, PageHero3D } from '@/components/ui';
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
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          ...data,
          subject: `NepNex Technologies Contact Request - ${data.serviceInterested}`,
          from_name: data.name,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Request sent! 🎉', {
          description: "We'll get back to you within 24 hours.",
          duration: 6000,
        });
        reset();
      } else {
        toast.error('Failed to send', {
          description: result.message || 'Please try again or reach us on WhatsApp.',
        });
      }
    } catch {
      toast.error('Network error', {
        description: 'Check your internet connection and try again.',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | NepNex Technologies</title>
        <meta name="description" content="Get in touch with NepNex Technologies. Start your digital project — web development, SEO, digital marketing, AI solutions, and more." />
        <meta property="og:title" content="Contact Us | NepNex Technologies" />
        <meta property="og:description" content="Get in touch with NepNex Technologies. Start your digital project today." />
      </Helmet>

      <main>
        {/* ── Hero ── */}
        <PageHero3D
          theme="purple-pink"
          badge={<><Sparkles className="w-4 h-4" /> Let's Build Together</>}
          title={
            <>
              Have an Idea?{' '}
              <span className="text-cyan-300">Let's Make It Real.</span>
            </>
          }
          subtitle="Tell us about your project and we'll get back to you within 24 hours."
          actions={
            <>
              <a
                href="https://wa.me/9779769729063"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-base hover:bg-[#20ba5a] transition-all shadow-lg shadow-[#25D366]/30"
              >
                <Phone className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <a
                href="mailto:info.nepnex@gmail.com"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-white/10 text-white border border-white/25 font-semibold text-base hover:bg-white/20 transition-all"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </>
          }
        />

        {/* ── Form Section ── */}
        <Section className="py-20 sm:py-28" style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #f5f3ff 100%)' } as React.CSSProperties}>
          <Container>
            <div ref={formRef} className="grid lg:grid-cols-12 gap-12 items-start">

              {/* Left info column */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-3">NepNex Digital Studio</h2>
                  <p className="text-secondary-500 leading-relaxed">
                    We partner with businesses to build next-level digital products, campaigns, and identities.
                  </p>
                </div>

                {/* Contact Cards — 3D hover */}
                <div className="space-y-4" style={{ perspective: 600 }}>
                  {[
                    {
                      icon: Phone,
                      label: 'WhatsApp',
                      value: '+977 9769729063',
                      href: 'https://wa.me/9779769729063',
                      gradient: 'from-green-400 to-emerald-500',
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      value: 'info.nepnex@gmail.com',
                      href: 'mailto:info.nepnex@gmail.com',
                      gradient: 'from-blue-500 to-indigo-500',
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        whileHover={{ rotateY: 4, rotateX: -2, y: -4, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-secondary-100 shadow-sm group"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">{item.label}</p>
                          <p className="text-sm font-semibold text-secondary-800 group-hover:text-primary-600 transition-colors">{item.value}</p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Nepal location card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="p-5 rounded-2xl bg-white border border-secondary-100 shadow-sm overflow-hidden relative"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🇳🇵</span>
                    <h3 className="font-bold text-secondary-900">Based in Nepal</h3>
                  </div>
                  <p className="text-sm text-secondary-500 mb-4">Serving clients locally and globally.</p>
                  <div className="w-full h-28 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-secondary-100 flex items-center justify-center relative overflow-hidden">
                    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" className="opacity-30">
                      <path d="M 10 30 Q 30 15 50 35 T 90 20 T 130 40 T 170 25 T 190 35 L 180 60 Q 140 55 100 65 T 20 50 Z" fill="#94a3b8" />
                    </svg>
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-6 h-6 rounded-full bg-primary-500/30 flex items-center justify-center"
                      style={{ left: '55%', top: '45%' }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Right form column */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-10 shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-secondary-900 mb-1">Send Project Request</h3>
                  <p className="text-secondary-500 mb-8 text-sm">Tell us your goals and we'll create a custom plan.</p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input label="Name" required placeholder="Your name" error={errors.name?.message} {...register('name')} />
                      <Input label="Email" required type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input label="Phone (Optional)" placeholder="+977..." {...register('phone')} />
                      <Input label="Business Name (Optional)" placeholder="Your company" {...register('businessName')} />
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
                      {isSubmitting ? 'Sending…' : 'Send Project Request'}
                    </Button>
                  </form>
                </motion.div>
              </div>

            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}

export default ContactPage;
