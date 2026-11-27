import type { PointerEvent } from 'react';
import { useReducedMotion, useSpring } from 'motion/react';

const SPRING = { stiffness: 260, damping: 18, mass: 0.5 };

/**
 * Efeito "magnético": o elemento (um `m.a` ou `m.button`) desliza alguns pixels na direção
 * do mouse e volta com mola ao sair. Só mouse; com `prefers-reduced-motion` fica parado.
 *
 * @param strength fração da distância até o centro que o elemento acompanha.
 * @param max deslocamento máximo em px.
 */
export function useMagnetic(strength = 0.28, max = 10) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const clamp = (value: number) => Math.max(-max, Math.min(max, value));

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(clamp((event.clientX - (rect.left + rect.width / 2)) * strength));
    y.set(clamp((event.clientY - (rect.top + rect.height / 2)) * strength));
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { style: { x, y }, onPointerMove, onPointerLeave };
}
