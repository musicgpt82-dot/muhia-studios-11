import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, Users, Clock, Aperture } from 'lucide-react';

const stats = [
  { icon: Aperture, value: '500+', label: 'Projects Delivered' },
  { icon: Users, value: '200+', label: 'Happy Clients' },
  { icon: Award, value: '15+', label: 'Industry Awards' },
  { icon: Clock, value: '8+', label: 'Years Experience' },
];

export default function About() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-light/20 to-bg" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            animate={imageVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute -inset-4 border border-purple/20 -z-10" />
              <div className="absolute -inset-8 border border-purple/10 -z-10" />
              <img
                src="/images/about.jpg"
                alt="Muhia Studios Team"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple/20 to-transparent mix-blend-overlay" />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 md:right-8 bg-purple px-6 py-4 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={imageVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-heading text-3xl font-light">Est. 2018</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/70">Nairobi, Kenya</p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div ref={titleRef}>
            <motion.span
              className="text-gold text-xs tracking-[0.4em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Our Story
            </motion.span>
            <motion.h2
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-light mt-4 tracking-wide leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Crafting <span className="italic text-purple-light">Visual</span><br />
              Masterpieces
            </motion.h2>
            <motion.div
              className="mt-6 h-[1px] w-24 bg-gradient-to-r from-purple to-transparent"
              initial={{ scaleX: 0 }}
              animate={titleVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.p
              className="mt-8 text-text-muted leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Muhia Studios was born from a passion for visual storytelling. We believe every frame 
              should speak volumes, every shot should evoke emotion, and every project should push 
              the boundaries of creative excellence.
            </motion.p>
            <motion.p
              className="mt-4 text-text-muted leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Our team of visionaries, cinematographers, and editors work together to transform 
              ideas into captivating visual experiences. From intimate portrait sessions to 
              large-scale film productions, we bring the same level of dedication and artistry 
              to every project.
            </motion.p>

            {/* Values */}
            <motion.div
              className="mt-10 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={titleVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {['Cinematic Vision', 'Attention to Detail', 'Creative Excellence', 'Client-Focused'].map((value, i) => (
                <div key={value} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-purple rotate-45" />
                  <span className="text-sm text-text-muted">{value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center p-8 border border-white/5 bg-bg-card/50 group hover:border-purple/30 transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Icon size={24} className="mx-auto mb-4 text-purple group-hover:text-purple-light transition-colors" />
                <p className="font-heading text-3xl md:text-4xl font-light text-text">{stat.value}</p>
                <p className="text-text-dim text-xs tracking-[0.15em] uppercase mt-2">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
