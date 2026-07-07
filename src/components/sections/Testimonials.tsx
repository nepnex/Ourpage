import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useReducedMotion } from '@/hooks';

const testimonials = [
  {
    quote: "NepNex Technologies transformed our online presence completely. Their team delivered a stunning website that doubled our conversion rate within months. Truly professional and highly recommended.",
    author: 'Rajesh Sharma',
    role: 'CEO',
    company: 'Tech Solutions Nepal',
    avatar: 'RS',
    avatarColor: 'from-primary-500 to-cyan-500',
    rating: 5,
  },
  {
    quote: "The digital marketing strategy they created for us was game-changing. Our organic traffic increased by 200% and we're now ranking on the first page for our key terms.",
    author: 'Priya Maharjan',
    role: 'Marketing Director',
    company: 'Himalayan Ventures',
    avatar: 'PM',
    avatarColor: 'from-indigo-500 to-violet-500',
    rating: 5,
  },
  {
    quote: "Working with NepNex Technologies was a fantastic experience. They understood our vision perfectly and delivered a mobile app that our customers love. The support has been exceptional.",
    author: 'Anil Thapa',
    role: 'Founder',
    company: 'FoodExpress Nepal',
    avatar: 'AT',
    avatarColor: 'from-emerald-500 to-cyan-500',
    rating: 5,
  },
  {
    quote: "Their AI training program transformed our team's capabilities. We're now implementing AI solutions that save us hours of work every week. Great value and expertise.",
    author: 'Sunita KC',
    role: 'Operations Manager',
    company: 'Global Services Ltd',
    avatar: 'SK',
    avatarColor: 'from-violet-500 to-primary-500',
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, reducedMotion]);

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      scale: 0.97,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 0.97,
    }),
  };

  return (
    <Section background="light">
      <SectionHeading
        label="Testimonials"
        title="What Our Clients Say"
        description="Hear from businesses that have transformed their digital presence with NepNex Technologies."
      />

      <div className="relative max-w-4xl mx-auto">
        {/* ─── Large decorative quote mark ─── */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full text-[6rem] leading-none font-serif font-bold pointer-events-none select-none z-0"
          style={{ color: 'rgba(18,150,219,0.12)' }}
          aria-hidden="true"
        >
          "
        </div>

        {/* ─── Glass card ─── */}
        <div
          className="relative rounded-3xl overflow-hidden px-6 sm:px-10 md:px-16 py-10 sm:py-12"
          style={{
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 8px 40px rgba(18,150,219,0.08), 0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* Subtle gradient background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(18,150,219,0.05) 0%, transparent 70%)',
            }}
          />

          {/* ─── Slide content ─── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={reducedMotion ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.21, 1.02, 0.73, 1] }}
              className="text-center relative z-10"
            >
              {/* Star rating */}
              <div className="flex justify-center gap-1.5 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: i * 0.07,
                      type: 'spring',
                      damping: 10,
                      stiffness: 200,
                    }}
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    style={{ fill: '#F59E0B', filter: 'drop-shadow(0 1px 3px rgba(245,158,11,0.4))' }}
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </motion.svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg md:text-xl text-secondary-800 mb-8 leading-relaxed font-medium tracking-[-0.01em] px-0 sm:px-4">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col xs:flex-row items-center justify-center gap-4">
                {/* Avatar with gradient ring */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[current].avatarColor} flex items-center justify-center text-white text-lg font-bold`}
                    style={{ boxShadow: '0 2px 12px rgba(18,150,219,0.25)' }}
                  >
                    {testimonials[current].avatar}
                  </div>
                  {/* Online indicator */}
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white"
                    style={{ boxShadow: '0 0 6px rgba(16,185,129,0.5)' }}
                  />
                </div>

                <div className="text-center xs:text-left">
                  <div className="font-semibold text-secondary-900 text-base">{testimonials[current].author}</div>
                  <div className="text-sm text-secondary-500">
                    {testimonials[current].role}
                    <span className="mx-1.5 text-secondary-300">·</span>
                    <span className="text-primary-600 font-medium">{testimonials[current].company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ─── Desktop side navigation ─── */}
          <button
            onClick={prev}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-secondary-400 hover:text-primary-600 transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(18,150,219,0.12)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              backdropFilter: 'blur(8px)',
            }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-secondary-400 hover:text-primary-600 transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(18,150,219,0.12)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              backdropFilter: 'blur(8px)',
            }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ─── Mobile navigation ─── */}
        <div className="flex sm:hidden justify-center gap-3 mt-5">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white border border-secondary-200 text-secondary-500 hover:text-primary-600 hover:border-primary-200 flex items-center justify-center transition-all duration-200 shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white border border-secondary-200 text-secondary-500 hover:text-primary-600 hover:border-primary-200 flex items-center justify-center transition-all duration-200 shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ─── Dot indicators ─── */}
        <div className="flex justify-center gap-2 mt-5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className="relative h-2 rounded-full transition-all duration-400 overflow-hidden"
              style={{
                width: index === current ? '2rem' : '0.5rem',
                background: index === current ? 'transparent' : 'rgba(18,150,219,0.25)',
                transition: 'width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.2s',
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {index === current && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #1296DB, #4F46E5)' }}
                  layoutId="activeDot"
                  transition={{ duration: 0.35, type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
