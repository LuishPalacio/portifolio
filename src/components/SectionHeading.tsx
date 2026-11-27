import type { ReactNode } from 'react';
import { m } from 'motion/react';
import { blurUp, drawX, inView, stagger } from '../lib/motion';

interface SectionHeadingProps {
  /** Número da seção, ex.: "01". */
  index: string;
  /** Rótulo curto acima do título, ex.: "sobre". */
  label: string;
  children: ReactNode;
}

/** Título de seção: rótulo numerado com linha que se desenha e título que sai do desfoque. */
export default function SectionHeading({ index, label, children }: SectionHeadingProps) {
  return (
    <m.div
      className="section-head"
      variants={stagger(0.12)}
      {...inView}
      viewport={{ once: true, amount: 0.8 }}
    >
      <m.p className="section-kicker" variants={blurUp}>
        <span className="kicker-index">{index}</span>
        <m.span className="kicker-line" variants={drawX} aria-hidden="true" />
        <span>{label}</span>
      </m.p>
      <m.h2 className="section-title" variants={blurUp}>
        {children}
      </m.h2>
    </m.div>
  );
}
