import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';

const faqs = [
  {
    question: 'How long does a website project take?',
    answer: 'The timeline for a website project varies depending on its complexity and requirements. A standard informational website typically takes 3-4 weeks, while custom e-commerce or web applications can take 8-12 weeks. We will provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'How much do your services cost?',
    answer: 'Our pricing is tailored to the specific needs and goals of your business. We offer custom quotes after understanding your project requirements. Our focus is always on delivering a high return on investment (ROI) for your digital initiatives.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes, we work with clients globally. Our communication and project management processes are designed to ensure seamless collaboration regardless of your timezone or location.',
  },
  {
    question: 'Can I combine multiple services?',
    answer: 'Absolutely. In fact, we highly recommend it. Combining services like Web Development with SEO and Digital Marketing often yields the best results. We can create a comprehensive digital strategy that integrates multiple services for maximum impact.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes, we offer ongoing maintenance and support packages to ensure your digital assets remain secure, up-to-date, and continue to perform optimally long after the initial launch.',
  },
  {
    question: 'How do I get started?',
    answer: 'Getting started is easy. Simply book a free consultation through our website. During the call, we will discuss your business goals, current challenges, and how NepNex can help you achieve digital success.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about working with NepNex Technologies."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  rounded-2xl border transition-all duration-300 overflow-hidden
                  ${isOpen ? 'bg-white border-primary-200 shadow-md' : 'bg-white/60 border-secondary-100 hover:border-secondary-200'}
                `}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-primary-600' : 'text-secondary-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0
                    ${isOpen ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-500'}
                  `}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-secondary-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
