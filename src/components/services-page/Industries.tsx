import { motion } from 'framer-motion';
import { Briefcase, Building2, Coffee, GraduationCap, HeartPulse, Home, Plane, ShoppingBag, Globe, Users, Laptop } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useInView } from '@/hooks';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';

const industries = [
  { icon: Briefcase, name: 'Startups', color: '#1296DB' },
  { icon: Building2, name: 'Small Businesses', color: '#4F46E5' },
  { icon: Coffee, name: 'Restaurants', color: '#F59E0B' },
  { icon: GraduationCap, name: 'Education', color: '#10B981' },
  { icon: HeartPulse, name: 'Healthcare', color: '#E11D48' },
  { icon: Home, name: 'Real Estate', color: '#06B6D4' },
  { icon: Plane, name: 'Travel & Tourism', color: '#8B5CF6' },
  { icon: ShoppingBag, name: 'E-Commerce', color: '#D946EF' },
  { icon: Globe, name: 'NGOs', color: '#14B8A6' },
  { icon: Users, name: 'Professional Services', color: '#6366F1' },
  { icon: Laptop, name: 'Technology Companies', color: '#3B82F6' },
];

export function Industries() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  return (
    <Section>
      <div ref={inViewRef} className="max-w-6xl mx-auto">
        <SectionHeading
          label="Industries"
          title="Industries We Help Grow"
          description="We deliver customized digital solutions across various sectors, understanding the unique challenges and opportunities of your specific industry."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                variants={staggerItemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-white border cursor-pointer overflow-hidden transition-all duration-300"
                style={{
                  borderColor: 'rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                }}
              >
                {/* Hover gradient background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${industry.color}, transparent)` }}
                />

                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${industry.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: industry.color }} />
                </div>
                
                <h3 className="text-sm font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                  {industry.name}
                </h3>
                
                {/* Subtle border glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${industry.color}40` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
