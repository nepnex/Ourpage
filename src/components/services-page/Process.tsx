import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Target, PenTool, Code, Rocket, TrendingUp } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useReducedMotion } from '@/hooks';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'We understand your business, audience, and objectives to identify opportunities.',
    number: '1',
    color: '#1296DB',
    bg: 'rgba(18,150,219,0.1)',
  },
  {
    icon: Target,
    title: 'Strategy',
    description: 'We create a tailored roadmap with clear milestones for success.',
    number: '2',
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.1)',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'We craft intuitive and visually engaging user experiences.',
    number: '3',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    icon: Code,
    title: 'Develop',
    description: 'We build fast, secure, and scalable digital solutions.',
    number: '4',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'We test, deploy, and optimize everything for performance.',
    number: '5',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    description: 'We continue improving with marketing, SEO, analytics, and support.',
    number: '6',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.1)',
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [lineProgress, setLineProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) {
      if (reducedMotion) {
        setActiveStep(steps.length - 1);
        setLineProgress(100);
        setHasStarted(true);
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          steps.forEach((_, i) => {
            setTimeout(() => {
              setActiveStep(i);
              setLineProgress(((i + 1) / steps.length) * 100);
            }, 300 + i * 400);
          });
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Section background="light">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <SectionHeading
          label="Our Process"
          title="How We Work"
          description="A structured, results-driven methodology to turn your vision into a successful digital reality."
        />

        <div className="relative mt-16 sm:mt-24">
          {/* Timeline Line (Desktop) */}
          <div className="hidden lg:block absolute top-[3.5rem] left-0 right-0 h-1 z-0 bg-secondary-200 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hasStarted ? lineProgress / 100 : 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(90deg, #1296DB, #4F46E5, #8B5CF6, #10B981, #F59E0B, #06B6D4)',
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const isActive = activeStep >= index;
              const Icon = step.icon;

              return (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={hasStarted ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2, type: 'spring' }}
                    className="mb-6 relative"
                  >
                    <motion.div
                      animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                      className="w-24 h-24 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full flex items-center justify-center bg-white transition-all duration-500 relative z-10"
                      style={{
                        border: `3px solid ${isActive ? step.color : '#e2e8f0'}`,
                        boxShadow: isActive ? `0 0 20px ${step.color}40` : '0 4px 12px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Icon className="w-8 h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 transition-colors duration-500" style={{ color: isActive ? step.color : '#94a3b8' }} />
                      
                      {/* Step Number */}
                      <div
                        className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500"
                        style={{
                          background: isActive ? step.color : '#94a3b8',
                        }}
                      >
                        {step.number}
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                  >
                    <h3 className="text-lg font-bold text-secondary-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-secondary-500 leading-relaxed px-2">{step.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
