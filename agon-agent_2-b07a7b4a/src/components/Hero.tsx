import { motion } from 'framer-motion';
import { useParallax } from '../hooks/useScrollAnimation';
import { ChevronDown, Play } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const scrollY = useParallax();
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover scale-110 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/40 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-dark/20 to-transparent" />
      </div>

      {/* Cinematic Bars */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 justify-center mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-body">Visual Storytelling</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.05em] leading-[0.9]"
            initial={{ y: '120%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-shimmer">MUHIA</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.05em] leading-[0.9]"
            initial={{ y: '120%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 4.2, ease: [0.22, 1, 0.36, 1] }}
          >
            STUDIOS
          </motion.h1>
        </div>

        <motion.p
          className="mt-8 text-text-muted text-base md:text-lg max-w-xl font-light tracking-wide leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.6 }}
        >
          Crafting cinematic experiences through the art of photography, 
          videography, and film production.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.8 }}
        >
          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-10 py-4 bg-purple hover:bg-purple-light text-white text-sm tracking-[0.2em] uppercase transition-all duration-500 flex items-center gap-3"
          >
            View Our Work
            <Play size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 border border-white/20 hover:border-gold/60 text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:text-gold"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.2 }}
      >
        <span className="text-text-dim text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-text-dim" />
        </motion.div>
      </motion.div>
    </section>
  );
}
