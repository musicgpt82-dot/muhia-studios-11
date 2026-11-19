import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export default function Testimonials() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const next = () => setCurrent(prev => (prev + 1) % testimonials.length);
  const prev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-light/30 to-bg" />
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            className="text-gold text-xs tracking-[0.4em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Client Love
          </motion.span>
          <motion.h2
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-light mt-4 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What They <span className="italic text-purple-light">Say</span>
          </motion.h2>
          <motion.div
            className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-purple to-transparent"
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        {/* Testimonial Carousel */}
        {loading ? (
          <div className="h-64 bg-bg-card/50 animate-pulse" />
        ) : testimonials.length > 0 ? (
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <Quote size={48} className="text-purple/20" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="text-center px-4 md:px-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonials[current].rating ? 'text-gold fill-gold' : 'text-text-dim'}
                    />
                  ))}
                </div>

                <p className="font-heading text-xl md:text-2xl lg:text-3xl font-light leading-relaxed italic text-text/90">
                  "{testimonials[current].content}"
                </p>

                <div className="mt-10">
                  <p className="text-sm tracking-[0.15em] uppercase">{testimonials[current].name}</p>
                  <p className="text-text-dim text-xs mt-1">
                    {testimonials[current].role}, {testimonials[current].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-purple/50 hover:bg-purple/10 transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 transition-all duration-500 ${
                      i === current ? 'w-8 bg-purple' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-purple/50 hover:bg-purple/10 transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
