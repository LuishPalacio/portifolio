import { LINKS } from '../lib/links';
import { GithubIcon, LinkedinIcon, MailIcon } from '../lib/icons';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>Desenvolvido por Luis Henrique Palacio · React + Vite &copy; 2026</p>
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
        </div>
      </div>
    </footer>
  );
}
