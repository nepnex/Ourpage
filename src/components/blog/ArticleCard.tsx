import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blog';

interface ArticleCardProps {
  post: BlogPost;
  index: number;
}

export function ArticleCard({ post, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-secondary-100 h-full hover:shadow-lg transition-shadow duration-300"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
    >
      {/* Image Container with Zoom */}
      <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-secondary-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
      </Link>

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-30">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-secondary-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        <Link to={`/blog/${post.slug}`} className="group/title block mb-3">
          <h3 className="text-xl font-bold text-secondary-900 group-hover/title:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-secondary-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer Meta */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-secondary-100">
          <div className="flex items-center gap-2">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
            <div>
              <p className="text-xs font-semibold text-secondary-800">{post.author.name}</p>
              <p className="text-[10px] text-secondary-400">{post.date}</p>
            </div>
          </div>
          
          <Link to={`/blog/${post.slug}`} className="text-xs font-bold text-primary-600 group-hover:text-primary-700 flex items-center gap-1 transition-colors">
            Read More
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
