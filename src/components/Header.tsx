import { useEffect, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { LINKS } from '../lib/links';
import { LinkedinIcon, MoonIcon, SunIcon } from '../lib/icons';
import { useActiveSection } from '../hooks/useActiveSection';
import type { ThemeOrigin } from '../hooks/useTheme';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: (origin?: ThemeOrigin) => void;
}

const NAV_LINKS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'formacao', label: 'Formação' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
];

const NAV_IDS = NAV_LINKS.map((link) => link.id);

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(NAV_IDS);
  const closeMenu = () => setMenuOpen(false);

  // Header transparente no topo; com fundo de vidro e mais compacto depois de rolar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc fecha o menu do celular.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // O círculo da troca de tema nasce no centro do botão (funciona com teclado também).
  const toggleFromButton = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onToggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  const headerClass = [
    'site-header',
    scrolled ? 'scrolled' : '',
    menuOpen ? 'menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <a
        href={LINKS.linkedin}
        className="linkedin-float"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedinIcon aria-hidden />
      </a>

      <header className={headerClass}>
        <div className="container header-content">
          <a href="#inicio" className="logo" onClick={closeMenu}>
            <span className="logo-mark" aria-hidden="true">
              LP
            </span>
            <span className="logo-text">Luis Palacio</span>
          </a>

          <nav id="site-nav" className={`site-nav${menuOpen ? ' open' : ''}`} aria-label="Seções">
            <ul>
              {NAV_LINKS.map((link, i) => {
                const active = activeSection === link.id;
                return (
                  <li key={link.id} style={{ '--i': i } as CSSProperties}>
                    <a
                      href={`#${link.id}`}
                      className={active ? 'active' : undefined}
                      aria-current={active ? 'true' : undefined}
                      onClick={closeMenu}
                    >
                      {active && (
                        <m.span
                          layoutId="nav-active-pill"
                          className="nav-pill"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <a href={LINKS.linkedin} className="btn-header" target="_blank" rel="noreferrer">
              <LinkedinIcon aria-hidden /> LinkedIn
            </a>
            <button
              type="button"
              className="theme-toggle"
              aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
              onClick={toggleFromButton}
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={theme}
                  className="theme-icon"
                  initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {theme === 'light' ? <MoonIcon aria-hidden /> : <SunIcon aria-hidden />}
                </m.span>
              </AnimatePresence>
            </button>
            <button
              type="button"
              className={`hamburger${menuOpen ? ' active' : ''}`}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
