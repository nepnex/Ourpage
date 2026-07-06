import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button, Logo } from '@/components/ui';
import { useScrollPosition, useReducedMotion } from '@/hooks';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const scrollPosition = useScrollPosition();
  const reducedMotion = useReducedMotion();

  const isScrolled = scrollPosition > 20;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(255, 255, 255, 0)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
          boxShadow: isScrolled
            ? '0 1px 3px 0 rgba(0, 0, 0, 0.02)'
            : '0 0 0 0 rgba(0, 0, 0, 0)',
        }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-sticky"
      >
        <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div whileHover={reducedMotion ? {} : { scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Logo asLink size="sm" className="sm:hidden" />
              <Logo asLink size="md" className="hidden sm:flex" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} active={location.pathname === link.href}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right side CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="primary" size="md" asChild>
                <Link to="/book-consultation">Book Consultation</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="fixed inset-0 z-fixed lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-secondary-900/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={reducedMotion ? { x: 0 } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reducedMotion ? { x: 0 } : { x: '100%' }}
              transition={reducedMotion ? { duration: 0 } : { type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-secondary-100 shrink-0">
                <Logo asLink size="sm" className="sm:hidden" />
                <Logo asLink size="md" className="hidden sm:flex" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-secondary-600 hover:text-secondary-900"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="p-4 sm:p-6 overflow-y-auto flex-1">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={reducedMotion ? { duration: 0 } : { delay: index * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        className={`
                          block px-4 py-3 text-lg font-medium rounded-lg transition-colors
                          ${location.pathname === link.href
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50'
                          }
                        `}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={reducedMotion ? { duration: 0 } : { delay: 0.4 }}
                  className="mt-8"
                >
                  <Button variant="primary" size="lg" fullWidth asChild>
                    <Link to="/book-consultation">Book Consultation</Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <Link to={href} className="relative px-3 py-2 group">
      <span
        className={`
          text-sm font-medium transition-colors
          ${active
            ? 'text-primary-600'
            : 'text-secondary-600 group-hover:text-secondary-900'
          }
        `}
      >
        {children}
      </span>
      <motion.span
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scaleX: active ? 1 : 0,
        }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-primary-500 rounded-full"
      />
      <motion.span
        initial={false}
        animate={{
          opacity: active ? 0 : 0,
          scaleX: 0,
        }}
        whileHover={{ opacity: 0.3, scaleX: 1 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-secondary-300 rounded-full"
      />
    </Link>
  );
}
