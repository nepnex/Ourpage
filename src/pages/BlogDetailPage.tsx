import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Send, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Container, Section, Button, Input } from '@/components/ui';
import { fadeInUpVariants } from '@/utils/animations';
import { blogPosts, BlogPost } from '@/data/blog';
import { toast } from 'sonner';

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>(); // route param is slug/id
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === id);
    if (foundPost) {
      setPost(foundPost);
      window.scrollTo(0, 0);
    } else {
      navigate('/blog', { replace: true });
    }
  }, [id, navigate]);

  if (!post) return null;

  const relatedArticles = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article from NepNex: ${post.title}`;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
    toast.success('Link shared! 🎉');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Subscribed! Welcome to Insights.');
    setEmail('');
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | NepNex Insights</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | NepNex Insights`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author.name
            },
            "publisher": {
              "@type": "Organization",
              "name": "NepNex Technologies",
              "logo": {
                "@type": "ImageObject",
                "url": "https://nepnex.com/logo.png"
              }
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepnex.com" },
              { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://nepnex.com/blog" },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://nepnex.com/blog/${post.slug}` }
            ]
          })}
        </script>
      </Helmet>

      <main className="bg-white min-h-screen pt-24 sm:pt-32">
        <Container>
          <Link to="/blog" className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-600 transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          
          <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-sm text-secondary-400">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 mb-8 leading-tight">{post.title}</h1>
            
            {/* Author details */}
            <div className="flex items-center gap-4 mb-12">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-secondary-900 font-bold">{post.author.name}</p>
                <p className="text-sm text-secondary-500">{post.author.role} • {post.date}</p>
              </div>
            </div>
          </motion.div>
        </Container>

        {/* Cover Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl relative">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Article Content Layout */}
        <Section className="py-0 mb-20">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              
              {/* Sidebar/Table of Contents */}
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-32 space-y-8">
                  <div>
                    <h3 className="text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-4">Table of Contents</h3>
                    <ul className="space-y-3 text-sm font-medium text-secondary-500">
                      <li><a href="#introduction" className="hover:text-primary-600 transition-colors">Introduction</a></li>
                      <li><a href="#key-points" className="hover:text-primary-600 transition-colors">Key Points</a></li>
                      <li><a href="#summary" className="hover:text-primary-600 transition-colors">Summary</a></li>
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-secondary-100">
                    <h3 className="text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-4">Share Article</h3>
                    <div className="flex gap-2">
                      <button onClick={() => handleShare('twitter')} className="p-2 rounded-lg bg-secondary-50 hover:bg-primary-50 hover:text-primary-600 transition-all text-secondary-500">
                        <Twitter className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleShare('facebook')} className="p-2 rounded-lg bg-secondary-50 hover:bg-primary-50 hover:text-primary-600 transition-all text-secondary-500">
                        <Facebook className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleShare('linkedin')} className="p-2 rounded-lg bg-secondary-50 hover:bg-primary-50 hover:text-primary-600 transition-all text-secondary-500">
                        <Linkedin className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-9">
                <article className="prose prose-secondary max-w-none prose-lg">
                  {/* Simplistic renderer for content. Real site might use markdown-to-jsx or react-markdown */}
                  <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                </article>
                
                {/* Newsletter CTA */}
                <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-secondary-900 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent pointer-events-none" />
                  <div className="relative z-10 max-w-lg">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">Subscribe to NepNex Insights</h3>
                    <p className="text-secondary-300 text-sm sm:text-base mb-8">
                      Get practical technology articles and marketing growth strategies delivered straight to your inbox once a week.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                      <Input
                        required
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20"
                      />
                      <Button type="submit" variant="primary" rightIcon={<Send className="w-4 h-4" />}>
                        Subscribe
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </Section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <Section background="light" className="border-t border-secondary-200">
            <Container>
              <h2 className="text-3xl font-bold text-secondary-900 mb-12">Related Insights</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedArticles.map(p => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="group block bg-white border border-secondary-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold px-2 py-1 bg-primary-50 text-primary-700 rounded-md">{p.category}</span>
                      <h3 className="text-xl font-bold text-secondary-900 mt-3 group-hover:text-primary-600 transition-colors">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        )}
      </main>
    </>
  );
}

export default BlogDetailPage;
