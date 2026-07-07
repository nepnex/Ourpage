import { Helmet } from 'react-helmet-async';
import { Hero } from '@/components/services-page/Hero';
import { WhyOurServices } from '@/components/services-page/WhyOurServices';
import { OurServices } from '@/components/services-page/OurServices';
import { Process } from '@/components/services-page/Process';
import { Industries } from '@/components/services-page/Industries';
import { WhyPartner } from '@/components/services-page/WhyPartner';
import { FAQ } from '@/components/services-page/FAQ';
import { CTA } from '@/components/services-page/CTA';

export function ServicesPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'provider': {
      '@type': 'Organization',
      'name': 'NepNex Technologies',
      'url': 'https://nepnex.com',
    },
    'serviceType': [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Digital Advertising',
      'Creative Services',
      'AI & Training'
    ],
    'areaServed': 'Nepal',
    'description': 'NepNex provides premium digital solutions including custom software, high-performance websites, SEO, branding, and digital marketing.'
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How long does a website project take?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The timeline for a website project varies depending on its complexity and requirements. A standard informational website typically takes 3-4 weeks, while custom e-commerce or web applications can take 8-12 weeks.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How much do your services cost?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our pricing is tailored to the specific needs and goals of your business. We offer custom quotes after understanding your project requirements.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do you work with international clients?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, we work with clients globally. Our communication and project management processes are designed to ensure seamless collaboration regardless of your timezone or location.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I combine multiple services?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Absolutely. Combining services like Web Development with SEO and Digital Marketing often yields the best results.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do you provide ongoing support?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, we offer ongoing maintenance and support packages to ensure your digital assets remain secure, up-to-date, and continue to perform optimally long after the initial launch.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I get started?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Getting started is easy. Simply book a free consultation through our website.'
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://nepnex.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Services',
        'item': 'https://nepnex.com/services'
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Digital Marketing & Web Development Company in Nepal | NepNex</title>
        <meta name="description" content="NepNex is a premium Digital Marketing, SEO, Web Development, and Software Company in Nepal. We provide custom solutions for business growth. Book a free consultation!" />
        <meta name="keywords" content="Digital Marketing Company in Nepal, Web Development Company in Nepal, SEO Company in Nepal, Software Company in Nepal, Graphic Design Company in Nepal, AI Training Nepal, Digital Solutions Nepal" />
        <meta property="og:title" content="Premium Digital Solutions | NepNex Services" />
        <meta property="og:description" content="Discover our suite of services: Web Development, SEO, Digital Marketing, Creative Design, and AI Training." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nepnex.com/services" />
        
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <main>
        <Hero />
        <WhyOurServices />
        <OurServices />
        <Process />
        <Industries />
        <WhyPartner />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}

export default ServicesPage;
