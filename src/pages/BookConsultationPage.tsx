import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowRight,
  Calendar,
  MessageCircle,
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  Briefcase,
  FileText,
  DollarSign,
  CheckSquare,
} from 'lucide-react';
import { Button, Input, Select, Textarea, Container, Section } from '@/components/ui';
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants } from '@/utils/animations';
import { useInView } from '@/hooks';

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const SERVICES = [
  'Web Development',
  'SEO',
  'Social Media Marketing',
  'Digital Advertising',
  'Graphic Design',
  'Video Editing',
  'AI & Web Coaching',
  'Not Sure Yet',
] as const;

const consultationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  companyName: z.string().optional(),
  website: z.string().optional(),
  industry: z.string().optional(),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  projectDetails: z.string().min(10, 'Please tell us a bit more about your project (min 10 characters)'),
  budget: z.string().optional(),
  contactMethod: z.enum(['WhatsApp', 'Email', 'Phone Call'], {
    error: 'Please select a preferred contact method',
  }),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

// ─── Industry Options ─────────────────────────────────────────────────────────

const industryOptions = [
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'healthcare', label: 'Healthcare & Wellness' },
  { value: 'education', label: 'Education & Training' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'tech', label: 'Technology & IT' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'fashion', label: 'Fashion & Apparel' },
  { value: 'nonprofit', label: 'Nonprofit & NGO' },
  { value: 'other', label: 'Other' },
];

const budgetOptions = [
  { value: 'under-50k', label: 'Under Rs. 50,000' },
  { value: '50k-200k', label: 'Rs. 50,000–Rs. 200,000' },
  { value: '200k-500k', label: 'Rs. 200,000–Rs. 500,000' },
  { value: '500k-plus', label: 'Rs. 500,000+' },
  { value: 'discuss', label: 'Prefer to Discuss' },
];

// ─── Form Section Header ──────────────────────────────────────────────────────

function FormSectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-secondary-100">
      <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
        {icon}
      </span>
      <h3 className="text-base font-semibold text-secondary-800">{title}</h3>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BookConsultationPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [heroRef, heroInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [formSectionRef, formInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      services: [],
      contactMethod: 'WhatsApp',
    },
  });

  const selectedServices = watch('services') ?? [];

  const onSubmit = async (data: ConsultationFormData) => {
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
          subject: `Consultation Request from ${data.fullName}`,
          from_name: data.fullName,
          Name: data.fullName,
          Email: data.email,
          Phone: data.phone || 'Not provided',
          Company: data.companyName || 'Not provided',
          Website: data.website || 'Not provided',
          Services: data.services.join(', '),
          ProjectDetails: data.projectDetails,
          Budget: budgetOptions.find((opt) => opt.value === data.budget)?.label || data.budget,
          PreferredContactMethod: data.contactMethod,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Consultation Request Sent! 🎉', {
          description: "We'll review your details and get back to you within 24 hours to schedule a time.",
          duration: 8000,
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 pt-8 pb-16 sm:pt-12 sm:pb-24"
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        {/* Blur blobs */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-accent-500/20 rounded-full blur-3xl pointer-events-none"
        />

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
            className="max-w-3xl mx-auto text-center px-4"
          >
            {/* Badge */}
            <motion.div variants={staggerItemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <Calendar className="w-4 h-4 text-primary-200" />
                <span className="text-sm font-medium text-white/90">Free Consultation</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={staggerItemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
            >
              Let's Build Your Digital Success Together
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={staggerItemVariants}
              className="text-base sm:text-lg lg:text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Book a free consultation with the NepNex Technologies team. We'll understand your business, discuss your goals, and
              recommend practical digital solutions tailored to your needs.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={staggerItemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto sm:px-8"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={scrollToForm}
              >
                Book Consultation
              </Button>
              <a
                href="https://wa.me/9779769729063"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-6 text-lg font-medium rounded-lg border border-white/30 text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────────── */}
      <div className="bg-secondary-50 border-b border-secondary-100 py-5">
        <Container>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-secondary-500 text-center">
            {[
              ['✅', 'Free & no obligation'],
              ['⚡', '24-hour response'],
              ['🎯', 'Tailored solutions'],
              ['🔒', 'Your info stays private'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2">
                <span className="text-base">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Form Section ──────────────────────────────────────────────────── */}
      <Section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div ref={formSectionRef} className="max-w-2xl mx-auto">
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              className="text-center mb-10 px-4"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-3">
                Tell us about your project
              </h2>
              <p className="text-secondary-500">
                Fill in the form below and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div
              ref={formRef}
              variants={fadeInUpVariants}
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              className="bg-white rounded-2xl border border-secondary-100 shadow-xl shadow-secondary-900/5 overflow-hidden"
            >
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="p-6 sm:p-8 space-y-8">

                  {/* ── Personal Information ───────────────────────────── */}
                  <fieldset>
                    <FormSectionHeader icon={<User className="w-4 h-4" />} title="Personal Information" />
                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        required
                        placeholder="e.g. Aashish Shrestha"
                        error={errors.fullName?.message}
                        {...register('fullName')}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Email Address"
                          required
                          type="email"
                          placeholder="you@example.com"
                          leftIcon={<Mail className="w-4 h-4" />}
                          error={errors.email?.message}
                          {...register('email')}
                        />
                        <Input
                          label="Phone Number"
                          required
                          type="tel"
                          placeholder="+977 98XXXXXXXX"
                          leftIcon={<Phone className="w-4 h-4" />}
                          error={errors.phone?.message}
                          {...register('phone')}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Business Information ───────────────────────────── */}
                  <fieldset>
                    <FormSectionHeader icon={<Building2 className="w-4 h-4" />} title="Business Information" />
                    <div className="space-y-4">
                      <Input
                        label="Company / Business Name"
                        placeholder="Your company name"
                        leftIcon={<Building2 className="w-4 h-4" />}
                        {...register('companyName')}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Website"
                          placeholder="https://yoursite.com (optional)"
                          leftIcon={<Globe className="w-4 h-4" />}
                          {...register('website')}
                        />
                        <Select
                          label="Industry"
                          placeholder="Select your industry"
                          options={industryOptions}
                          {...register('industry')}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Services Interested In ─────────────────────────── */}
                  <fieldset>
                    <FormSectionHeader
                      icon={<CheckSquare className="w-4 h-4" />}
                      title="Services Interested In"
                    />
                    {errors.services && (
                      <p className="text-sm text-error-600 mb-3" role="alert">
                        {errors.services.message}
                      </p>
                    )}
                    <Controller
                      name="services"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {SERVICES.map((service) => {
                            const isChecked = field.value.includes(service);
                            return (
                              <label
                                key={service}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-150 select-none ${
                                  isChecked
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-secondary-200 bg-white text-secondary-700 hover:border-secondary-300 hover:bg-secondary-50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={isChecked}
                                  onChange={() => {
                                    const next = isChecked
                                      ? field.value.filter((s) => s !== service)
                                      : [...field.value, service];
                                    field.onChange(next);
                                  }}
                                />
                                <span
                                  className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isChecked ? 'border-primary-500 bg-primary-500' : 'border-secondary-300'
                                  }`}
                                >
                                  {isChecked && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </span>
                                <span className="text-sm font-medium">{service}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    />
                    {selectedServices.length > 0 && (
                      <p className="mt-3 text-xs text-secondary-400">
                        {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
                      </p>
                    )}
                  </fieldset>

                  {/* ── Project Details ────────────────────────────────── */}
                  <fieldset>
                    <FormSectionHeader icon={<FileText className="w-4 h-4" />} title="Project Details" />
                    <Textarea
                      label="Tell us about your business, goals, or project requirements"
                      required
                      placeholder="Describe your project, goals, current challenges, or anything you'd like us to know before the consultation..."
                      rows={5}
                      maxCharacters={1000}
                      error={errors.projectDetails?.message}
                      {...register('projectDetails')}
                    />
                  </fieldset>

                  {/* ── Budget & Contact Method ────────────────────────── */}
                  <fieldset>
                    <FormSectionHeader icon={<DollarSign className="w-4 h-4" />} title="Budget & Preferences" />
                    <div className="space-y-5">
                      <Select
                        label="Budget (Optional)"
                        placeholder="Select a budget range"
                        options={budgetOptions}
                        {...register('budget')}
                      />

                      {/* Preferred Contact Method */}
                      <Controller
                        name="contactMethod"
                        control={control}
                        render={({ field }) => (
                          <div className="w-full space-y-1.5">
                            <label className="block text-sm font-medium text-secondary-700">
                              Preferred Contact Method
                              <span className="ml-0.5 text-error-500" aria-hidden="true">*</span>
                            </label>
                            {errors.contactMethod && (
                              <p className="text-sm text-error-600" role="alert">
                                {errors.contactMethod.message}
                              </p>
                            )}
                            <div className="flex flex-col sm:flex-row gap-3">
                              {(['WhatsApp', 'Email', 'Phone Call'] as const).map((method) => {
                                const isSelected = field.value === method;
                                return (
                                  <label
                                    key={method}
                                    className={`flex items-center gap-3 flex-1 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-150 select-none ${
                                      isSelected
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-secondary-200 bg-white text-secondary-700 hover:border-secondary-300 hover:bg-secondary-50'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      className="sr-only"
                                      checked={isSelected}
                                      onChange={() => field.onChange(method)}
                                    />
                                    <span
                                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                        isSelected ? 'border-primary-500' : 'border-secondary-300'
                                      }`}
                                    >
                                      {isSelected && (
                                        <span className="w-2 h-2 rounded-full bg-primary-500" />
                                      )}
                                    </span>
                                    <span className="text-sm font-medium">{method}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </fieldset>
                </div>

                {/* ── Form Footer ──────────────────────────────────────── */}
                <div className="px-6 sm:px-8 py-5 bg-secondary-50 border-t border-secondary-100">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                    rightIcon={!isSubmitting ? <ArrowRight className="w-5 h-5" /> : undefined}
                    className="sm:text-lg sm:h-14"
                  >
                    {isSubmitting ? 'Submitting…' : 'Book Free Consultation'}
                  </Button>
                  <p className="mt-3 text-xs text-secondary-400 text-center">
                    By submitting, you agree to our{' '}
                    <Link to="/privacy" className="underline hover:text-secondary-600 transition-colors">
                      Privacy Policy
                    </Link>
                    . We'll never share your information with third parties.
                  </p>
                </div>
              </form>
            </motion.div>

            {/* ── Alternative contact ───────────────────────────────── */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              className="mt-8 text-center"
            >
              <p className="text-sm text-secondary-500 mb-3">Prefer a quicker way to reach us?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/9779769729063"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#25D366] hover:text-[#128C7E] transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  +977 9769729063
                </a>
                <span className="hidden sm:block text-secondary-200">|</span>
                <a
                  href="mailto:info.nepnex@gmail.com"
                  className="inline-flex items-center gap-2 text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info.nepnex@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
