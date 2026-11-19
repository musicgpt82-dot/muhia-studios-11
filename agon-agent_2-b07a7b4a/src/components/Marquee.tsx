import { motion } from 'framer-motion';

const items = [
  'Photography', '•', 'Videography', '•', 'Film Production', '•',
  'Color Grading', '•', 'Editing', '•', 'Brand Films', '•',
  'Documentaries', '•', 'Commercials', '•',
];

export default function Marquee() {
  return (
    <div className="py-8 border-y border-white/5 overflow-hidden bg-bg-card/30">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, -1600] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`font-heading text-2xl md:text-4xl font-light tracking-wider ${
              item === '•' ? 'text-purple' : 'text-text/30'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
