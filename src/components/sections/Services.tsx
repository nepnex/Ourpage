import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Megaphone, Palette, GraduationCap, Lightbulb, ArrowRight } from 'lucide-react';
import { Card, CardContent, Section, SectionHeading, Button } from '@/components/ui';
import { useInView } from '@/hooks';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Custom websites, web applications, and e-commerce platforms built with modern technologies for optimal performance and user experience.',
    color: 'bg-primary-50 text-primary-600',
    href: '/services#web-development',
    features: ['Business Websites', 'E-commerce', 'Web Applications'],
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Strategic SEO, social media marketing, and digital advertising campaigns that drive traffic, engagement, and conversions.',
    color: 'bg-accent-50 text-accent-600',
    href: '/services#digital-marketing',
    features: ['SEO', 'Social Media', 'Digital Ads'],
  },
  {
    icon: Palette,
    title: 'Creative Services',
    description:
      'Stunning graphic design, brand identity development, video editing, and motion graphics that bring your brand to life.',
    color: 'bg-warning/10 text-warning',
    href: '/services#creative-services',
    features: ['Graphic Design', 'Brand Identity', 'Motion Graphics'],
  },
  {
    icon: GraduationCap,
    title: 'Training & Coaching',
    description:
      'Comprehensive AI training, web development courses, and corporate workshops to empower teams with essential digital skills.',
    color: 'bg-success/10 text-success-600',
    href: '/services#training',
    features: ['AI Training', 'Dev Courses', 'Workshops'],
  },
  {
    icon: Lightbulb,
    title: 'Digital Strategy',
    description:
      'Expert business consultation, technology advisory, and AI strategy development to navigate digital transformation successfully.',
    color: 'bg-secondary-100 text-secondary-600',
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
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            variants={staggerItemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 sm:mt-12"
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

  return (
    <Link to={service.href} className="block h-full">
      <Card hoverable className="h-full group">
        <CardContent className="flex flex-col h-full">
          <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-7 h-7" />
          </div>

          <h3 className="text-heading-md text-secondary-900 mb-3">{service.title}</h3>
          <p className="text-body-md text-secondary-500 mb-6 flex-grow">{service.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="text-xs px-2 py-1 bg-secondary-50 text-secondary-600 rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors mt-auto">
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
