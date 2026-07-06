import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Button, Input, Textarea, Container, Section, SectionHeading } from '@/components/ui';
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from '@/utils/animations';
import { useInView } from '@/hooks';

// ─── Schema ───────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Contact Info Cards ───────────────────────────────────────────────────────

const contactChannels = [
  {
    id: 'whatsapp',
    icon: <Phone className="w-6 h-6" />,
    label: 'WhatsApp',
    value: '+977 9769729063',
    href: 'https://wa.me/9779769729063',
    color: 'bg-[#25D366]/10 text-[#25D366]',
    description: 'Chat with us instantly',
    external: true,
  },
  {
    id: 'email',
    icon: <Mail className="w-6 h-6" />,
    label: 'Email',
    value: 'info.nepnex@gmail.com',
    href: 'mailto:info.nepnex@gmail.com',
    color: 'bg-primary-50 text-primary-600',
    description: 'We reply within 24 hours',
    external: false,
  },
  {
    id: 'facebook',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    label: 'Facebook',
    value: 'NepNex Technologies',
    href: 'https://www.facebook.com/profile.php?id=61591334681411',
    color: 'bg-blue-50 text-blue-600',
    description: 'Follow us on Facebook',
    external: true,
  },
  {
    id: 'instagram',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    label: 'Instagram',
    value: '@nepnex7',
    href: 'https://www.instagram.com/nepnex_technologies/?utm_source=ig_web_button_share_sheet',
    color: 'bg-pink-50 text-pink-600',
    description: 'Follow us on Instagram',
    external: true,
  },
  {
    id: 'tiktok',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
      </svg>
    ),
    label: 'TikTok',
    value: '@nepnex7',
    href: 'https://www.tiktok.com/@nepnex7',
    color: 'bg-secondary-100 text-secondary-700',
    description: 'Find us on TikTok',
    external: true,
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactPage() {
  const [heroRef, heroInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
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
          subject: `NepNex Technologies Contact: ${data.subject}`,
          from_name: data.name,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Message sent! 🎉', {
          description: "Thanks for reaching out — we'll get back to you within 24 hours.",
          duration: 6000,
        });
        reset();
      } else {
        toast.error('Failed to send message', {
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
    <div className="bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 pt-8 pb-16 sm:pt-12 sm:pb-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>
        </div>
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl pointer-events-none"
        />

        <Container className="relative z-10">
          <div ref={heroRef} className="max-w-3xl mx-auto text-center px-4">
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
            >
              <motion.div variants={staggerItemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                  <MessageCircle className="w-4 h-4 text-primary-300" />
                  <span className="text-sm font-medium text-white/90">Get in Touch</span>
                </div>
              </motion.div>

              <motion.h1
                variants={staggerItemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
              >
                Contact NepNex Technologies
              </motion.h1>

              <motion.p
                variants={staggerItemVariants}
                className="text-base sm:text-lg text-secondary-300 mb-8 max-w-xl mx-auto"
              >
                Have a question or project in mind? We'd love to hear from you. Reach us through any
                of the channels below.
              </motion.p>

              {/* WhatsApp CTA */}
              <motion.div variants={staggerItemVariants}>
                <a
                  href="https://wa.me/9779769729063"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-base hover:bg-[#20ba5a] transition-colors shadow-lg shadow-[#25D366]/30"
                >
                  <Phone className="w-5 h-5" />
                  Need immediate assistance? Chat with us on WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Contact Channels ──────────────────────────────────────────────── */}
      <Section className="py-12 sm:py-16">
        <Container>
          <div ref={cardsRef}>
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={cardsInView ? 'visible' : 'hidden'}
              className="text-center mb-10"
            >
              <SectionHeading
                title="Reach Us Anywhere"
                description="Choose the channel that works best for you"
                align="center"
              />
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate={cardsInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {contactChannels.map((channel) => (
                <motion.a
                  key={channel.id}
                  href={channel.href}
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noopener noreferrer' : undefined}
                  variants={staggerItemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-secondary-100 bg-white hover:border-secondary-200 hover:shadow-lg hover:shadow-secondary-900/5 transition-all duration-200 group"
                >
                  <span className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${channel.color}`}>
                    {channel.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary-400 mb-0.5">
                      {channel.label}
                    </p>
                    <p className="text-sm font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors break-all">
                      {channel.value}
                    </p>
                    <p className="text-xs text-secondary-400 mt-0.5">{channel.description}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── Contact Form ──────────────────────────────────────────────────── */}
      <Section className="py-12 sm:py-16 bg-secondary-50">
        <Container>
          <div ref={formRef} className="max-w-xl mx-auto">
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              className="text-center mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-3">
                Send Us a Message
              </h2>
              <p className="text-secondary-500">
                Fill in the form and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              className="bg-white rounded-2xl border border-secondary-100 shadow-xl shadow-secondary-900/5 overflow-hidden"
            >
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      required
                      placeholder="Full name"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email Address"
                      required
                      type="email"
                      placeholder="you@example.com"
                      leftIcon={<Mail className="w-4 h-4" />}
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>
                  <Input
                    label="Subject"
                    required
                    placeholder="How can we help?"
                    error={errors.subject?.message}
                    {...register('subject')}
                  />
                  <Textarea
                    label="Message"
                    required
                    placeholder="Tell us about your project or question..."
                    rows={5}
                    maxCharacters={800}
                    error={errors.message?.message}
                    {...register('message')}
                  />
                </div>

                <div className="px-6 sm:px-8 py-5 bg-secondary-50 border-t border-secondary-100">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                    rightIcon={!isSubmitting ? <ArrowRight className="w-5 h-5" /> : undefined}
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── WhatsApp CTA Banner ───────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-[#25D366]">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Need immediate assistance?
              </h3>
              <p className="text-white/80 text-sm sm:text-base">
                Chat with us on WhatsApp — we're available and ready to help.
              </p>
            </div>
            <a
              href="https://wa.me/9779769729063"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-[#25D366] font-semibold text-base hover:bg-white/90 transition-colors shadow-md flex-shrink-0"
            >
              <Phone className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
