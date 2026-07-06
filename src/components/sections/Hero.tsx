import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Code, Search, Target, Palette, Video, Sparkles } from 'lucide-react';
import { useReducedMotion, useWindowSize } from '@/hooks';
import { Button, Container, Logo } from '@/components/ui';

import {
  HeroBackground,
  NetworkDot,
  NetworkLine,
  NetworkVisualization,
  WebsiteBuilder,
  FloatingAnalyticsCards,
  AnimatedGraph,
  ServiceOrbit,
} from '@/components/hero';

const CYCLE_DURATION = 28000;

type Scene = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const SCENE_DURATIONS: Record<Scene, number> = {
  1: 2500,
  2: 2800,
  3: 2000,
  4: 3000,
  5: 3000,
  6: 2800,
  7: 3500,
  8: 3000,
  9: CYCLE_DURATION - (2500 + 2800 + 2000 + 3000 + 3000 + 2800 + 3500 + 3000),
};

// Service color configuration
const SERVICE_STYLES = {
  'Web Development': {
    color: '#1296DB',
    gradient: 'from-primary-500 to-cyan-500',
    textColor: 'text-primary-500',
    bgColor: 'bg-primary-50',
  },
  'SEO': {
    color: '#10B981',
    gradient: 'from-emerald-500 to-emerald-600',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  'Digital Marketing': {
    color: '#4F46E5',
    gradient: 'from-indigo-500 to-indigo-600',
    textColor: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  'AI Solutions': {
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-cyan-600',
    textColor: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
  },
  'Graphic Design': {
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-violet-600',
    textColor: 'text-violet-500',
    bgColor: 'bg-violet-50',
  },
  'Video Editing': {
    color: '#F59E0B',
    gradient: 'from-amber-500 to-amber-600',
    textColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
} as const;

export function Hero() {
  const [scene, setScene] = useState<Scene>(1);
  const reducedMotion = useReducedMotion();
  const { width } = useWindowSize();
  const isCompact = width > 0 && width < 1024;

  useEffect(() => {
    if (reducedMotion || isCompact) {
      setScene(9);
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let totalDelay = 0;

    const scenes: Scene[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    scenes.forEach((s, i) => {
      if (i === 0) return;
      totalDelay += SCENE_DURATIONS[scenes[i - 1] as Scene] || 0;

      const timeout = setTimeout(() => {
        setScene(s);
      }, totalDelay);

      timeouts.push(timeout);
    });

    const loopInterval = setInterval(() => {
      setScene(1);
    }, CYCLE_DURATION);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(loopInterval);
    };
  }, [reducedMotion, isCompact]);

  const showNetwork = scene === 1;
  const showWireframe = scene === 2;
  const showWebsite = scene === 3;
  const showAnalytics = scene === 4;
  const showGraph = scene === 5;
  const showOrbit = scene === 6;
  const showConvergence = scene === 7;
  const showFinal = scene === 8 || scene === 9;

  return (
    <section className="relative min-h-0 lg:min-h-screen flex items-center overflow-hidden bg-white">
      <HeroBackground
        showParticles={!isCompact}
        showGrid={true}
        showRadialGlow={true}
        particleIntensity="light"
      />

      <div className="relative z-10 w-full">
        <Container size="xl" className="py-10 sm:py-14 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-20">
            <div className="flex-1 w-full max-w-2xl text-center lg:text-left">
              <AnimatePresence mode="wait">
                {showFinal && (
                  <motion.div
                    key="final-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    className="space-y-5 sm:space-y-6 lg:space-y-8"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex justify-center lg:justify-start"
                    >
                      <Logo size="md" className="sm:hidden" />
                      <Logo size="lg" className="hidden sm:flex" />
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="heading-hero text-secondary-900"
                    >
                      Building Nepal's{' '}
                      <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-400 bg-clip-text text-transparent">
                        Digital Future 🇳🇵
                      </span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-body-md sm:text-body-lg lg:text-body-xl text-secondary-500 leading-relaxed max-w-lg mx-auto lg:mx-0"
                    >
                      Transform your business with Nepal's leading software development,
                      digital marketing, creative design, and AI-powered solutions.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 justify-center lg:justify-start w-full sm:w-auto"
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto"
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                        asChild
                      >
                        <Link to="/book-consultation">Get Started</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                        leftIcon={<Calendar className="w-5 h-5" />}
                        asChild
                      >
                        <Link to="/book-consultation">Book Consultation</Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="flex flex-wrap gap-2 sm:gap-3 pt-4 sm:pt-6 justify-center lg:justify-start"
                    >
                      {[
                        { label: 'Web', icon: <Code className="w-4 h-4" />, style: SERVICE_STYLES['Web Development'] },
                        { label: 'SEO', icon: <Search className="w-4 h-4" />, style: SERVICE_STYLES['SEO'] },
                        { label: 'Marketing', icon: <Target className="w-4 h-4" />, style: SERVICE_STYLES['Digital Marketing'] },
                        { label: 'Design', icon: <Palette className="w-4 h-4" />, style: SERVICE_STYLES['Graphic Design'] },
                        { label: 'Video', icon: <Video className="w-4 h-4" />, style: SERVICE_STYLES['Video Editing'] },
                        { label: 'AI', icon: <Sparkles className="w-4 h-4" />, style: SERVICE_STYLES['AI Solutions'] },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
                          className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-white/70 backdrop-blur-sm border border-secondary-100/80
                            shadow-sm hover:shadow-md transition-all duration-300
                            cursor-pointer group
                          `}
                        >
                          <span className={`${item.style.textColor} group-hover:scale-110 transition-transform`}>
                            {item.icon}
                          </span>
                          <span className="text-sm text-secondary-600 font-medium">{item.label}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {!showFinal && (
                  <motion.div
                    key="animating-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <motion.h1
                      key={`headline-${scene}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-heading-lg sm:text-display-sm lg:text-display-lg xl:text-display-xl text-secondary-900 leading-tight"
                    >
                      {scene === 1 && (
                        <>
                          Building{' '}
                          <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-400 bg-clip-text text-transparent">
                            Digital Success.
                          </span>
                        </>
                      )}
                      {scene === 2 && (
                        <>
                          From Idea to{' '}
                          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                            Reality
                          </span>
                        </>
                      )}
                      {scene === 3 && (
                        <>
                          Your Vision,{' '}
                          <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                            Live
                          </span>
                        </>
                      )}
                      {scene === 4 && (
                        <>
                          Real{' '}
                          <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                            Results
                          </span>
                        </>
                      )}
                      {scene === 5 && (
                        <>
                          Growth{' '}
                          <span className="bg-gradient-to-r from-cyan-500 to-primary-500 bg-clip-text text-transparent">
                            Engineered
                          </span>
                        </>
                      )}
                      {scene === 6 && (
                        <>
                          Complete{' '}
                          <span className="bg-gradient-to-r from-primary-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                            Solutions
                          </span>
                        </>
                      )}
                      {scene === 7 && (
                        <>
                          Everything{' '}
                          <span className="bg-gradient-to-r from-violet-500 via-primary-500 to-cyan-500 bg-clip-text text-transparent">
                            Connected
                          </span>
                        </>
                      )}
                    </motion.h1>

                    <motion.p
                      key={`subheadline-${scene}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="text-body-md sm:text-body-lg lg:text-body-xl text-secondary-500"
                    >
                      {scene === 1 && 'We craft digital experiences that drive business growth'}
                      {scene === 2 && 'Watch your website come to life'}
                      {scene === 3 && 'Beautiful, fast, and ready for growth'}
                      {scene === 4 && 'Track your success in real-time'}
                      {scene === 5 && 'Data-driven optimization for maximum impact'}
                      {scene === 6 && 'All the services you need in one place'}
                      {scene === 7 && 'Seamless integration for unified success'}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden lg:block flex-1 max-w-xl w-full relative">
              <div className="relative aspect-square max-h-[min(90vw,28rem)] mx-auto">
                <AnimatePresence mode="sync">
                  {showNetwork && (
                    <motion.div
                      key="network-scene"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="relative w-64 h-64">
                        <NetworkDot delay={0} size={12} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <NetworkLine length={120} angle={-45} delay={0.2} className="absolute left-1/2 top-1/2 origin-center" />
                        <NetworkLine length={100} angle={30} delay={0.3} className="absolute left-1/2 top-1/2 origin-center" />
                        <NetworkLine length={90} angle={150} delay={0.35} className="absolute left-1/2 top-1/2 origin-center" />
                        <NetworkLine length={80} angle={-120} delay={0.4} className="absolute left-1/2 top-1/2 origin-center" />
                        <NetworkLine length={95} angle={80} delay={0.45} className="absolute left-1/2 top-1/2 origin-center" />
                        <NetworkVisualization nodeCount={6} connectionDistance={100} className="scale-110" />
                      </div>
                    </motion.div>
                  )}

                  {showWireframe && (
                    <motion.div
                      key="wireframe-scene"
                      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <WebsiteBuilder delay={0} onComplete={() => {}} />
                    </motion.div>
                  )}

                  {showWebsite && (
                    <motion.div
                      key="website-live"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <WebsiteBuilder delay={0} />
                    </motion.div>
                  )}

                  {showAnalytics && (
                    <motion.div
                      key="analytics-scene"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 flex items-center justify-center scale-90"
                    >
                      <div className="relative w-full">
                        <motion.div
                          animate={{ x: [0, -20, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="scale-75 origin-center"
                        >
                          <WebsiteBuilder delay={0} />
                        </motion.div>
                        <FloatingAnalyticsCards className="scale-75" />
                      </div>
                    </motion.div>
                  )}

                  {showGraph && (
                    <motion.div
                      key="graph-scene"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <AnimatedGraph
                        width={320}
                        height={150}
                        delay={0.2}
                        className="w-full max-w-sm"
                      />
                    </motion.div>
                  )}

                  {showOrbit && (
                    <motion.div
                      key="orbit-scene"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85, y: 30 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <ServiceOrbit
                        orbitRadius={110}
                        showLabels={true}
                        delay={0}
                        className="scale-90"
                      />
                    </motion.div>
                  )}

                  {showConvergence && (
                    <motion.div
                      key="convergence-scene"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <ConvergenceAnimation />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

function ConvergenceAnimation() {
  const services = [
    { icon: <Code className="w-6 h-6" />, label: 'Web Dev', color: '#1296DB' },
    { icon: <Search className="w-6 h-6" />, label: 'SEO', color: '#10B981' },
    { icon: <Target className="w-6 h-6" />, label: 'Digital Ads', color: '#4F46E5' },
    { icon: <Palette className="w-6 h-6" />, label: 'Design', color: '#8B5CF6' },
    { icon: <Video className="w-6 h-6" />, label: 'Video', color: '#F59E0B' },
    { icon: <Sparkles className="w-6 h-6" />, label: 'AI', color: '#06B6D4' },
  ];

  return (
    <div className="relative w-64 h-64">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
        <defs>
          <filter id="glow-hero" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {services.map((service, i) => {
          const startAngle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
          const startX = 128 + Math.cos(startAngle) * 100;
          const startY = 128 + Math.sin(startAngle) * 100;

          return (
            <motion.line
              key={`line-${i}`}
              x1={startX}
              y1={startY}
              x2={128}
              y2={128}
              stroke={service.color}
              strokeWidth="1.5"
              filter="url(#glow-hero)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
            />
          );
        })}

        <motion.circle
          cx={128}
          cy={128}
          r={40}
          fill="none"
          stroke="url(#convergenceGradient)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />

        <defs>
          <linearGradient id="convergenceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1296DB" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {services.map((service, i) => {
          const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
          const startX = 128 + Math.cos(angle) * 100;
          const startY = 128 + Math.sin(angle) * 100;

          return (
            <motion.g
              key={`icon-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <motion.circle
                cx={startX}
                cy={startY}
                r={24}
                fill="white"
                stroke={service.color}
                strokeWidth="1.5"
                initial={{ r: 0 }}
                animate={{ r: 24 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
              />
              <foreignObject
                x={startX - 12}
                y={startY - 12}
                width={24}
                height={24}
                style={{ color: service.color }}
              >
                {service.icon}
              </foreignObject>
            </motion.g>
          );
        })}
      </svg>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full shadow-lg shadow-primary-500/30 flex items-center justify-center relative overflow-hidden"
        >
          <img src="/nepnex-logo.png" alt="" className="w-16 h-16 object-contain" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
