import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

const DURATION_MS = 1400;

interface AnimatedNumberProps {
  /** `null` enquanto o valor ainda não chegou (ex.: API do GitHub). */
  value: number | null;
  className?: string;
}

/**
 * Conta de 0 até `value` quando entra na tela (uma vez só). Leitores de tela
 * recebem apenas o valor final; com `prefers-reduced-motion` não há contagem.
 */
export default function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (value === null || !inView || reduceMotion) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setCurrent(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value, inView, reduceMotion]);

  const shown = value === null ? '…' : reduceMotion ? value : current;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value ?? 'carregando'}</span>
    </span>
  );
}
