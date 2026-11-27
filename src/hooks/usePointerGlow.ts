import { useEffect } from 'react';

/** Elementos que acompanham o mouse: cards com `.glow` e o fundo do Hero. */
const TRACKED = '.glow, .hero';

/**
 * Atualiza `--mx`/`--my` (posição do mouse, em px) no card `.glow` ou no Hero que está
 * sob o cursor. O CSS usa essas variáveis para a borda que acende e o brilho interno.
 * Um único listener para a página inteira, limitado a uma atualização por quadro.
 * Só reage a mouse: em toque e caneta os cards ficam parados.
 */
export function usePointerGlow(): void {
  useEffect(() => {
    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last || !(last.target instanceof Element)) return;
      const target = last.target.closest<HTMLElement>(TRACKED);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${Math.round(last.clientX - rect.left)}px`);
      target.style.setProperty('--my', `${Math.round(last.clientY - rect.top)}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      last = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}
