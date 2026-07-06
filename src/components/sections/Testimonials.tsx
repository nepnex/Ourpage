import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui';
import { useReducedMotion } from '@/hooks';

const testimonials = [
  {
    quote: "NepNex Technologies transformed our online presence completely. Their team delivered a stunning website that doubled our conversion rate within months. Truly professional and highly recommended.",
    author: 'Rajesh Sharma',
    role: 'CEO',
    company: 'Tech Solutions Nepal',
    avatar: 'RS',
    rating: 5,
  },
  {
    quote: "The digital marketing strategy they created for us was game-changing. Our organic traffic increased by 200% and we're now ranking on the first page for our key terms.",
    author: 'Priya Maharjan',
    role: 'Marketing Director',
    company: 'Himalayan Ventures',
    avatar: 'PM',
    rating: 5,
  },
  {
    quote: "Working with NepNex Technologies was a fantastic experience. They understood our vision perfectly and delivered a mobile app that our customers love. The support has been exceptional.",
    author: 'Anil Thapa',
    role: 'Founder',
    company: 'FoodExpress Nepal',
    avatar: 'AT',
    rating: 5,
  },
  {
    quote: "Their AI training program transformed our team's capabilities. We're now implementing AI solutions that save us hours of work every week. Great value and expertise.",
    author: 'Sunita KC',
    role: 'Operations Manager',
    company: 'Global Services Ltd',
    avatar: 'SK',
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <Section background="light">
      <SectionHeading
        label="Testimonials"
        title="What Our Clients Say"
        description="Hear from businesses that have transformed their digital presence with NepNex Technologies."
      />

      <div className="relative max-w-4xl mx-auto px-1">
        {/* Quote icon */}
        <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
          <Quote className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        {/* Testimonial card */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl p-6 sm:p-8 md:p-12 pt-12 sm:pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-warning-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg md:text-xl lg:text-heading-lg text-secondary-900 mb-6 sm:mb-8 leading-relaxed px-0 sm:px-6">
                "{testimonials[current].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-base sm:text-lg font-semibold shrink-0">
                  {testimonials[current].avatar}
                </div>
                <div className="text-center xs:text-left">
                  <div className="font-semibold text-secondary-900">{testimonials[current].author}</div>
                  <div className="text-sm text-secondary-500">
                    {testimonials[current].role}, {testimonials[current].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop/tablet side navigation */}
          <button
            onClick={prev}
            className="hidden sm:flex absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary-100 text-secondary-600 hover:bg-secondary-200 transition-colors items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="hidden sm:flex absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary-100 text-secondary-600 hover:bg-secondary-200 transition-colors items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Mobile bottom navigation */}
          <div className="flex sm:hidden justify-center gap-3 mt-4 pt-4 border-t border-secondary-100">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 hover:bg-secondary-200 transition-colors flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 hover:bg-secondary-200 transition-colors flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === current
                  ? 'bg-primary-600 w-8'
                  : 'bg-secondary-300 hover:bg-secondary-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
