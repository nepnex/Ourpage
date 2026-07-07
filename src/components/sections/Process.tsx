import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Target, Hammer, Rocket } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useReducedMotion } from '@/hooks';
import CountUp from 'react-countup';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'We dive deep into understanding your business, goals, audience, and competitive landscape to identify opportunities.',
    number: '01',
    stat: { value: 100, suffix: '%', label: 'Understanding' },
    color: '#1296DB',
    bg: 'rgba(18,150,219,0.1)',
    border: 'rgba(18,150,219,0.2)',
    glow: 'rgba(18,150,219,0.25)',
  },
  {
    icon: Target,
    title: 'Plan',
    description: 'Strategic roadmap creation with clear milestones, timelines, and deliverables tailored to your objectives.',
    number: '02',
    stat: { value: 48, suffix: 'h', label: 'Avg. Plan Time' },
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.1)',
    border: 'rgba(79,70,229,0.2)',
    glow: 'rgba(79,70,229,0.25)',
  },
  {
    icon: Hammer,
    title: 'Build',
    description: 'Agile development with regular updates, ensuring transparency and alignment throughout the process.',
    number: '03',
    stat: { value: 50, suffix: '+', label: 'Projects Built' },
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.2)',
    glow: 'rgba(16,185,129,0.25)',
  },
  {
    icon: Rocket,
    title: 'Grow',
    description: 'Launch, optimize, and scale with data-driven insights and continuous improvement strategies.',
    number: '04',
    stat: { value: 200, suffix: '%', label: 'Avg. Growth' },
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.1)',
    border: 'rgba(6,182,212,0.2)',
    glow: 'rgba(6,182,212,0.25)',
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
          // Stagger step activation
          steps.forEach((_, i) => {
            setTimeout(() => {
              setActiveStep(i);
              setLineProgress(((i + 1) / steps.length) * 100);
            }, 300 + i * 350);
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
      <div ref={sectionRef}>
        <SectionHeading
          label="Our Process"
          title="A Proven Approach to Digital Success"
          description="Our structured methodology ensures every project delivers maximum impact and value for your business."
        />

        <div className="relative">
          {/* ─── Connection Line (desktop) ─── */}
          <div className="hidden lg:block absolute top-[3.75rem] left-0 right-0 h-0.5 z-0">
            {/* Background track */}
            <div className="absolute inset-0 bg-secondary-200 rounded-full" />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hasStarted ? lineProgress / 100 : 0 }}
              transition={{ duration: 1.4, ease: [0.34, 1.06, 0.64, 1] }}
              style={{
                background: 'linear-gradient(90deg, #1296DB, #4F46E5, #10B981, #06B6D4)',
                width: '100%',
                boxShadow: '0 0 8px rgba(18,150,219,0.4)',
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {steps.map((step, index) => {
              const isActive = activeStep >= index;
              const Icon = step.icon;

              return (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  {/* ─── Icon circle ─── */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={
                      hasStarted
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0.6, opacity: 0 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: index * 0.18,
                      type: 'spring',
                      damping: 14,
                      stiffness: 200,
                    }}
                    className="relative z-10 mb-6"
                  >
                    <motion.div
                      animate={
                        isActive
                          ? { scale: [1, 1.06, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="relative w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center transition-all duration-400"
                      style={{
                        background: isActive ? step.bg : 'white',
                        border: `2px solid ${isActive ? step.color : '#e2e8f0'}`,
                        boxShadow: isActive
                          ? `0 0 0 4px ${step.glow}, 0 8px 24px ${step.glow}`
                          : '0 2px 8px rgba(0,0,0,0.06)',
                        transition: 'all 0.5s cubic-bezier(0.34, 1.06, 0.64, 1)',
                      }}
                    >
                      <Icon
                        className="w-7 h-7 transition-colors duration-300"
                        style={{ color: isActive ? step.color : '#94a3b8' }}
                      />

                      {/* Step number badge */}
                      <div
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-400"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)`
                            : '#e2e8f0',
                          color: isActive ? 'white' : '#94a3b8',
                          boxShadow: isActive ? `0 2px 8px ${step.glow}` : 'none',
                          transition: 'all 0.4s ease',
                        }}
                      >
                        {step.number}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* ─── Content ─── */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: index * 0.18 + 0.15 }}
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-secondary-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-secondary-500 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Animated stat counter */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{
                          background: step.bg,
                          color: step.color,
                          border: `1px solid ${step.border}`,
                        }}
                      >
                        <CountUp
                          end={step.stat.value}
                          duration={1.5}
                          suffix={step.stat.suffix}
                          enableScrollSpy={false}
                          startOnMount
                        />
                        <span className="ml-1 text-secondary-400 font-normal">{step.stat.label}</span>
                      </motion.div>
                    )}
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
