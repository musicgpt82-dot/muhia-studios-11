import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.dataset.cursor === 'pointer') {
        setHovered(true);
      }
    };

    const handleOut = () => setHovered(false);
    const handleLeave = () => setHidden(true);
    const handleEnter = () => setHidden(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [isMobile, x, y]);

  if (isMobile) return null;

  return (
    <>
      <style>{`* { cursor: none !important; } @media (max-width: 767px) { * { cursor: auto !important; } }`}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{ x, y }}
        animate={{
          width: hovered ? 60 : 16,
          height: hovered ? 60 : 16,
          opacity: hidden ? 0 : 1,
          borderRadius: '50%',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <div
          className="w-full h-full rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: hovered
              ? 'radial-gradient(circle, rgba(123,45,142,0.8), rgba(201,169,110,0.6))'
              : 'white',
          }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-purple pointer-events-none z-[10001]"
        animate={{
          x: pos.x - 2,
          y: pos.y - 2,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0 }}
      />
    </>
  );
}
