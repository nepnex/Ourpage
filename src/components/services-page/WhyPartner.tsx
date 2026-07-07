import { motion } from 'framer-motion';
import { Settings, MessageSquare, Users, Cpu, LifeBuoy, BarChart } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useInView } from '@/hooks';

const features = [
  { icon: Settings, title: 'Custom Solutions', description: 'Every solution is custom-built for your specific business needs and objectives.' },
  { icon: MessageSquare, title: 'Transparent Communication', description: 'We believe in clear, honest, and regular communication throughout our partnership.' },
  { icon: Users, title: 'Experienced Team', description: 'Our team of experts brings years of experience across various digital disciplines.' },
  { icon: Cpu, title: 'Modern Technology', description: 'We leverage the latest technologies and frameworks for optimal performance.' },
  { icon: LifeBuoy, title: 'Continuous Support', description: 'Our commitment does not end at launch. We provide ongoing support and maintenance.' },
  { icon: BarChart, title: 'Results-Driven Approach', description: 'We focus on delivering measurable results that directly impact your bottom line.' },
];

export function WhyPartner() {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  return (
    <Section background="light">
      <div ref={inViewRef} className="max-w-6xl mx-auto">
        <SectionHeading
          label="Why NepNex"
          title="Why Partner With NepNex"
          description="We are more than just an agency; we are your strategic partner in digital growth."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-white border border-secondary-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
