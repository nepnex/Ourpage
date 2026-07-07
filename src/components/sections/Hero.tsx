import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    textColor: '#1296DB',
    bgColor: 'rgba(18,150,219,0.1)',
  },
  'SEO': {
    color: '#10B981',
    gradient: 'from-emerald-500 to-emerald-600',
    textColor: '#10B981',
    bgColor: 'rgba(16,185,129,0.1)',
  },
  'Digital Marketing': {
    color: '#4F46E5',
    gradient: 'from-indigo-500 to-indigo-600',
    textColor: '#4F46E5',
    bgColor: 'rgba(79,70,229,0.1)',
  },
  'AI Solutions': {
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-cyan-600',
    textColor: '#06B6D4',
    bgColor: 'rgba(6,182,212,0.1)',
  },
  'Graphic Design': {
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-violet-600',
    textColor: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.1)',
  },
  'Video Editing': {
    color: '#F59E0B',
    gradient: 'from-amber-500 to-amber-600',
    textColor: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.1)',
  },
} as const;

// Floating achievement cards data
const floatingCards = [
  { label: '50+ Projects', sub: 'Delivered', color: '#1296DB', icon: '🚀', delay: 0 },
  { label: '100% Satisfaction', sub: 'Client Rating', color: '#10B981', icon: '⭐', delay: 1.5 },
  { label: '24/7 Support', sub: 'Always Available', color: '#4F46E5', icon: '💬', delay: 0.8 },
];

export function Hero() {
  const [scene, setScene] = useState<Scene>(1);
  const reducedMotion = useReducedMotion();
  const { width } = useWindowSize();
  const isCompact = width > 0 && width < 1024;
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [underlineVisible, setUnderlineVisible] = useState(false);

  // Mouse-follow spotlight
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current || reducedMotion) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [reducedMotion]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

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

  // Show animated underline after final content appears
  useEffect(() => {
    if (scene === 8 || scene === 9) {
      const t = setTimeout(() => setUnderlineVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [scene]);

  const showNetwork = scene === 1;
  const showWireframe = scene === 2;
  const showWebsite = scene === 3;
  const showAnalytics = scene === 4;
  const showGraph = scene === 5;
  const showOrbit = scene === 6;
  const showConvergence = scene === 7;
  const showFinal = scene === 8 || scene === 9;

  return (
    <section
      ref={heroRef}
      className="relative min-h-0 lg:min-h-screen flex items-center overflow-hidden bg-white"
    >
      <HeroBackground
        showParticles={!isCompact}
        showGrid={true}
        showRadialGlow={true}
        particleIntensity="light"
      />

      {/* ─── Mouse-follow spotlight ─── */}
      {!reducedMotion && !isCompact && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(18,150,219,0.05), transparent 60%)`,
          }}
        />
      )}

      {/* ─── Logo animated glow (desktop) ─── */}
      {!isCompact && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 25% 50%, rgba(18,150,219,0.06) 0%, transparent 70%)',
          }}
        />
      )}

      <div className="relative z-10 w-full">
        <Container size="xl" className="py-10 sm:py-14 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-20">

            {/* ─── Left: Text content ─── */}
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
                    {/* Logo with glow */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex justify-center lg:justify-start"
                    >
                      <div className="relative">
                        {/* Animated glow behind logo */}
                        <div
                          className="absolute inset-0 -m-4 rounded-full blur-2xl animate-logo-glow pointer-events-none"
                          style={{ background: 'rgba(18,150,219,0.15)' }}
                        />
                        <Logo size="md" className="sm:hidden relative" />
                        <Logo size="lg" className="hidden sm:flex relative" />
                      </div>
                    </motion.div>

                    {/* Headline with animated underline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="heading-hero text-secondary-900"
                    >
                      Building Nepal's{' '}
                      <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-400 bg-clip-text text-transparent">
                          Digital Future 🇳🇵
                        </span>
                        {/* Animated underline SVG */}
                        <svg
                          className="absolute -bottom-1 left-0 w-full overflow-visible"
                          height="6"
                          viewBox="0 0 200 6"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <motion.path
                            d="M 0 3 Q 50 0.5 100 3 Q 150 5.5 200 3"
                            fill="none"
                            stroke="url(#underline-gradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={underlineVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 0.9, ease: [0.34, 1.06, 0.64, 1], delay: 0.1 }}
                          />
                          <defs>
                            <linearGradient id="underline-gradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#1296DB" />
                              <stop offset="50%" stopColor="#4F46E5" />
                              <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-body-md sm:text-body-lg lg:text-body-xl text-secondary-500 leading-relaxed max-w-lg mx-auto lg:mx-0"
                    >
                      Transform your business with Nepal's leading software development,
                      digital marketing, creative design, and AI-powered solutions.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 justify-center lg:justify-start w-full sm:w-auto"
                    >
                      <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full sm:w-auto"
                          rightIcon={<ArrowRight className="w-5 h-5" />}
                          asChild
                        >
                          <Link to="/book-consultation">Get Started</Link>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
                    </motion.div>

                    {/* Service icon pills */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="flex flex-wrap gap-2 sm:gap-2.5 pt-4 sm:pt-6 justify-center lg:justify-start"
                    >
                      {[
                        { label: 'Web', icon: <Code className="w-3.5 h-3.5" />, style: SERVICE_STYLES['Web Development'] },
                        { label: 'SEO', icon: <Search className="w-3.5 h-3.5" />, style: SERVICE_STYLES['SEO'] },
                        { label: 'Marketing', icon: <Target className="w-3.5 h-3.5" />, style: SERVICE_STYLES['Digital Marketing'] },
                        { label: 'Design', icon: <Palette className="w-3.5 h-3.5" />, style: SERVICE_STYLES['Graphic Design'] },
                        { label: 'Video', icon: <Video className="w-3.5 h-3.5" />, style: SERVICE_STYLES['Video Editing'] },
                        { label: 'AI', icon: <Sparkles className="w-3.5 h-3.5" />, style: SERVICE_STYLES['AI Solutions'] },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -10, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.85 + i * 0.07,
                            type: 'spring',
                            damping: 15,
                            stiffness: 200,
                          }}
                          whileHover={{ y: -3, scale: 1.05 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-default"
                          style={{
                            background: item.style.bgColor,
                            border: `1px solid ${item.style.color}25`,
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }}
                        >
                          <span style={{ color: item.style.color }}>
                            {item.icon}
                          </span>
                          <span className="text-xs text-secondary-600 font-semibold">{item.label}</span>
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
                        <>Building{' '}<span className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-400 bg-clip-text text-transparent">Digital Success.</span></>
                      )}
                      {scene === 2 && (
                        <>From Idea to{' '}<span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">Reality</span></>
                      )}
                      {scene === 3 && (
                        <>Your Vision,{' '}<span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">Live</span></>
                      )}
                      {scene === 4 && (
                        <>Real{' '}<span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">Results</span></>
                      )}
                      {scene === 5 && (
                        <>Growth{' '}<span className="bg-gradient-to-r from-cyan-500 to-primary-500 bg-clip-text text-transparent">Engineered</span></>
                      )}
                      {scene === 6 && (
                        <>Complete{' '}<span className="bg-gradient-to-r from-primary-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Solutions</span></>
                      )}
                      {scene === 7 && (
                        <>Everything{' '}<span className="bg-gradient-to-r from-violet-500 via-primary-500 to-cyan-500 bg-clip-text text-transparent">Connected</span></>
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

            {/* ─── Right: Animated visuals (desktop) ─── */}
            <div className="hidden lg:block flex-1 max-w-xl w-full relative">
              {/* Floating glass achievement cards */}
              {showFinal && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.2 }}
                    className="absolute -left-16 top-8 z-20 animate-card-float-1"
                  >
                    <FloatingCard card={floatingCards[0]} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.5 }}
                    className="absolute -right-8 bottom-16 z-20 animate-card-float-2"
                  >
                    <FloatingCard card={floatingCards[1]} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.8 }}
                    className="absolute -right-12 top-4 z-20 animate-float-c"
                  >
                    <FloatingCard card={floatingCards[2]} />
                  </motion.div>
                </>
              )}

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
                      <AnimatedGraph width={320} height={150} delay={0.2} className="w-full max-w-sm" />
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
                      <ServiceOrbit orbitRadius={110} showLabels={true} delay={0} className="scale-90" />
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

        {/* ─── Scroll indicator ─── */}
        {showFinal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
            onClick={() => {
              const next = document.querySelector('section + div, section ~ section');
              next?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-xs text-secondary-400 font-medium tracking-widest uppercase group-hover:text-primary-500 transition-colors">Scroll</span>
            <div
              className="w-6 h-9 rounded-full border-2 border-secondary-300 group-hover:border-primary-400 flex items-start justify-center pt-1.5 transition-colors"
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-secondary-400 group-hover:bg-primary-500 transition-colors"
                animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}

        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

// ─── Floating Glass Card ──────────────────────────────────────────────────────

function FloatingCard({ card }: { card: typeof floatingCards[0] }) {
  return (
    <div
      className="px-4 py-3 rounded-2xl min-w-[140px]"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.08), 0 2px 8px ${card.color}20, inset 0 1px 0 rgba(255,255,255,0.9)`,
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${card.color}15` }}
        >
          {card.icon}
        </div>
        <div>
          <div className="text-sm font-bold text-secondary-900 whitespace-nowrap">{card.label}</div>
          <div className="text-xs text-secondary-400 font-medium">{card.sub}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Convergence Animation ────────────────────────────────────────────────────

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
