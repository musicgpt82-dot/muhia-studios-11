import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import { X, ArrowRight, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  client: string;
  year: string;
}

const categories = ['All', 'Photography', 'Videography', 'Film Production', 'Commercial'];

function PortfolioItem({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const isLarge = index % 5 === 0 || index % 5 === 3;

  return (
    <motion.div
      ref={ref}
      className={`relative group cursor-pointer overflow-hidden ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      data-cursor="pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-card">
        <motion.img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 border border-purple/0 group-hover:border-purple/30 transition-all duration-500" />
        
        {/* Content on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-gold text-[10px] tracking-[0.3em] uppercase">{project.category}</span>
          <h3 className="font-heading text-xl md:text-2xl font-light mt-1">{project.title}</h3>
          <div className="flex items-center gap-2 mt-2 text-text-muted text-xs">
            <span>{project.client}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
            <ArrowRight size={14} className="-rotate-45" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-light/30 to-bg" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            className="text-gold text-xs tracking-[0.4em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Work
          </motion.span>
          <motion.h2
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-light mt-4 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Selected <span className="italic text-purple-light">Portfolio</span>
          </motion.h2>
          <motion.div
            className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-purple to-transparent"
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-purple border-purple text-white'
                  : 'border-white/10 text-text-muted hover:border-purple/40 hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`bg-bg-card animate-pulse aspect-[4/3] ${i % 5 === 0 || i % 5 === 3 ? 'md:col-span-2 md:row-span-2' : ''}`} />
            ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <PortfolioItem
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[200] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-bg-card border border-white/5 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-bg/80 flex items-center justify-center hover:bg-purple transition-colors"
              >
                <X size={18} />
              </button>
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto">
                  <img src={selectedProject.image_url} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-gold text-[10px] tracking-[0.3em] uppercase">{selectedProject.category}</span>
                  <h3 className="font-heading text-3xl md:text-4xl font-light mt-2">{selectedProject.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mt-4">{selectedProject.description}</p>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-text-dim text-[10px] tracking-[0.2em] uppercase">Client</span>
                        <p className="text-sm mt-1">{selectedProject.client}</p>
                      </div>
                      <div>
                        <span className="text-text-dim text-[10px] tracking-[0.2em] uppercase">Year</span>
                        <p className="text-sm mt-1">{selectedProject.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
