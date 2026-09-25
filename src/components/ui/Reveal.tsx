import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating */
  delay?: number;
  /** Slide distance in px (disabled under prefers-reduced-motion) */
  y?: number;
}

/** Scroll-triggered fade/slide used across all sections. Fires once. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
