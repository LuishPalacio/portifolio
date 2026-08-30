import { useEffect, useState } from 'react';
import { asset } from '../lib/assets';
import { CV_URL } from '../lib/links';
import { PdfIcon } from '../lib/icons';

type Token = { text: string; cls?: 'kw' | 'prop' | 'str' };

const CODE_LINES: Token[][] = [
  [{ text: 'const', cls: 'kw' }, { text: ' developer = {' }],
  [{ text: '  ' }, { text: 'name', cls: 'prop' }, { text: ': ' }, { text: '"Luis Palacio"', cls: 'str' }, { text: ',' }],
  [{ text: '  ' }, { text: 'role', cls: 'prop' }, { text: ': ' }, { text: '"Full Stack & Mobile Developer"', cls: 'str' }, { text: ',' }],
  [{ text: '  ' }, { text: 'stack', cls: 'prop' }, { text: ': [' }],
  [{ text: '    ' }, { text: '"React"', cls: 'str' }, { text: ',' }],
  [{ text: '    ' }, { text: '"React Native + Expo"', cls: 'str' }, { text: ',' }],
  [{ text: '    ' }, { text: '"TypeScript"', cls: 'str' }, { text: ',' }],
  [{ text: '    ' }, { text: '"Node.js"', cls: 'str' }, { text: ',' }],
  [{ text: '    ' }, { text: '"Supabase"', cls: 'str' }, { text: ',' }],
  [{ text: '  ],' }],
  [{ text: '  ' }, { text: 'building', cls: 'prop' }, { text: ': ' }, { text: '"FinFlow 🚀"', cls: 'str' }, { text: ',' }],
  [{ text: '  ' }, { text: 'status', cls: 'prop' }, { text: ': ' }, { text: '"open to work ✅"', cls: 'str' }, { text: ',' }],
  [{ text: '}' }],
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function CodeTerminal() {
  const [visibleLines, setVisibleLines] = useState(() =>
    prefersReducedMotion() ? CODE_LINES.length : 0,
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let line = 0;
    let timer: ReturnType<typeof setTimeout>;

    const reveal = () => {
      line += 1;
      setVisibleLines(line);
      if (line < CODE_LINES.length) {
        timer = setTimeout(reveal, 140);
      }
    };

    timer = setTimeout(reveal, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="code-terminal" style={{ width: '100%' }}>
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">developer.ts</span>
      </div>
      <div className="terminal-body">
        <pre className="code-block">
          {CODE_LINES.slice(0, visibleLines).map((tokens, i) => (
            <span key={i}>
              {i > 0 ? '\n' : ''}
              {tokens.map((token, j) =>
                token.cls ? (
                  <span key={j} className={token.cls}>
                    {token.text}
                  </span>
                ) : (
                  token.text
                ),
              )}
            </span>
          ))}
          {'\n'}
          <span className="cursor" />
        </pre>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-text">
          <p className="saudacao">Olá, meu nome é</p>
          <h1>Luis Henrique Palacio.</h1>
          <p className="hero-tagline">Construo produtos web e mobile com React.</p>
          <p className="descricao">
            <strong>Desenvolvedor Full Stack e Mobile</strong> com eixo em{' '}
            <strong>React, React Native e TypeScript</strong>, Node.js e Python no back-end.
            Graduando em Ciência da Computação, focado em soluções modernas, escaláveis e bem
            arquitetadas.
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
          <CodeTerminal />
        </div>
      </div>
    </section>
  );
}
