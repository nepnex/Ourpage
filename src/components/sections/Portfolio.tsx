import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Section, SectionHeading, Button } from '@/components/ui';
import { useInView, useReducedMotion } from '@/hooks';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with inventory management and payment integration.',
    image: 'https://images.pexels.com/photo-1460925895917-afdabcc27347?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Brand Identity Design',
    category: 'Creative Services',
    description: 'Complete brand identity including logo, guidelines, and marketing collateral.',
    image: 'https://images.pexels.com/photo-1558655146-9f4068d52944?auto=compress&cs=tinysrgb&w=800',
    tags: ['Branding', 'Design', 'Identity'],
  },
  {
    title: 'SEO Campaign',
    category: 'Digital Marketing',
    description: 'Comprehensive SEO strategy resulting in 200% increase in organic traffic.',
    image: 'https://images.pexels.com/photo-1460925895917-afdabcc27347?auto=compress&cs=tinysrgb&w=800',
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
        className="text-center mt-12"
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

  return (
    <motion.div variants={staggerItemVariants} transition={{ delay: index * 0.1 }}>
      <Link to={`/portfolio/${index + 1}`}>
        <motion.div
          whileHover={reducedMotion ? {} : { y: -8 }}
          transition={{ duration: 0.3 }}
          className="group"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white border border-secondary-100 hover:border-primary-200 transition-all duration-300">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="flex items-center gap-1 text-white text-sm font-medium">
                  View Project <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-heading-md text-secondary-900 mt-2 mb-2 group-hover:text-primary-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-body-sm text-secondary-500 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-secondary-50 text-secondary-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
