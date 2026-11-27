import { Fragment } from 'react';
import type { CSSProperties } from 'react';
import { m } from 'motion/react';
import { asset } from '../lib/assets';
import { CV_URL, LINKS } from '../lib/links';
import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon, PdfIcon } from '../lib/icons';
import { useMagnetic } from '../hooks/useMagnetic';
import type { CategoryId } from '../data/projects';
import RotatingWord from './RotatingWord';
import Terminal from './Terminal';

interface HeroProps {
  onProjectFilter: (filter: CategoryId) => void;
  onToggleTheme: () => void;
}

/**
 * Ordem de entrada da animação inicial. Ela é feita em CSS (`.intro` no index.css), então
 * o Hero aparece animado já na primeira pintura, sem esperar o JS do Motion carregar.
 */
const step = (order: number) => ({ '--d': order }) as CSSProperties;

const NAME = ['Luis', 'Henrique', 'Palacio.'];
const ROLES = ['web.', 'mobile.', 'com IA.'];

export default function Hero({ onProjectFilter, onToggleTheme }: HeroProps) {
  const primaryCta = useMagnetic();
  const secondaryCta = useMagnetic();

  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="hero-spotlight" />
      </div>

      <div className="container hero-container">
        <div className="hero-text">
          <p className="hero-badge intro" style={step(0)}>
            <span className="status-dot" aria-hidden="true" />
            Disponível para novas oportunidades
          </p>

          <p className="saudacao intro" style={step(1)}>
            Olá, meu nome é
          </p>
          <h1 className="hero-name">
            {NAME.map((word, i) => (
              <Fragment key={word}>
                <span className="hero-word intro" style={step(2 + i)}>
                  {word}
                </span>
                {i < NAME.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>

          <p className="hero-tagline intro" style={step(5)}>
            <span className="sr-only">Construo produtos web e mobile, da interface ao banco.</span>
            <span aria-hidden="true">
              Da interface ao banco,
              <br />
              construo produtos <RotatingWord words={ROLES} still="web e mobile." />
            </span>
          </p>

          <p className="descricao intro" style={step(6)}>
            <strong>Desenvolvedor Full Stack</strong> com foco em{' '}
            <strong>React, React Native e TypeScript</strong>, Python, Java e Node.js no back-end.
            Integro <strong>IA generativa com segurança</strong>: o modelo interpreta, o código
            valida e o usuário confirma. Graduando em Ciência da Computação.
          </p>

          <div className="hero-ctas intro" style={step(7)}>
            <m.a href="#projetos" className="btn btn-primary" {...primaryCta}>
              Ver meus projetos
              <ArrowRightIcon aria-hidden className="btn-arrow" />
            </m.a>
            <m.a
              href={asset(CV_URL)}
              className="btn btn-ghost"
              target="_blank"
              rel="noreferrer"
              {...secondaryCta}
            >
              <PdfIcon aria-hidden /> Baixar CV
            </m.a>
            <div className="hero-social">
              <a
                href={LINKS.github}
                className="icon-link"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon aria-hidden />
              </a>
              <a
                href={LINKS.linkedin}
                className="icon-link"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon aria-hidden />
              </a>
              <a href={LINKS.email} className="icon-link" aria-label="E-mail">
                <MailIcon aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-visual intro intro-3d" style={step(3)}>
          <div className="terminal-glow" aria-hidden="true" />
          <div className="terminal-float">
            <Terminal onProjectFilter={onProjectFilter} onToggleTheme={onToggleTheme} />
          </div>
        </div>
      </div>

      <a href="#sobre" className="scroll-cue intro" style={step(9)} aria-label="Rolar até a seção Sobre">
        <span className="scroll-mouse" aria-hidden="true">
          <span className="scroll-wheel" />
        </span>
      </a>
    </section>
  );
}
