import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-heading text-xl tracking-[0.2em] font-light">MUHIA STUDIOS</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              Crafting cinematic experiences through the art of visual storytelling. 
              Based in Nairobi, creating for the world.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase text-text-dim mb-6">Navigation</h4>
            <div className="space-y-3">
              {['Services', 'Portfolio', 'About', 'Contact'].map(link => (
                <button
                  key={link}
                  onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-text-muted text-sm hover:text-purple transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase text-text-dim mb-6">Services</h4>
            <div className="space-y-3">
              {['Photography', 'Videography', 'Film Production', 'Post Production'].map(service => (
                <p key={service} className="text-text-muted text-sm">{service}</p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-xs tracking-wider">
            © 2026 Muhia Studios. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-text-dim text-xs tracking-[0.15em] uppercase hover:text-purple transition-colors"
          >
            Back to Top
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
