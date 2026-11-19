import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Camera, Video, Film, Palette } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Camera,
    title: 'Photography',
    description: 'From editorial shoots to commercial campaigns, we capture moments with precision and artistry that transcends the ordinary.',
    image: '/images/photography.jpg',
    tags: ['Portrait', 'Fashion', 'Product', 'Events'],
  },
  {
    icon: Video,
    title: 'Videography',
    description: 'Dynamic visual narratives crafted with cinematic techniques, bringing your story to life through motion and emotion.',
    image: '/images/videography.jpg',
    tags: ['Corporate', 'Music Videos', 'Documentaries', 'Social Media'],
  },
  {
    icon: Film,
    title: 'Film Production',
    description: 'Full-scale production capabilities from concept to delivery, creating compelling films that resonate with audiences.',
    image: '/images/film-production.jpg',
    tags: ['Short Films', 'Commercials', 'Brand Films', 'Narratives'],
  },
  {
    icon: Palette,
    title: 'Post Production',
    description: 'Expert color grading, editing, and visual effects that elevate raw footage into polished cinematic masterpieces.',
    image: '/images/editing.jpg',
    tags: ['Color Grading', 'Editing', 'VFX', 'Sound Design'],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      className="perspective-container"
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative group overflow-hidden bg-bg-card border border-white/5 h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          rotateY: hovered ? 2 : 0,
          rotateX: hovered ? -2 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/30 to-transparent" />
          <motion.div
            className="absolute inset-0 bg-purple/10"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 border border-purple/30 text-purple">
              <Icon size={20} />
            </div>
            <h3 className="font-heading text-2xl font-light tracking-wide">{service.title}</h3>
          </div>
          <p className="text-text-muted text-sm leading-relaxed mb-6">{service.description}</p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map(tag => (
              <span key={tag} className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-white/10 text-text-dim">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-[1px] border border-purple/0 pointer-events-none"
          animate={{ borderColor: hovered ? 'rgba(123,45,142,0.4)' : 'rgba(123,45,142,0)' }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="services" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-light/50 to-bg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-purple/30" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            className="text-gold text-xs tracking-[0.4em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            What We Do
          </motion.span>
          <motion.h2
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-light mt-4 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our <span className="italic text-purple-light">Services</span>
          </motion.h2>
          <motion.div
            className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-purple to-transparent"
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
