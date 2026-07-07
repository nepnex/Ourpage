import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Megaphone, Target, Palette, Sparkles, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { Section, SectionHeading, Button } from '@/components/ui';
import { useInView, useReducedMotion } from '@/hooks';
import { Link } from 'react-router-dom';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';

const services = [
  {
    id: 'web-development',
    icon: Code,
    title: 'Web Development',
    description: 'Modern websites and web applications designed for speed, security, scalability, and exceptional user experience.',
    accent: '#1296DB',
    gradient: 'linear-gradient(135deg, rgba(18,150,219,0.1) 0%, rgba(6,182,212,0.05) 100%)',
    items: [
      'Business Websites', 'Portfolio Websites', 'Landing Pages', 
      'E-Commerce Development', 'Custom Web Applications', 'CMS Development', 
      'Website Maintenance', 'Performance Optimization'
    ]
  },
  {
    id: 'seo',
    icon: SearchIcon, // Custom or reused Search
    title: 'SEO',
    description: 'Improve your online visibility and attract qualified customers with search engine optimization.',
    accent: '#10B981',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%)',
    items: [
      'Technical SEO', 'On-Page SEO', 'Local SEO', 
      'Keyword Research', 'SEO Audits', 'Google Search Console Setup', 
      'Content Optimization', 'SEO Strategy'
    ]
  },
  {
    id: 'digital-marketing',
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Build your online presence and grow your business through strategic digital marketing.',
    accent: '#4F46E5',
    gradient: 'linear-gradient(135deg, rgba(79,70,229,0.1) 0%, rgba(139,92,246,0.05) 100%)',
    items: [
      'Social Media Marketing', 'Content Marketing', 'Email Marketing', 
      'Marketing Strategy', 'Content Planning', 'Community Management', 
      'Analytics & Reporting', 'Brand Growth'
    ]
  },
  {
    id: 'digital-advertising',
    icon: Target,
    title: 'Digital Advertising',
    description: 'Reach the right audience with data-driven advertising campaigns that maximize return on investment.',
    accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(239,68,68,0.05) 100%)',
    items: [
      'Google Ads', 'Meta Ads', 'Campaign Strategy', 
      'Lead Generation', 'Conversion Tracking', 'Remarketing', 
      'A/B Testing', 'Performance Reporting'
    ]
  },
  {
    id: 'creative-services',
    icon: Palette,
    title: 'Creative Services',
    description: 'Creative visual solutions that strengthen your brand identity and leave lasting impressions.',
    accent: '#8B5CF6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(236,72,153,0.05) 100%)',
    items: [
      'Logo Design', 'Brand Identity', 'Graphic Design', 
      'UI/UX Design', 'Social Media Creatives', 'Marketing Materials', 
      'Video Editing', 'Motion Graphics'
    ]
  },
  {
    id: 'ai-training',
    icon: Sparkles,
    title: 'AI & Training',
    description: 'Helping businesses and individuals embrace AI and modern digital technologies.',
    accent: '#06B6D4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.05) 100%)',
    items: [
      'AI Workshops', 'Prompt Engineering', 'ChatGPT Training', 
      'AI Workflow Automation', 'Web Development Coaching', 'Digital Marketing Coaching', 
      'Team Training', 'One-on-One Mentorship'
    ]
  }
];

function SearchIcon({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

export function OurServices() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  return (
    <Section>
      <div ref={inViewRef}>
        <SectionHeading
          label="Our Services"
          title="Comprehensive Digital Solutions"
          description="Everything you need to build, grow, and succeed in the digital world. Tailored solutions for forward-thinking businesses."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={staggerItemVariants}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const Icon = service.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="relative rounded-3xl bg-white border overflow-hidden group cursor-pointer h-full flex flex-col"
      style={{
        borderColor: 'rgba(0,0,0,0.06)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Hover gradient border / background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: service.gradient }}
      />

      <div className="p-6 sm:p-8 relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
            style={{ background: `${service.accent}15` }}
          >
            <Icon className="w-8 h-8" style={{ color: service.accent }} />
          </motion.div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary-50 text-secondary-500 group-hover:bg-white group-hover:shadow-sm transition-all"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        <h3 className="text-2xl font-bold text-secondary-900 mb-3">{service.title}</h3>
        <p className="text-secondary-500 leading-relaxed mb-6 flex-grow">{service.description}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-secondary-100 mt-2 mb-6">
                <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-4">
                  {service.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-secondary-700">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: service.accent }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto flex items-center justify-between pt-4">
          <Button variant="ghost" className="px-0 hover:bg-transparent" asChild>
            <Link to="/book-consultation" onClick={(e) => e.stopPropagation()} className="group/link flex items-center gap-2" style={{ color: service.accent }}>
              <span className="font-semibold">Book Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${service.accent}40` }}
      />
    </motion.div>
  );
}
