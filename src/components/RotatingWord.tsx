import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { EASE_OUT } from '../lib/motion';

interface RotatingWordProps {
  words: string[];
  /** Texto fixo mostrado para quem pediu menos movimento no sistema. */
  still: string;
  /** Tempo de cada palavra na tela, em ms. */
  interval?: number;
}

/**
 * Palavra que troca sozinha (sobe, desfoca e dá lugar à próxima). Puramente visual:
 * o componente pai deve oferecer o texto completo para leitores de tela.
 */
export default function RotatingWord({ words, still, interval = 2400 }: RotatingWordProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(timer);
  }, [reduceMotion, words.length, interval]);

  if (reduceMotion) {
    return <span className="rotating-word text-gradient">{still}</span>;
  }

  return (
    <span className="rotating-word">
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[index]}
          className="rotating-word-inner text-gradient"
          initial={{ y: '0.45em', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.45em', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
