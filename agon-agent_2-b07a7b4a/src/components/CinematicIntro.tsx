import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3000);
    const t4 = setTimeout(() => {
      onComplete();
    }, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-bg flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Cinematic bars */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-black z-10"
            initial={{ height: '50%' }}
            animate={{ height: phase >= 2 ? '0%' : '50%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black z-10"
            initial={{ height: '50%' }}
            animate={{ height: phase >= 2 ? '0%' : '50%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-20 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase >= 1 ? 1 : 0,
              scale: phase >= 1 ? 1 : 0.8,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.img
              src="/images/logo.jpg"
              alt="Muhia Studios"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
              initial={{ filter: 'brightness(0)' }}
              animate={{ filter: phase >= 1 ? 'brightness(1)' : 'brightness(0)' }}
              transition={{ duration: 1.2 }}
            />
            <motion.div
              className="mt-6 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: phase >= 1 ? 'auto' : 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="font-heading text-2xl md:text-4xl tracking-[0.3em] text-text whitespace-nowrap font-light">
                MUHIA STUDIOS
              </p>
            </motion.div>
            <motion.div
              className="mt-2 h-[1px] bg-gradient-to-r from-transparent via-purple to-transparent"
              initial={{ width: 0 }}
              animate={{ width: phase >= 1 ? 200 : 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
