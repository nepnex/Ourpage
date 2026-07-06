/**
 * NepNex Design Tokens
 * Single source of truth for all design values used across the system.
 * These mirror the Tailwind config and provide JS/TS access to tokens.
 */

// ─── Colors ───────────────────────────────────────────────────────────────────

export const colors = {
  primary: {
    50: '#e6f4fc',
    100: '#cce9f9',
    200: '#99d3f3',
    300: '#66bded',
    400: '#33a7e7',
    500: '#1296DB',
    600: '#0e78b0',
    700: '#0b5a85',
    800: '#073c5a',
    900: '#041e2f',
    950: '#020f17',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  success: { 500: '#22c55e', 600: '#16a34a' },
  warning: { 500: '#f59e0b', 600: '#d97706' },
  error: { 500: '#ef4444', 600: '#dc2626' },
  accent: { 500: '#06B6D4', 600: '#0891b2' },
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const fontFamily = {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  display: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
} as const;

export const fontSize = {
  'display-xl': '4.5rem',
  'display-lg': '3.75rem',
  'display-md': '3rem',
  'display-sm': '2.25rem',
  'heading-xl': '1.875rem',
  'heading-lg': '1.5rem',
  'heading-md': '1.25rem',
  'heading-sm': '1.125rem',
  'body-xl': '1.25rem',
  'body-lg': '1.125rem',
  'body-md': '1rem',
  'body-sm': '0.875rem',
  'body-xs': '0.75rem',
  label: '0.875rem',
  'label-sm': '0.75rem',
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  section: '5rem',
  'section-lg': '7.5rem',
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  DEFAULT: '0.5rem',
  md: '0.625rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.02)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
  DEFAULT: '0 2px 4px -1px rgb(0 0 0 / 0.04), 0 4px 6px -1px rgb(0 0 0 / 0.02)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.15)',
  card: '0 1px 3px 0 rgb(0 0 0 / 0.03), 0 4px 12px -2px rgb(0 0 0 / 0.05)',
  'card-hover': '0 8px 24px -4px rgb(0 0 0 / 0.08), 0 4px 8px -4px rgb(0 0 0 / 0.04)',
  glow: '0 0 20px rgb(18 150 219 / 0.3)',
  'glow-lg': '0 0 40px rgb(18 150 219 / 0.4)',
} as const;

// ─── Z-Index ──────────────────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// ─── Breakpoints ──────────────────────────────────────────────────────────────

export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ─── Transitions ──────────────────────────────────────────────────────────────

export const transitions = {
  fast: 'all 0.15s ease-out',
  DEFAULT: 'all 0.2s ease-out',
  smooth: 'all 0.3s ease-out',
  slow: 'all 0.5s ease-out',
  spring: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// ─── Animation Durations ─────────────────────────────────────────────────────

export const duration = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
} as const;

// ─── Opacity Levels ───────────────────────────────────────────────────────────

export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  100: '1',
} as const;

// ─── Blur Values ──────────────────────────────────────────────────────────────

export const blur = {
  xs: '2px',
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
} as const;
