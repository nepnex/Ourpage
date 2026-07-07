import { motion } from 'framer-motion';
import { ArrowRight, Code, Megaphone, Palette, Search, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@/components/ui';
import { fadeInUpVariants, easeTransitions } from '@/utils/animations';
import { useReducedMotion } from '@/hooks';
import { useEffect, useRef, useState, useCallback } from 'react';

const floatingIcons = [
  { icon: Code, color: '#1296DB', bg: 'rgba(18,150,219,0.1)', top: '15%', left: '10%', delay: 0 },
  { icon: Sparkles, color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', top: '25%', left: '80%', delay: 1.5 },
  { icon: Palette, color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', top: '65%', left: '15%', delay: 0.8 },
  { icon: Megaphone, color: '#4F46E5', bg: 'rgba(79,70,229,0.1)', top: '75%', left: '75%', delay: 2.2 },
  { icon: Search, color: '#10B981', bg: 'rgba(16,185,129,0.1)', top: '45%', left: '5%', delay: 1.2 },
  { icon: Terminal, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', top: '50%', left: '85%', delay: 0.5 },
];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

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
    if (!el || window.innerWidth < 768) return;
    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(18,150,219,0.12) 0%, rgba(79,70,229,0.05) 50%, transparent 100%)',
        }}
      />
      
      {/* Grid texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(18,150,219,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(18,150,219,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Mouse spotlight */}
      {!reducedMotion && window.innerWidth >= 768 && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(18,150,219,0.04), transparent 60%)`,
          }}
        />
      )}

      {/* Floating Icons */}
      {!reducedMotion && floatingIcons.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            className="absolute z-0 hidden md:flex items-center justify-center w-14 h-14 rounded-2xl backdrop-blur-md"
            style={{
              top: item.top,
              left: item.left,
              background: item.bg,
              border: `1px solid ${item.color}30`,
              boxShadow: `0 8px 32px ${item.color}15`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: item.color }} />
          </motion.div>
        );
      })}

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...easeTransitions.smooth, delay: 0 }}
            className="mb-6 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              Our Services
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...easeTransitions.smooth, delay: 0.1 }}
            className="heading-hero text-secondary-900 mb-6 sm:mb-8"
          >
            Digital Solutions That Drive{' '}
            <span className="text-gradient-hero relative">
              Real Business Growth
              <svg
                className="absolute -bottom-2 left-0 w-full overflow-visible"
                height="8"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 0 5 Q 50 1 100 5 Q 150 9 200 5"
                  fill="none"
                  stroke="url(#hero-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
                <defs>
                  <linearGradient id="hero-underline" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1296DB" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...easeTransitions.smooth, delay: 0.2 }}
            className="text-body-lg sm:text-body-xl text-secondary-500 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12"
          >
            From custom software and high-performance websites to SEO, digital marketing,
            branding, and AI-powered solutions, NepNex helps businesses build, grow, and succeed in the digital world.
          </motion.p>

          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...easeTransitions.smooth, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button size="xl" variant="primary" className="w-full sm:w-auto shadow-glow-primary" asChild>
                <Link to="/book-consultation">Book Free Consultation</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button size="xl" variant="outline" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-5 h-5" />} asChild>
                <a href="#services">Explore Services</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
