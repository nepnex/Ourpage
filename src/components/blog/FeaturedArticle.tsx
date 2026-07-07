import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blog';

interface FeaturedArticleProps {
  post: BlogPost;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 1.02, 0.73, 1] }}
      className="group relative grid lg:grid-cols-12 gap-8 items-center rounded-3xl overflow-hidden bg-white border border-secondary-100 p-6 sm:p-8 mb-16"
      style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}
    >
      {/* Image Block */}
      <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto lg:h-[400px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-secondary-900/10 z-10" />
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
        />
      </div>

      {/* Content Block */}
      <div className="lg:col-span-5 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
            Featured
          </span>
          <span className="text-xs font-semibold text-secondary-500">{post.category}</span>
          <span className="text-xs text-secondary-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>

        <Link to={`/blog/${post.slug}`} className="group/title">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 group-hover/title:text-primary-600 transition-colors mb-4 leading-tight">
            {post.title}
          </h2>
        </Link>

        <p className="text-secondary-650 text-sm sm:text-base leading-relaxed mb-6">
          {post.description}
        </p>

        {/* Author / CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-secondary-100 mt-auto">
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-secondary-900">{post.author.name}</p>
              <p className="text-xs text-secondary-400">{post.date}</p>
            </div>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary-900 hover:bg-secondary-800 text-white font-semibold text-sm transition-all duration-300 shadow-sm"
          >
            Read Article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
