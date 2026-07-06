import { type Variants, type Transition } from 'framer-motion';

// ─── Spring Presets ───────────────────────────────────────────────────────────

export const springTransitions = {
  default: { type: 'spring', stiffness: 260, damping: 30 } as Transition,
  bouncy: { type: 'spring', stiffness: 400, damping: 25 } as Transition,
  stiff: { type: 'spring', stiffness: 500, damping: 40 } as Transition,
  gentle: { type: 'spring', stiffness: 150, damping: 20 } as Transition,
} as const;

export const easeTransitions = {
  smooth: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } as Transition,
  fast: { duration: 0.2, ease: 'easeOut' } as Transition,
  slow: { duration: 0.6, ease: 'easeOut' } as Transition,
} as const;

// ─── Fade Variants ────────────────────────────────────────────────────────────

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeTransitions.smooth },
  exit: { opacity: 0, transition: easeTransitions.fast },
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: easeTransitions.smooth },
  exit: { opacity: 0, y: 20, transition: easeTransitions.fast },
};

export const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: easeTransitions.smooth },
  exit: { opacity: 0, y: -20, transition: easeTransitions.fast },
};

export const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: easeTransitions.smooth },
  exit: { opacity: 0, x: -20, transition: easeTransitions.fast },
};

export const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: easeTransitions.smooth },
  exit: { opacity: 0, x: 20, transition: easeTransitions.fast },
};

// ─── Scale Variants ───────────────────────────────────────────────────────────

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: springTransitions.default },
  exit: { opacity: 0, scale: 0.95, transition: easeTransitions.fast },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { opacity: 1, scale: 1, transition: springTransitions.bouncy },
  exit: { opacity: 0, scale: 0.9 },
};

// ─── Stagger Variants ─────────────────────────────────────────────────────────

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFastContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransitions.default,
  },
};

// ─── Slide Variants ───────────────────────────────────────────────────────────

export const slideUpVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: springTransitions.default },
  exit: { y: '100%', opacity: 0, transition: easeTransitions.fast },
};

export const slideDownVariants: Variants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: springTransitions.default },
  exit: { y: '-100%', opacity: 0, transition: easeTransitions.fast },
};

// ─── Interactive Variants ─────────────────────────────────────────────────────

export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.03), 0 4px 12px -2px rgb(0 0 0 / 0.05)',
  },
  hover: {
    scale: 1.02,
    y: -6,
    boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.12)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export const buttonMotionVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.97 },
};

// ─── Float Variant ────────────────────────────────────────────────────────────

export const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// ─── Page Transition Variants ─────────────────────────────────────────────────

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

// ─── Draw Variant (SVG) ───────────────────────────────────────────────────────

export const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: 'easeOut' },
      opacity: { duration: 0.3 },
    },
  },
};



