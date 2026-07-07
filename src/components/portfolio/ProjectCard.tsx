import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PortfolioProject } from '@/data/portfolio';

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-secondary-100 h-full"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
    >
      {/* Image Container with Zoom */}
      <Link to={`/portfolio/${project.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-secondary-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
      </Link>

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-30">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.services.slice(0, 2).map((service) => (
            <span
              key={service}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100"
            >
              {service}
            </span>
          ))}
          {project.services.length > 2 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-50 text-secondary-600 border border-secondary-100">
              +{project.services.length - 2}
            </span>
          )}
        </div>

        <Link to={`/portfolio/${project.slug}`} className="group/title block mb-3">
          <h3 className="text-2xl font-bold text-secondary-900 group-hover/title:text-primary-600 transition-colors flex items-center justify-between">
            {project.title}
            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:translate-y-0 transition-all duration-300" />
          </h3>
        </Link>
        
        <p className="text-secondary-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-secondary-100">
          {project.technologies.slice(0, 3).map((tech) => (
            <div key={tech} className="flex items-center gap-1.5 text-xs text-secondary-500 bg-secondary-50 px-2 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
