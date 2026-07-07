import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.21, 1.02, 0.73, 1] }}
      className={`max-w-3xl mb-10 sm:mb-14 lg:mb-18 px-1 ${alignmentClasses[align]} ${className}`}
    >
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`mb-4 ${align === 'center' ? 'flex justify-center' : ''}`}
        >
          <span className="label-pill">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1296DB, #4F46E5)' }}
            />
            {label}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="heading-section text-secondary-900 text-balance"
      >
        {title}
      </motion.h2>

      {/* Animated accent line below title */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className={`mt-3 h-0.5 w-12 rounded-full ${align === 'center' ? 'mx-auto' : ''} ${align === 'right' ? 'ml-auto' : ''}`}
        style={{
          background: 'linear-gradient(90deg, #1296DB, #4F46E5)',
          transformOrigin: align === 'right' ? 'right' : 'left',
        }}
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 sm:mt-5 text-body-md sm:text-body-lg text-secondary-500 text-balance leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
