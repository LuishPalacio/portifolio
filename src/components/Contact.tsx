import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { EMAIL, GITHUB_USER, LINKS } from '../lib/links';
import { GithubIcon, LinkedinIcon, MailIcon } from '../lib/icons';
import { PROJECT_COUNT } from '../data/projects';
import AnimatedNumber from './AnimatedNumber';

interface GitHubData {
  public_repos: number;
  created_at: string;
}

interface ContactItem {
  href: string;
  Icon: IconType;
  label: string;
  value: string;
  external: boolean;
}

const CONTACTS: ContactItem[] = [
  { href: LINKS.email, Icon: MailIcon, label: 'Email', value: EMAIL, external: false },
  { href: LINKS.linkedin, Icon: LinkedinIcon, label: 'LinkedIn', value: '/in/luishpalacio', external: true },
  { href: LINKS.github, Icon: GithubIcon, label: 'GitHub', value: `/${GITHUB_USER}`, external: true },
];

export default function Contact() {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USER}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json: GitHubData) => setData(json))
      .catch(() => {
        /* silencioso: mantém o placeholder */
      });
    return () => controller.abort();
  }, []);

  const repos = data ? data.public_repos : null;
  const yearsOnGitHub = data
    ? Math.max(1, new Date().getFullYear() - new Date(data.created_at).getFullYear())
    : null;

  return (
    <section id="contato" className="section">
      <div className="container">
        <h2 className="section-title fade-in">Vamos Conversar?</h2>

        <div className="contact-grid fade-in">
          {CONTACTS.map(({ href, Icon, label, value, external }) => (
            <a
              key={label}
              href={href}
              className="contact-card"
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <Icon aria-hidden />
              <span className="contact-label">{label}</span>
              <span className="contact-value">{value}</span>
            </a>
          ))}
        </div>

        <div className="github-stats fade-in">
          <div className="stat-item">
            <AnimatedNumber className="stat-number" value={repos} />
            <span className="stat-label">Repositórios públicos</span>
          </div>
          <div className="stat-item">
            <AnimatedNumber className="stat-number" value={yearsOnGitHub} />
            <span className="stat-label">Anos no GitHub</span>
          </div>
          <div className="stat-item">
            <AnimatedNumber className="stat-number" value={PROJECT_COUNT} />
            <span className="stat-label">Projetos no portfólio</span>
          </div>
        </div>
      </div>
    </section>
  );
}
