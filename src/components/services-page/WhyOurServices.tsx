import { motion } from 'framer-motion';
import { Target, Zap, BarChart } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useInView } from '@/hooks';

const philosophies = [
  {
    icon: Target,
    title: 'Strategy First',
    description: 'We begin with understanding your business before recommending solutions. Every strategy is tailored to your unique goals.',
    color: '#1296DB',
    gradient: 'linear-gradient(135deg, rgba(18,150,219,0.1) 0%, rgba(6,182,212,0.05) 100%)',
  },
  {
    icon: Zap,
    title: 'Modern Technology',
    description: 'We use modern frameworks, AI-powered workflows, and industry best practices to deliver fast, secure, scalable solutions.',
    color: '#4F46E5',
    gradient: 'linear-gradient(135deg, rgba(79,70,229,0.1) 0%, rgba(139,92,246,0.05) 100%)',
  },
  {
    icon: BarChart,
    title: 'Results Focused',
    description: 'Every service is designed to improve visibility, generate leads, and support long-term business growth with measurable ROI.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%)',
  },
];

export function WhyOurServices() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  return (
    <Section background="light">
      <div ref={inViewRef}>
        <SectionHeading
          label="Our Philosophy"
          title="Why Choose NepNex Services?"
          description="Every business is different. We don't believe in one-size-fits-all solutions. Every strategy, website, campaign, and creative asset is built around your business goals to deliver measurable digital growth."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {philosophies.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: [0.21, 1.02, 0.73, 1] }}
                className="relative p-8 rounded-3xl bg-white group overflow-hidden"
                style={{
                  boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                {/* Hover Gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: item.gradient }}
                />

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                  style={{ background: `${item.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: item.color }} />
                </motion.div>

                <h3 className="text-xl font-bold text-secondary-900 mb-3 relative z-10 group-hover:text-secondary-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-secondary-500 leading-relaxed relative z-10">
                  {item.description}
                </p>

                {/* Glow ring on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${item.color}30` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
