import type { Transition, Variants } from 'motion/react';

/**
 * Variantes de animação compartilhadas (Motion). Os componentes usam `initial="hidden"` e
 * `whileInView="show"` (atalho: `{...inView}`), e os filhos herdam o estado pelas variantes.
 * Com "reduzir movimento" no sistema, o `MotionConfig` do App desliga os deslocamentos e
 * mantém só o fade.
 */

/** Curva de saída suave usada em quase todas as entradas. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const enter: Transition = { duration: 0.75, ease: EASE_OUT };

/** Revela ao entrar na tela, uma vez só. */
export const inView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
} as const;

/** Container que escalona a entrada dos filhos. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Filho de um `stagger`: sobe e aparece. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: enter },
};

/** Filho de um `stagger`: sobe e sai do desfoque (títulos e textos curtos). */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: enter,
    // Sem filtro residual depois da animação (mantém o texto nítido).
    transitionEnd: { filter: 'none' },
  },
};

/** Filho de um `stagger`: pílulas e chips surgem com uma mola leve. */
export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', bounce: 0.35, duration: 0.6 } },
};

/** Linha que se desenha da esquerda para a direita. */
export const drawX: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

/**
 * Elemento independente (sem `stagger` no pai): sobe e aparece. `custom` é a posição na
 * fileira, para os cards de uma mesma linha entrarem em cascata.
 */
export const rise: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (step: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...enter, delay: step * 0.09 },
  }),
};
