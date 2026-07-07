import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Section, Container, Button } from '@/components/ui';
import { fadeInUpVariants } from '@/utils/animations';
import { portfolioProjects, PortfolioProject } from '@/data/portfolio';

export function PortfolioDetailPage() {
  const { id } = useParams<{ id: string }>(); // 'id' here is actually the slug based on route setup
  const navigate = useNavigate();
  const [project, setProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    // Find project by slug
    const foundProject = portfolioProjects.find(p => p.slug === id);
    if (foundProject) {
      setProject(foundProject);
      window.scrollTo(0, 0);
    } else {
      // Navigate to 404 or back to portfolio if not found
      navigate('/portfolio', { replace: true });
    }
  }, [id, navigate]);

  if (!project) return null; // Or a loading spinner

  const relatedProjects = portfolioProjects
    .filter(p => p.id !== project.id && p.category.some(c => project.category.includes(c)))
    .slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{project.title} | NepNex Portfolio</title>
        <meta name="description" content={project.shortDescription} />
        <meta property="og:title" content={`${project.title} | NepNex`} />
        <meta property="og:description" content={project.shortDescription} />
        <meta property="og:image" content={project.image} />
        <meta property="og:type" content="article" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.description,
            "image": project.image,
            "author": {
              "@type": "Organization",
              "name": "NepNex Technologies"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nepnex.com" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://nepnex.com/portfolio" },
              { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://nepnex.com/portfolio/${project.slug}` }
            ]
          })}
        </script>
      </Helmet>

      <main className="bg-white min-h-screen pt-24 sm:pt-32">
        {/* Header / Hero */}
        <Container>
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-600 transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          
          <motion.div variants={fadeInUpVariants} initial="hidden" animate="visible" className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.category.map((cat) => (
                <span key={cat} className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100">
                  {cat}
                </span>
              ))}
            </div>
            
            <h1 className="heading-page text-secondary-900 mb-6">{project.title}</h1>
            <p className="text-xl text-secondary-600 leading-relaxed mb-12">
              {project.description}
            </p>
          </motion.div>
        </Container>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24"
        >
          <div className="aspect-[21/9] sm:aspect-[2.5/1] rounded-3xl overflow-hidden shadow-2xl relative">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
          </div>
        </motion.div>

        {/* Content Section */}
        <Section className="py-0 mb-20 sm:mb-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-16">
                {project.challenge && (
                  <motion.div variants={fadeInUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-secondary-900 mb-6">The Challenge</h2>
                    <p className="text-lg text-secondary-600 leading-relaxed">{project.challenge}</p>
                  </motion.div>
                )}
                
                {project.solution && (
                  <motion.div variants={fadeInUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Solution</h2>
                    <p className="text-lg text-secondary-600 leading-relaxed">{project.solution}</p>
                  </motion.div>
                )}

                {project.gallery && project.gallery.length > 0 && (
                  <motion.div variants={fadeInUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
                    {project.gallery.map((img, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden bg-secondary-100">
                        <img src={img} alt={`${project.title} screenshot ${idx + 1}`} className="w-full h-auto" loading="lazy" />
                      </div>
                    ))}
                  </motion.div>
                )}

                {project.outcomes && project.outcomes.length > 0 && (
                  <motion.div variants={fadeInUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-secondary-900 mb-6">Expected Outcomes</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {project.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-primary-50 border border-primary-100">
                          <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0" />
                          <span className="text-secondary-800 font-medium">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 p-8 rounded-3xl bg-secondary-50 border border-secondary-100">
                  <h3 className="text-xl font-bold text-secondary-900 mb-6">Project Details</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm font-semibold text-secondary-400 uppercase tracking-wider mb-3">Services Provided</h4>
                      <ul className="space-y-2">
                        {project.services.map(s => (
                          <li key={s} className="text-secondary-800 font-medium">{s}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-secondary-400 uppercase tracking-wider mb-3">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map(t => (
                            <span key={t} className="px-3 py-1.5 rounded-lg bg-white border border-secondary-200 text-secondary-700 text-sm font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {project.process && project.process.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-secondary-400 uppercase tracking-wider mb-3">Our Process</h4>
                        <ol className="space-y-3">
                          {project.process.map((step, idx) => (
                            <li key={step} className="flex items-center gap-3 text-secondary-700">
                              <span className="w-6 h-6 rounded-full bg-secondary-200 flex items-center justify-center text-xs font-bold text-secondary-600">{idx + 1}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    <div className="pt-8 border-t border-secondary-200">
                      <Button variant="primary" className="w-full" asChild>
                        <Link to="/book-consultation">Start a Similar Project</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </Section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <Section background="light" className="border-t border-secondary-200">
            <Container>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-secondary-900">Related Projects</h2>
                <Link to="/portfolio" className="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                  View All Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {relatedProjects.map(p => (
                  <Link key={p.id} to={`/portfolio/${p.slug}`} className="group block relative rounded-2xl overflow-hidden aspect-[16/9]">
                    <div className="absolute inset-0 bg-secondary-900/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
                    <div className="absolute bottom-0 left-0 p-8 z-30">
                      <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-white/80">{p.category.join(' • ')}</p>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 text-center sm:hidden">
                <Button variant="outline" asChild>
                  <Link to="/portfolio">View All Projects</Link>
                </Button>
              </div>
            </Container>
          </Section>
        )}
      </main>
    </>
  );
}

export default PortfolioDetailPage;
