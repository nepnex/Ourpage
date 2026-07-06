import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Megaphone,
  Palette,
  GraduationCap,
  Lightbulb,
  ChevronDown,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section, Container, Button, Badge } from '@/components/ui';
import { useInView, useReducedMotion } from '@/hooks';
import { fadeInUpVariants } from '@/utils/animations';

const serviceCategories = [
  {
    id: 'web-development',
    icon: Code,
    title: 'Web Development',
    description: 'Custom web solutions built with modern technologies for optimal performance and scalability.',
    color: 'bg-primary-50 text-primary-600',
    borderColor: 'border-primary-200',
    services: [
      {
        name: 'Business Websites',
        description: 'Professional websites that represent your brand and convert visitors into customers.',
        features: ['Custom Design', 'Responsive Layout', 'CMS Integration', 'SEO Optimized'],
      },
      {
        name: 'Corporate Websites',
        description: 'Enterprise-level web solutions with advanced functionality and integrations.',
        features: ['Multi-language Support', 'User Management', 'Advanced Analytics', 'API Integration'],
      },
      {
        name: 'Landing Pages',
        description: 'High-converting landing pages designed to capture leads and drive action.',
        features: ['A/B Testing Ready', 'Fast Loading', 'Conversion Optimized', 'Analytics Setup'],
      },
      {
        name: 'E-commerce Solutions',
        description: 'Full-featured online stores with secure payment processing and inventory management.',
        features: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Customer Dashboard'],
      },
      {
        name: 'Web Applications',
        description: 'Custom web applications built to streamline your business processes.',
        features: ['Custom Features', 'Database Design', 'API Development', 'Cloud Deployment'],
      },
      {
        name: 'Maintenance & Support',
        description: 'Ongoing support and updates to keep your website secure and performing optimally.',
        features: ['Security Updates', 'Performance Monitoring', 'Bug Fixes', 'Content Updates'],
      },
    ],
  },
  {
    id: 'digital-marketing',
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic marketing solutions that drive traffic, engagement, and conversions.',
    color: 'bg-accent-50 text-accent-600',
    borderColor: 'border-accent-200',
    services: [
      {
        name: 'Search Engine Optimization',
        description: 'Comprehensive SEO strategies to improve your visibility and organic rankings.',
        features: ['Keyword Research', 'On-page SEO', 'Technical SEO', 'Link Building'],
      },
      {
        name: 'Social Media Marketing',
        description: 'Engaging social media strategies that build community and brand awareness.',
        features: ['Content Strategy', 'Community Management', 'Analytics', 'Paid Campaigns'],
      },
      {
        name: 'Digital Advertising',
        description: 'Targeted advertising campaigns that deliver measurable results and ROI.',
        features: ['Google Ads', 'Facebook Ads', 'Retargeting', 'Performance Analytics'],
      },
    ],
  },
  {
    id: 'creative-services',
    icon: Palette,
    title: 'Creative Services',
    description: 'Stunning visual solutions that bring your brand to life and create lasting impressions.',
    color: 'bg-warning/10 text-warning',
    borderColor: 'border-warning/30',
    services: [
      {
        name: 'Graphic Design',
        description: 'Beautiful visual designs for all your marketing and communication needs.',
        features: ['Marketing Materials', 'Social Media Graphics', 'Infographics', 'Print Design'],
      },
      {
        name: 'Brand Identity',
        description: 'Complete brand identity design that sets you apart from competitors.',
        features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography'],
      },
      {
        name: 'Video Editing',
        description: 'Professional video editing services for marketing and communication.',
        features: ['Promotional Videos', 'Corporate Videos', 'Social Media Videos', 'Animation'],
      },
      {
        name: 'Motion Graphics',
        description: 'Engaging animated content that captures attention and tells your story.',
        features: ['Animated Logos', 'Explainer Videos', 'UI Animations', 'Social Media Animations'],
      },
    ],
  },
  {
    id: 'training',
    icon: GraduationCap,
    title: 'Training & Coaching',
    description: 'Empowering teams with essential digital skills and knowledge for the modern workplace.',
    color: 'bg-success/10 text-success-600',
    borderColor: 'border-success/30',
    services: [
      {
        name: 'AI Training',
        description: 'Comprehensive AI training programs to harness the power of artificial intelligence.',
        features: ['AI Fundamentals', 'Prompt Engineering', 'AI Tools Training', 'Implementation Strategy'],
      },
      {
        name: 'Web Development',
        description: 'Learn modern web development technologies and best practices.',
        features: ['Frontend Development', 'Backend Development', 'Database Management', 'Deployment'],
      },
      {
        name: 'Corporate Workshops',
        description: 'Customized workshops designed to upskill your team on digital technologies.',
        features: ['Custom Curriculum', 'Hands-on Projects', 'Certification', 'Ongoing Support'],
      },
    ],
  },
  {
    id: 'consulting',
    icon: Lightbulb,
    title: 'Digital Strategy & Consulting',
    description: 'Expert guidance to navigate digital transformation and achieve your business objectives.',
    color: 'bg-secondary-100 text-secondary-600',
    borderColor: 'border-secondary-200',
    services: [
      {
        name: 'Business Consultation',
        description: 'Strategic guidance to align digital initiatives with business goals.',
        features: ['Digital Assessment', 'Strategy Development', 'Roadmapping', 'KPI Definition'],
      },
      {
        name: 'Technology Consultation',
        description: 'Expert advice on technology selection and implementation.',
        features: ['Tech Stack Analysis', 'Vendor Selection', 'Architecture Design', 'Migration Planning'],
      },
      {
        name: 'AI Strategy',
        description: 'Develop a comprehensive AI strategy to transform your operations.',
        features: ['AI Readiness Assessment', 'Use Case Identification', 'Implementation Planning', 'ROI Analysis'],
      },
    ],
  },
];

export function ServicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>('web-development');

  return (
    <>
      {/* Hero Section */}
      <Section background="light" className="pt-8 sm:pt-12 lg:pt-16">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <Badge variant="primary" className="mb-4">Our Services</Badge>
          <h1 className="heading-page text-secondary-900 mb-4 sm:mb-6">
            Comprehensive Digital Solutions for Your Business
          </h1>
          <p className="text-body-md sm:text-body-lg lg:text-body-xl text-secondary-500">
            From web development to digital marketing, we offer end-to-end services
            designed to transform your business and drive growth in the digital age.
          </p>
        </motion.div>
      </Section>

      {/* Services List */}
      <Section>
        <Container>
          <div className="space-y-8">
            {serviceCategories.map((category, index) => (
              <ServiceCategory
                key={category.id}
                category={category}
                isExpanded={expandedId === category.id}
                onToggle={() => setExpandedId(expandedId === category.id ? null : category.id)}
                index={index}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" className="text-center">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          <h2 className="heading-section text-white mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-body-lg text-primary-100 mb-8">
            Let's discuss your project and find the perfect solution for your needs.
          </p>
          <Button
            variant="secondary"
            size="xl"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            asChild
          >
            <Link to="/book-consultation">Book Free Consultation</Link>
          </Button>
        </motion.div>
      </Section>
    </>
  );
}

interface ServiceCategoryProps {
  category: typeof serviceCategories[0];
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

function ServiceCategory({ category, isExpanded, onToggle, index }: ServiceCategoryProps) {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const Icon = category.icon;

  return (
    <motion.div
      ref={inViewRef}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      id={category.id}
      className="scroll-mt-24"
    >
      <div
        className={`
          rounded-2xl border-2 transition-all duration-300
          ${isExpanded ? 'bg-white' : 'bg-white/50'}
          ${category.borderColor}
        `}
      >
        {/* Header */}
        <button
          onClick={onToggle}
          className="w-full p-4 sm:p-6 flex items-start sm:items-center gap-3 sm:gap-4 text-left hover:bg-secondary-50/50 transition-colors rounded-t-2xl"
        >
          <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl ${category.color} flex items-center justify-center shrink-0`}>
            <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-heading-md sm:text-heading-lg text-secondary-900">{category.title}</h3>
            <p className="text-body-xs sm:text-body-sm text-secondary-500 mt-1 line-clamp-2 sm:line-clamp-none">{category.description}</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-secondary-600" />
          </motion.div>
        </button>

        {/* Services */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 sm:p-6 pt-0 border-t border-secondary-100">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {category.services.map((service, serviceIndex) => (
                    <motion.div
                      key={service.name}
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: serviceIndex * 0.05 }}
                      className="p-4 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors"
                    >
                      <h4 className="font-semibold text-secondary-900 mb-2">{service.name}</h4>
                      <p className="text-sm text-secondary-500 mb-3">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="text-xs px-2 py-1 bg-white rounded text-secondary-600 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-success-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-secondary-100 flex justify-center">
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    asChild
                  >
                    <Link to="/book-consultation">Discuss Your {category.title} Needs</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
