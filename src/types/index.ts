import { type ReactNode, type HTMLAttributes, type ButtonHTMLAttributes, type InputHTMLAttributes, type AnchorHTMLAttributes } from 'react';

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// Card Types
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  hoverable?: boolean;
  clickable?: boolean;
}

// Input Types
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Link Types
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted' | 'accent';
  external?: boolean;
}

// Badge Types
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

// Section Heading Types
export interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

// Service Card Types
export interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  features?: string[];
}

// Portfolio Card Types
export interface PortfolioCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  href: string;
  tags?: string[];
}

// Testimonial Types
export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
}

// Pricing Card Types
export interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
}

// FAQ Types
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
  className?: string;
}

// CTA Types
export interface CTAProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  className?: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Animation Types
export interface AnimationConfig {
  delay?: number;
  duration?: number;
  ease?: string;
}

// Common Types
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export interface PageProps {
  SEO?: SEOProps;
}
