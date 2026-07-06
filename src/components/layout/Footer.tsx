import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { Container, Logo } from '@/components/ui';
import { useReducedMotion } from '@/hooks';

// ─── Quick Links ──────────────────────────────────────────────────────────────

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book Consultation', href: '/book-consultation' },
];

const serviceLinks = [
  { label: 'Web Development', href: '/services#web-development' },
  { label: 'SEO', href: '/services#seo' },
  { label: 'Social Media Marketing', href: '/services#social-media' },
  { label: 'Digital Advertising', href: '/services#digital-advertising' },
  { label: 'Graphic Design', href: '/services#graphic-design' },
  { label: 'Video Editing', href: '/services#video-editing' },
  { label: 'AI & Web Coaching', href: '/services#ai-coaching' },
];

// ─── Social Icons ─────────────────────────────────────────────────────────────

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61591334681411',
    icon: 'facebook',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nepnex_technologies/?utm_source=ig_web_button_share_sheet',
    icon: 'instagram',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@nepnex7',
    icon: 'tiktok',
  },
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const reducedMotion = useReducedMotion();

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer */}
      <div className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

            {/* ── Brand Column ─────────────────────────────────────── */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Logo asLink size="md" variant="light" className="mb-6" />
              <p className="text-secondary-400 text-sm leading-relaxed mb-6">
                Building Digital Success. Helping businesses grow through web development,
                digital marketing, creative design, and AI-powered solutions.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <a
                  href="https://wa.me/9779769729063"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-secondary-400 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 group-hover:text-primary-400 flex-shrink-0" />
                  <span>+977 9769729063</span>
                </a>
                <a
                  href="mailto:info.nepnex@gmail.com"
                  className="flex items-center gap-3 text-secondary-400 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:text-primary-400 flex-shrink-0" />
                  <span className="break-all">info.nepnex@gmail.com</span>
                </a>
              </div>
            </div>

            {/* ── Quick Links ──────────────────────────────────────── */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary-300 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-secondary-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Services ─────────────────────────────────────────── */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary-300 mb-4">
                Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-secondary-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact ──────────────────────────────────────────── */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary-300 mb-4">
                Contact
              </h4>
              <ul className="space-y-3 text-sm mb-6">
                <li>
                  <a
                    href="https://wa.me/9779769729063"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-secondary-400 hover:text-white transition-colors group"
                  >
                    <Phone className="w-4 h-4 mt-0.5 group-hover:text-primary-400 flex-shrink-0" />
                    <div>
                      <p className="text-secondary-500 text-xs mb-0.5">WhatsApp</p>
                      <span>+977 9769729063</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info.nepnex@gmail.com"
                    className="flex items-start gap-3 text-secondary-400 hover:text-white transition-colors group"
                  >
                    <Mail className="w-4 h-4 mt-0.5 group-hover:text-primary-400 flex-shrink-0" />
                    <div>
                      <p className="text-secondary-500 text-xs mb-0.5">Email</p>
                      <span className="break-all">info.nepnex@gmail.com</span>
                    </div>
                  </a>
                </li>
              </ul>

              {/* Social Media */}
              <h5 className="text-xs font-semibold uppercase tracking-wider text-secondary-300 mb-3">
                Follow Us
              </h5>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reducedMotion ? {} : { y: -2 }}
                    className="w-9 h-9 rounded-lg bg-secondary-800 flex items-center justify-center text-secondary-400 hover:text-white hover:bg-secondary-700 transition-colors"
                    aria-label={social.label}
                  >
                    <SocialIcon name={social.icon} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-secondary-800">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 sm:py-6 text-center sm:text-left">
            <p className="text-sm text-secondary-500">
              © {new Date().getFullYear()} NepNex Technologies. All rights reserved.
            </p>
            <p className="text-sm text-secondary-500">
              Building Digital Success 🚀
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

// ─── Social Icon SVGs ─────────────────────────────────────────────────────────

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'facebook':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
        </svg>
      );
    default:
      return null;
  }
}
