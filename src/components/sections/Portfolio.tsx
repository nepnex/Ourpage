import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Section, SectionHeading, Button } from '@/components/ui';
import { useInView, useReducedMotion } from '@/hooks';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';

const categoryAccent: Record<string, { color: string; bg: string; label: string }> = {
  'Web Development': { color: '#1296DB', bg: 'rgba(18,150,219,0.1)', label: 'Web Dev' },
  'Creative Services': { color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', label: 'Creative' },
  'Digital Marketing': { color: '#4F46E5', bg: 'rgba(79,70,229,0.1)', label: 'Marketing' },
};

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with inventory management and payment integration.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Brand Identity Design',
    category: 'Creative Services',
    description: 'Complete brand identity including logo, guidelines, and marketing collateral.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Branding', 'Design', 'Identity'],
  },
  {
    title: 'SEO Campaign',
    category: 'Digital Marketing',
    description: 'Comprehensive SEO strategy resulting in 200% increase in organic traffic.',
    image: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['SEO', 'Analytics', 'Content'],
  },
];

export function Portfolio() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  return (
    <Section>
      <div ref={inViewRef}>
        <SectionHeading
          label="Our Work"
          title="Featured Projects"
          description="Explore our portfolio of successful projects that showcase our expertise and commitment to excellence."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 sm:mt-16"
        >
          <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} asChild>
            <Link to="/portfolio">View All Projects</Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const reducedMotion = useReducedMotion();
  const accent = categoryAccent[project.category] ?? { color: '#1296DB', bg: 'rgba(18,150,219,0.1)', label: project.category };

  return (
    <motion.div variants={staggerItemVariants} transition={{ delay: index * 0.1 }}>
      <Link to={`/portfolio/${index + 1}`}>
        <motion.div
          whileHover={reducedMotion ? {} : { y: -10 }}
          transition={{ duration: 0.35, type: 'spring', damping: 20, stiffness: 280 }}
          className="group relative rounded-2xl overflow-hidden bg-white"
          style={{
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)',
            transition: 'box-shadow 0.35s ease',
          }}
        >
          {/* ─── Image ─── */}
          <div className="relative h-52 sm:h-56 lg:h-60 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay (always subtle, stronger on hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-secondary-900/20 to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Hover content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
              {/* Tech badges animate in */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="text-xs px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-white font-medium border border-white/20"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* View Project button */}
              <motion.div
                className="flex items-center gap-2 text-white text-sm font-semibold"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/25"
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                >
                  View Project
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            </div>

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm"
                style={{
                  background: `${accent.color}20`,
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {accent.label}
              </span>
            </div>
          </div>

          {/* ─── Content ─── */}
          <div className="p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-body-sm text-secondary-500 mb-4 leading-relaxed">{project.description}</p>

            {/* Tags (visible on mobile, hide on hover since overlay shows them) */}
            <div className="flex flex-wrap gap-2 sm:group-hover:opacity-50 transition-opacity duration-300">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{ background: accent.bg, color: accent.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hover glow border */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1.5px ${accent.color}30` }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
