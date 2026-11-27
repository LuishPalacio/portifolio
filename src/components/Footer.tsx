import { LINKS } from '../lib/links';
import { ArrowUpIcon, GithubIcon, LinkedinIcon, MailIcon } from '../lib/icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <a href="#inicio" className="logo" aria-label="Voltar ao início">
          <span className="logo-mark" aria-hidden="true">
            LP
          </span>
          <span className="logo-text">Luis Palacio</span>
        </a>

        <p className="footer-copy">Desenvolvido por Luis Henrique Palacio · React + Vite &copy; 2026</p>

        <div className="social-links">
          <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon aria-hidden />
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon aria-hidden />
          </a>
          <a href={LINKS.email} aria-label="E-mail">
            <MailIcon aria-hidden />
          </a>
          <a href="#inicio" aria-label="Voltar ao topo">
            <ArrowUpIcon aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
