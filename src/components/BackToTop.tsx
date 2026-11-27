import { useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpIcon } from '../lib/icons';

/** Botão flutuante de voltar ao topo, com um anel que mostra o progresso da leitura. */
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 700));

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          href="#inicio"
          className="back-to-top"
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', bounce: 0.35, duration: 0.5 }}
        >
          <svg className="progress-ring" viewBox="0 0 48 48" aria-hidden="true">
            <circle className="progress-ring-track" cx="24" cy="24" r="22" />
            <m.circle
              className="progress-ring-fill"
              cx="24"
              cy="24"
              r="22"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUpIcon aria-hidden />
        </m.a>
      )}
    </AnimatePresence>
  );
}
