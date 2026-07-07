import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Megaphone, Palette, GraduationCap, Lightbulb, ArrowRight } from 'lucide-react';
import { Section, SectionHeading, Button } from '@/components/ui';
import { useInView } from '@/hooks';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Custom websites, web applications, and e-commerce platforms built with modern technologies for optimal performance and user experience.',
    accent: {
      color: '#1296DB',
      bg: 'rgba(18,150,219,0.08)',
      border: 'rgba(18,150,219,0.15)',
      glow: 'rgba(18,150,219,0.18)',
      gradient: 'linear-gradient(135deg, rgba(18,150,219,0.12) 0%, rgba(6,182,212,0.08) 100%)',
      tagBg: 'rgba(18,150,219,0.08)',
      tagText: '#1296DB',
    },
    href: '/services#web-development',
    features: ['Business Websites', 'E-commerce', 'Web Applications'],
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Strategic SEO, social media marketing, and digital advertising campaigns that drive traffic, engagement, and conversions.',
    accent: {
      color: '#4F46E5',
      bg: 'rgba(79,70,229,0.08)',
      border: 'rgba(79,70,229,0.15)',
      glow: 'rgba(79,70,229,0.18)',
      gradient: 'linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(139,92,246,0.08) 100%)',
      tagBg: 'rgba(79,70,229,0.08)',
      tagText: '#4F46E5',
    },
    href: '/services#digital-marketing',
    features: ['SEO', 'Social Media', 'Digital Ads'],
  },
  {
    icon: Palette,
    title: 'Creative Services',
    description:
      'Stunning graphic design, brand identity development, video editing, and motion graphics that bring your brand to life.',
    accent: {
      color: '#8B5CF6',
      bg: 'rgba(139,92,246,0.08)',
      border: 'rgba(139,92,246,0.15)',
      glow: 'rgba(139,92,246,0.18)',
      gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(245,158,11,0.06) 100%)',
      tagBg: 'rgba(139,92,246,0.08)',
      tagText: '#8B5CF6',
    },
    href: '/services#creative-services',
    features: ['Graphic Design', 'Brand Identity', 'Motion Graphics'],
  },
  {
    icon: GraduationCap,
    title: 'Training & Coaching',
    description:
      'Comprehensive AI training, web development courses, and corporate workshops to empower teams with essential digital skills.',
    accent: {
      color: '#10B981',
      bg: 'rgba(16,185,129,0.08)',
      border: 'rgba(16,185,129,0.15)',
      glow: 'rgba(16,185,129,0.18)',
      gradient: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.06) 100%)',
      tagBg: 'rgba(16,185,129,0.08)',
      tagText: '#10B981',
    },
    href: '/services#training',
    features: ['AI Training', 'Dev Courses', 'Workshops'],
  },
  {
    icon: Lightbulb,
    title: 'Digital Strategy',
    description:
      'Expert business consultation, technology advisory, and AI strategy development to navigate digital transformation successfully.',
    accent: {
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.15)',
      glow: 'rgba(245,158,11,0.18)',
      gradient: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(16,185,129,0.06) 100%)',
      tagBg: 'rgba(245,158,11,0.08)',
      tagText: '#d97706',
    },
    href: '/services#consulting',
    features: ['Consulting', 'Tech Advisory', 'AI Strategy'],
  },
];

export function Services() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  return (
    <Section background="light">
      <div ref={inViewRef}>
        <SectionHeading
          label="Our Services"
          title="Comprehensive Digital Solutions"
          description="From concept to execution, we deliver end-to-end digital services that transform your business and drive measurable results."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={staggerItemVariants}
              transition={{ delay: index * 0.08 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.55 }}
          className="text-center mt-10 sm:mt-14"
        >
          <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} asChild>
            <Link to="/services">Explore All Services</Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon;
  const { accent } = service;

  return (
    <Link to={service.href} className="block h-full group">
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="relative h-full rounded-2xl bg-white border overflow-hidden cursor-pointer"
        style={{
          borderColor: accent.border,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
          transition: 'box-shadow 0.35s ease',
        }}
        onHoverStart={(e) => {
          (e.target as HTMLElement).closest('.service-card-inner')?.setAttribute(
            'style',
            `box-shadow: 0 20px 48px ${accent.glow}, 0 4px 16px rgba(0,0,0,0.06)`
          );
        }}
      >
        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: accent.gradient }}
        />

        {/* Soft glow at top */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
          style={{ background: accent.color }}
        />

        <div className="relative p-6 sm:p-7 flex flex-col h-full">
          {/* Icon container */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative"
            style={{ background: accent.bg }}
          >
            <Icon className="w-7 h-7" style={{ color: accent.color }} />
            {/* Icon inner glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: `inset 0 0 12px ${accent.glow}` }}
            />
          </motion.div>

          <h3 className="text-lg font-semibold text-secondary-900 mb-3 group-hover:text-secondary-800 transition-colors">
            {service.title}
          </h3>
          <p className="text-body-sm text-secondary-500 mb-5 flex-grow leading-relaxed">
            {service.description}
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{ background: accent.tagBg, color: accent.tagText }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Animated Learn More */}
          <div className="flex items-center gap-1.5 font-medium text-sm mt-auto" style={{ color: accent.color }}>
            <span>Learn More</span>
            <motion.span
              className="flex items-center"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
