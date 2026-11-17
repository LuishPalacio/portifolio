import { asset } from '../lib/assets';
import { CV_URL } from '../lib/links';
import { PdfIcon } from '../lib/icons';
import type { CategoryId } from '../data/projects';
import Terminal from './Terminal';

interface HeroProps {
  onProjectFilter: (filter: CategoryId) => void;
  onToggleTheme: () => void;
}

export default function Hero({ onProjectFilter, onToggleTheme }: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-text">
          <p className="saudacao">Olá, meu nome é</p>
          <h1>Luis Henrique Palacio.</h1>
          <p className="hero-tagline">Construo produtos web e mobile, da interface ao banco.</p>
          <p className="descricao">
            <strong>Desenvolvedor Full Stack</strong> com foco em{' '}
            <strong>React, React Native e TypeScript</strong>, Python, Java e Node.js no back-end.
            Integro <strong>IA generativa com segurança</strong>: o modelo interpreta, o código
            valida e o usuário confirma. Graduando em Ciência da Computação.
          </p>
          <div className="hero-ctas">
            <a href="#projetos" className="btn-cta">
              Ver meus projetos
            </a>
            <a
              href={asset(CV_URL)}
              className="btn-cta-secondary"
              target="_blank"
              rel="noreferrer"
            >
              <PdfIcon aria-hidden /> Baixar CV
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <Terminal onProjectFilter={onProjectFilter} onToggleTheme={onToggleTheme} />
        </div>
      </div>
    </section>
  );
}
