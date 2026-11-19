import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin by understanding your vision, goals, and the story you want to tell. Every great project starts with a conversation.',
  },
  {
    number: '02',
    title: 'Pre-Production',
    description: 'From mood boards to shot lists, location scouting to talent casting — we meticulously plan every detail before the cameras roll.',
  },
  {
    number: '03',
    title: 'Production',
    description: 'This is where the magic happens. Our team brings together cutting-edge equipment and creative expertise to capture stunning visuals.',
  },
  {
    number: '04',
    title: 'Post-Production',
    description: 'Color grading, editing, sound design, and visual effects — we polish every frame until it reaches cinematic perfection.',
  },
  {
    number: '05',
    title: 'Delivery',
    description: 'The final masterpiece, delivered in formats optimized for every platform. Your vision, realized beyond expectations.',
  },
];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header */}
        <div className="px-6 md:px-16 mb-12">
          <span className="text-gold text-xs tracking-[0.4em] uppercase">How We Work</span>
          <h2 className="font-heading text-4xl md:text-6xl font-light mt-3 tracking-wide">
            Our <span className="italic text-purple-light">Process</span>
          </h2>
          {/* Progress line */}
          <div className="mt-6 h-[1px] bg-white/5 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple to-gold"
              style={{ width: lineWidth }}
            />
          </div>
        </div>

        {/* Scrolling cards */}
        <motion.div
          className="flex gap-8 px-6 md:px-16"
          style={{ x }}
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              className="min-w-[320px] md:min-w-[420px] p-10 border border-white/5 bg-bg-card/50 backdrop-blur-sm group hover:border-purple/30 transition-all duration-500 flex-shrink-0"
            >
              <span className="font-heading text-6xl font-light text-purple/30 group-hover:text-purple/60 transition-colors duration-500">
                {step.number}
              </span>
              <h3 className="font-heading text-2xl font-light mt-4 tracking-wide">{step.title}</h3>
              <div className="w-8 h-[1px] bg-purple mt-4 group-hover:w-16 transition-all duration-500" />
              <p className="text-text-muted text-sm leading-relaxed mt-6">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
