import { motion } from 'framer-motion';
import { Trophy, Users, Zap, Shield, Clock, HeartHandshake } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useInView } from '@/hooks';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';

const reasons = [
  {
    icon: Trophy,
    title: 'Premium Quality',
    description: 'We deliver world-class solutions that meet international standards and exceed expectations.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our talented professionals bring diverse expertise across design, development, and marketing.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Agile methodologies and efficient processes ensure timely project completion without compromising quality.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Security-first approach with robust infrastructure ensuring your digital assets are protected.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock support and maintenance to keep your digital presence running smoothly.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-First Approach',
    description: 'Your success is our success. We build lasting partnerships focused on mutual growth and trust.',
  },
];

export function WhyChooseUs() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  return (
    <Section>
      <div ref={inViewRef}>
      <SectionHeading
        label="Why NepNex Technologies"
        title="Why Choose Us"
        description="We combine creativity, technology, and strategy to deliver exceptional digital experiences that drive business growth."
      />

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
      >
        {reasons.map((reason) => (
          <motion.div
            key={reason.title}
            variants={staggerItemVariants}
            className="group"
          >
            <div className="relative p-5 sm:p-6 lg:p-8 rounded-2xl bg-white border border-secondary-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 h-full">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <reason.icon className="w-7 h-7" />
                </div>
                <h3 className="text-heading-md text-secondary-900 mb-3">{reason.title}</h3>
                <p className="text-body-md text-secondary-500">{reason.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </Section>
  );
}
