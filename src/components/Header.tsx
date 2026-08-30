import { useState } from 'react';
import { LINKS } from '../lib/links';
import { LinkedinIcon, MoonIcon, SunIcon } from '../lib/icons';
import { useActiveSection } from '../hooks/useActiveSection';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
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
  const activeSection = useActiveSection(NAV_IDS);
  const closeMenu = () => setMenuOpen(false);

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

      <header>
        <div className="container header-content">
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={menuOpen ? 'open' : undefined}>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={activeSection === link.id ? 'active' : undefined}
                    aria-current={activeSection === link.id ? 'true' : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={LINKS.linkedin} className="btn-contato" target="_blank" rel="noreferrer">
                  <LinkedinIcon aria-hidden /> LinkedIn
                </a>
              </li>
              <li>
                <button
                  className="theme-toggle"
                  aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
                  onClick={onToggleTheme}
                >
                  {theme === 'light' ? <MoonIcon aria-hidden /> : <SunIcon aria-hidden />}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
