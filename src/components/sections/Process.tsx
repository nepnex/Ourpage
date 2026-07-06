import { motion } from 'framer-motion';
import { Search, Target, Hammer, Rocket } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useInView, useReducedMotion } from '@/hooks';
import { staggerContainerVariants, staggerItemVariants, easeTransitions } from '@/utils/animations';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'We dive deep into understanding your business, goals, audience, and competitive landscape to identify opportunities.',
    number: '01',
  },
  {
    icon: Target,
    title: 'Plan',
    description: 'Strategic roadmap creation with clear milestones, timelines, and deliverables tailored to your objectives.',
    number: '02',
  },
  {
    icon: Hammer,
    title: 'Build',
    description: 'Agile development with regular updates, ensuring transparency and alignment throughout the process.',
    number: '03',
  },
  {
    icon: Rocket,
    title: 'Grow',
    description: 'Launch, optimize, and scale with data-driven insights and continuous improvement strategies.',
    number: '04',
  },
];

export function Process() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  return (
    <Section background="light">
      <div ref={inViewRef}>
      <SectionHeading
        label="Our Process"
        title="A Proven Approach to Digital Success"
        description="Our structured methodology ensures every project delivers maximum impact and value for your business."
      />

      <div className="relative">
        {/* Connection line */}
        <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-secondary-200">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-full bg-primary-500 origin-left"
          />
        </div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.title}
              variants={staggerItemVariants}
              transition={easeTransitions.smooth}
              className="relative"
            >
              <div className="text-center">
                {/* Icon circle */}
                <motion.div
                  whileHover={reducedMotion ? {} : { scale: 1.05 }}
                  className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border-2 border-primary-200 shadow-lg mb-6 z-10"
                >
                  <step.icon className="w-8 h-8 text-primary-600" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </motion.div>

                <h3 className="text-heading-md text-secondary-900 mb-3">{step.title}</h3>
                <p className="text-body-md text-secondary-500">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      </div>
    </Section>
  );
}
