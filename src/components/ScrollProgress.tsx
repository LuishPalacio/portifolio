import { m, useScroll, useSpring } from 'motion/react';

/** Barra fina no topo da página que mostra quanto já foi lido. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return <m.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
