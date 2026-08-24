import React from 'react';
import { motion } from 'framer-motion';

interface FoldTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export const FoldText: React.FC<FoldTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  duration = 0.7,
}) => {
  // Split into words to prevent breaking words across lines
  const words = text.split(' ');

  return (
    <div className={`inline-flex flex-wrap items-center ${className}`} style={{ perspective: '1200px' }}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex whitespace-nowrap mr-[0.28em] py-1">
          {word.split('').map((char, charIdx) => {
            // Global character index for smooth staggered cascade
            const globalCharIndex =
              words.slice(0, wordIdx).reduce((acc, w) => acc + w.length, 0) + charIdx;

            return (
              <motion.span
                key={charIdx}
                initial={{
                  rotateX: -90,
                  opacity: 0,
                  y: -15,
                }}
                animate={{
                  rotateX: 0,
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  rotateX: 360,
                  transition: { duration: 0.6, ease: 'easeInOut' },
                }}
                transition={{
                  duration: duration,
                  delay: delay + globalCharIndex * stagger,
                  ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
                }}
                className="inline-block transform-gpu"
                style={{
                  transformOrigin: '50% 0%', // Fold top hinge
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
};
