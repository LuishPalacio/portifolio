import { useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { m } from 'motion/react';
import { EMAIL, GITHUB_USER, LINKS } from '../lib/links';
import {
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  SendIcon,
} from '../lib/icons';
import { fadeUp, inView, rise, stagger } from '../lib/motion';
import { useMagnetic } from '../hooks/useMagnetic';
import { PROJECT_COUNT } from '../data/projects';
import AnimatedNumber from './AnimatedNumber';
import SectionHeading from './SectionHeading';

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
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sendCta = useMagnetic();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USER}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json: GitHubData) => setData(json))
      .catch(() => {
        /* silencioso: mantém o placeholder */
      });
    return () => {
      controller.abort();
      clearTimeout(copiedTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // Sem acesso à área de transferência: abre o cliente de e-mail.
      window.location.href = LINKS.email;
    }
  };

  const repos = data ? data.public_repos : null;
  const yearsOnGitHub = data
    ? Math.max(1, new Date().getFullYear() - new Date(data.created_at).getFullYear())
    : null;

  return (
    <section id="contato" className="section">
      <div className="container">
        <SectionHeading index="06" label="contato">
          Vamos <span className="text-gradient">Conversar?</span>
        </SectionHeading>

        <m.div className="contact-panel card glow" variants={rise} {...inView}>
          <div className="contact-panel-bg" aria-hidden="true" />
          <div className="contact-panel-text">
            <p className="contact-lead">
              Estou aberto a novas oportunidades. Se você tem uma vaga ou um projeto em mente, me
              mande uma mensagem.
            </p>
            <div className="contact-actions">
              <m.a href={LINKS.email} className="btn btn-primary" {...sendCta}>
                <SendIcon aria-hidden /> Enviar e-mail
              </m.a>
              <button type="button" className="btn btn-ghost copy-btn" onClick={copyEmail}>
                {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
                {copied ? 'Copiado!' : 'Copiar e-mail'}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'E-mail copiado para a área de transferência' : ''}
              </span>
            </div>
          </div>

          <div className="github-stats">
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
        </m.div>

        <m.div className="contact-grid" variants={stagger(0.1)} {...inView}>
          {CONTACTS.map(({ href, Icon, label, value, external }) => (
            <m.a
              key={label}
              href={href}
              className="contact-card card glow"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="card-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="contact-text">
                <span className="contact-label">{label}</span>
                <span className="contact-value">{value}</span>
              </span>
              <ArrowRightIcon aria-hidden className="contact-arrow" />
            </m.a>
          ))}
        </m.div>
      </div>
    </section>
  );
}
