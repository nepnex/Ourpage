import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, CheckCircle2, Star, Shield, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Section, Button, PageHero3D } from '@/components/ui';
import { useInView } from '@/hooks';

// ── Assets ──────────────────────────────────────────────────────────────────────
import aashishImg from '@/assets/Aashish Ghimire.jpeg';
import pranjalImg from '@/assets/Pranjal Bhattrai.jpg';
import anantaImg from '@/assets/Ananta Acharya .jpg';
import purushottamImg from '@/assets/Purusottam Barakoti.jpeg';

// ── Data ─────────────────────────────────────────────────────────────────────────
const founders = [
  {
    name: 'Aashish Ghimire',
    role: 'Founder & CEO',
    focus: 'Vision · Strategy · Growth',
    image: aashishImg,
    skills: ['Leadership', 'Strategy', 'Partnerships'],
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    name: 'Pranjal Bhattarai',
    role: 'Co-Founder & CTO',
    focus: 'Technology · Architecture · Dev',
    image: pranjalImg,
    skills: ['Full Stack', 'Architecture', 'DevOps'],
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'Ananta Acharya',
    role: 'Co-Founder & Creative Director',
    focus: 'Design · Branding · UI/UX',
    image: anantaImg,
    skills: ['Creative Direction', 'Brand Strategy', 'UI/UX'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Purushottam Barakoti',
    role: 'Co-Founder & Growth Lead',
    focus: 'SEO · Marketing · Outreach',
    image: purushottamImg,
    skills: ['SEO', 'Digital Marketing', 'Analytics'],
    gradient: 'from-emerald-500 to-teal-400',
  },
];

const values = [
  { icon: Sparkles, label: 'Innovation', color: '#1296DB' },
  { icon: Zap, label: 'Speed', color: '#8B5CF6' },
  { icon: Shield, label: 'Transparency', color: '#06B6D4' },
  { icon: Star, label: 'Excellence', color: '#F59E0B' },
  { icon: Users, label: 'Collaboration', color: '#10B981' },
];

const workSteps = [
  { n: '01', title: 'Understand', desc: 'Analyze goals, market & budget.' },
  { n: '02', title: 'Strategy', desc: 'Design a tailored digital roadmap.' },
  { n: '03', title: 'Build', desc: 'Craft robust frontend & backend.' },
  { n: '04', title: 'Launch', desc: 'Deploy with global performance checks.' },
  { n: '05', title: 'Grow', desc: 'Ongoing SEO, support & analytics.' },
];

const whyPoints = [
  { title: 'Young & Adaptive', desc: 'Fast to adopt modern tech standards.' },
  { title: 'Modern Stack', desc: 'React, TypeScript, Next.js, AI tooling.' },
  { title: 'Personalized', desc: 'Custom roadmaps for your goals.' },
  { title: 'Long-Term Partner', desc: 'With you well beyond launch day.' },
  { title: 'Global Vision', desc: 'Built in Nepal, competing worldwide.' },
];

// ── 3D Founder Card ──────────────────────────────────────────────────────────────
function FounderCard({ founder, index }: { founder: typeof founders[0]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        className="group relative rounded-2xl overflow-hidden bg-white shadow-lg border border-secondary-100 cursor-default"
        whileHover={{ rotateY: 6, rotateX: -4, scale: 1.02, y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Gradient accent bar */}
        <div className={`h-1.5 bg-gradient-to-r ${founder.gradient}`} />

        {/* Photo */}
        <div className="aspect-[4/5] overflow-hidden bg-secondary-100 relative">
          <img
            src={founder.image}
            alt={founder.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t ${founder.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-secondary-900">{founder.name}</h3>
          <p className="text-xs font-semibold text-primary-600 mb-2">{founder.role}</p>
          <p className="text-[11px] text-secondary-400 mb-3 uppercase tracking-wider">{founder.focus}</p>
          <div className="flex flex-wrap gap-1.5">
            {founder.skills.map(s => (
              <span
                key={s}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary-50 border border-secondary-200 text-secondary-600"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* 3D shine layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────────
export function AboutPage() {
  const [storyRef, storyInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [timelineRef, timelineInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'NepNex Technologies',
    'url': 'https://nepnex.com',
    'logo': 'https://nepnex.com/logo.png',
    'founder': founders.map(f => ({ '@type': 'Person', 'name': f.name, 'jobTitle': f.role })),
  };

  return (
    <>
      <Helmet>
        <title>About Us | Technology Startup & Digital Studio | NepNex</title>
        <meta name="description" content="Meet the founders of NepNex Technologies. We build custom software, web platforms, and digital marketing strategies from Nepal for the world." />
        <meta name="keywords" content="Digital Marketing Company Nepal, Software Company Nepal, IT Company Nepal, Web Development Company Nepal, SEO Company Nepal" />
        <meta property="og:title" content="About Us | NepNex Technologies" />
        <meta property="og:description" content="NepNex is a technology startup founded by four ambitious builders from Nepal. Learn our story and meet the team." />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>

      <main>
        {/* ── Hero ── */}
        <PageHero3D
          theme="blue-indigo"
          badge={<><Compass className="w-4 h-4" /> Founded in Nepal 🇳🇵</>}
          title={
            <>
              Building Digital Solutions{' '}
              <span className="text-cyan-300">From Nepal For The World</span>
            </>
          }
          subtitle="NepNex helps businesses build, grow, and succeed in the digital world through technology, creativity, and strategy."
          actions={
            <>
              <Button size="xl" variant="primary" asChild>
                <a href="#team">Meet Our Team</a>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
                asChild
              >
                <Link to="/contact">Work With Us</Link>
              </Button>
            </>
          }
        />

        {/* ── Our Story ── */}
        <section className="py-20 sm:py-28 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 50%, #f5f3ff 100%)',
            }}
          />
          <Container className="relative z-10">
            <div ref={storyRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="space-y-5"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider">
                  Our Story
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 leading-tight">
                  Four builders. One vision.
                </h2>
                <p className="text-secondary-600 leading-relaxed">
                  NepNex was founded by four individuals who believe businesses deserve better digital solutions — ones that combine technology, creativity, and strategy.
                </p>
                <p className="text-secondary-500 text-sm leading-relaxed">
                  We started with an agile, engineering-first mindset — bridging design, performance, SEO, and automation to deliver real results.
                </p>
              </motion.div>

              {/* Mission / Vision 3D cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid sm:grid-cols-2 gap-5"
                style={{ perspective: 600 }}
              >
                {[
                  {
                    label: 'Our Mission',
                    text: 'Empower businesses through innovative digital solutions for stronger online identities and sustainable growth.',
                    gradient: 'from-blue-500 to-indigo-600',
                  },
                  {
                    label: 'Our Vision',
                    text: "Nepal's most trusted digital transformation partner — creating meaningful tech solutions locally and globally.",
                    gradient: 'from-purple-500 to-pink-500',
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ rotateY: 5, rotateX: -3, scale: 1.03, y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="p-6 rounded-2xl bg-white border border-secondary-100 shadow-md"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${item.gradient} mb-4`} />
                    <h3 className="font-bold text-secondary-900 mb-2">{item.label}</h3>
                    <p className="text-sm text-secondary-500 leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ── Founders ── */}
        <section
          id="team"
          className="py-20 sm:py-28 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f3f0ff 100%)' }}
        >
          <Container className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-3">Meet Our Founders</h2>
              <p className="text-secondary-500">The builders, designers, and marketers leading NepNex.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
              {founders.map((founder, i) => (
                <FounderCard key={founder.name} founder={founder} index={i} />
              ))}
            </div>
          </Container>
        </section>

        {/* ── Values ── */}
        <section className="py-20 sm:py-24 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-3">What We Stand For</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.label}
                    whileHover={{ y: -6, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-white border border-secondary-100 shadow-sm"
                    style={{ minWidth: 130 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${v.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: v.color }} />
                    </div>
                    <span className="font-bold text-secondary-800 text-sm">{v.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── How We Work ── */}
        <section
          className="py-20 sm:py-28 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1296DB 0%, #4F46E5 50%, #8B5CF6 100%)' }}
        >
          {/* Dot mesh overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <Container className="relative z-10">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">How We Work</h2>
              <p className="text-white/70">A clear loop built for quality delivery.</p>
            </div>
            <div ref={timelineRef} className="grid md:grid-cols-5 gap-6">
              {workSteps.map((step, idx) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 30 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 text-white text-xl font-bold flex items-center justify-center mx-auto backdrop-blur-sm">
                    {step.n}
                  </div>
                  <h3 className="font-bold text-white text-base">{step.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Why NepNex ── */}
        <section className="py-20 sm:py-24 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-3">Why NepNex?</h2>
              <p className="text-secondary-500">Focused, transparent, and built for results.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: 800 }}>
              {whyPoints.map((point) => (
                <motion.div
                  key={point.title}
                  whileHover={{ rotateY: 4, rotateX: -2, y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="p-6 rounded-2xl bg-white border border-secondary-100 shadow-sm flex items-start gap-4"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-secondary-900 mb-1 text-sm">{point.title}</h3>
                    <p className="text-xs text-secondary-500">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-20 sm:py-28 relative overflow-hidden text-white"
          style={{ background: 'linear-gradient(135deg, #0F2B6B 0%, #1296DB 40%, #4F46E5 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)',
            }}
          />
          <Container className="relative z-10 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Let's Build Something Great Together</h2>
            <p className="text-white/70 max-w-md mx-auto">
              Book a free 30-minute consultation and let's talk strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="primary" asChild>
                <Link to="/book-consultation">Book Consultation</Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}

export default AboutPage;
