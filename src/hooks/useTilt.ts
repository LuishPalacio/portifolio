import type { PointerEvent } from 'react';
import { useReducedMotion, useSpring } from 'motion/react';

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Inclinação 3D que segue o mouse. Só reage a mouse: toque e caneta ficam de fora, e com
 * `prefers-reduced-motion` o card não inclina. O brilho que acompanha o cursor vem do
 * `usePointerGlow` (classe `.glow`), não deste hook.
 *
 * @param maxDeg inclinação máxima em graus em cada eixo.
 */
export function useTilt(maxDeg = 6) {
  const reduceMotion = useReducedMotion();
  // `.set()` num useSpring anima até o alvo com a mola, sem saltos.
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || reduceMotion || maxDeg === 0) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rotateY.set((x - 0.5) * 2 * maxDeg);
    rotateX.set((0.5 - y) * 2 * maxDeg);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    style: { rotateX, rotateY, transformPerspective: 900 },
    onPointerMove,
    onPointerLeave,
  };
}
