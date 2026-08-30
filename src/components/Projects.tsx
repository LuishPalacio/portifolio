import type { ReactNode } from 'react';
import { asset } from '../lib/assets';
import { GithubIcon, StarIcon } from '../lib/icons';

interface Project {
  title: string;
  description: ReactNode;
  tags: string[];
  repo?: string;
  repoLabel?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'StockFlow',
    featured: true,
    description: (
      <>
        Sistema de controle de inventário de T.I desenvolvido <strong>na ODEEN</strong>, migrado de
        uma planilha Excel (~1.090 linhas) para uma aplicação containerizada com{' '}
        <strong>Docker Compose</strong>. Autenticação por perfis de acesso, auditoria de alterações,
        painel de indicadores, API JSON e suíte de testes (pytest) com CI no GitHub Actions. Versão
        pública com dados fictícios.
      </>
    ),
    tags: ['Python', 'Flask', 'PostgreSQL', 'Docker Compose', 'pytest', 'GitHub Actions'],
    repo: 'https://github.com/LuishPalacio/stockflow',
    repoLabel: 'Ver Repositório',
  },
  {
    title: 'Este Portfólio',
    featured: true,
    description: (
      <>
        Single-page em <strong>React + Vite + TypeScript</strong> (modo estrito), com componentes
        tipados e hooks próprios para scrollspy, tema claro/escuro e animações on-scroll. Pipeline de
        CI com typecheck, lint e build, e deploy automático no GitHub Pages via GitHub Actions.
      </>
    ),
    tags: ['React', 'TypeScript', 'Vite', 'GitHub Actions', 'CI/CD'],
    repo: 'https://github.com/LuishPalacio/portifolio',
    repoLabel: 'Ver Repositório',
  },
  {
    title: 'Sistema de Gerenciamento de Tarefas',
    description: (
      <>
        Sistema fullstack em <strong>Python / Flask</strong> com arquitetura <strong>MVC</strong>.
        Painel Kanban, gestão de usuários, distribuição de tarefas, notificações por e-mail e
        controle de prazos. Desenvolvido no 3º semestre da graduação (Braz Cubas).
      </>
    ),
    tags: ['Python (Flask)', 'SQLAlchemy', 'MVC', 'Kanban'],
    repo: 'https://github.com/LuishPalacio/sistema-gerenciamento-tarefas',
    repoLabel: 'Ver Código',
  },
  {
    title: 'Sistema de Pedidos (Backend)',
    description: (
      <>
        Implementação em <strong>Java</strong> focada em lógica de negócio e Orientação a Objetos.
        Estrutura robusta para processamento de pedidos, demonstrando domínio de POO e arquitetura.
      </>
    ),
    tags: ['Java', 'POO', 'Backend'],
    repo: 'https://github.com/LuishPalacio/SISTEMA-DE-GERENCIAMENTO-DE-PEDIDOS',
    repoLabel: 'Ver Código',
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="section">
      <div className="container">
        <h2 className="section-title fade-in">Projetos</h2>
        <div className="projects-grid">
          <div className="project-card featured fade-in">
            <div className="project-inner">
              <div className="project-info">
                <span className="featured-badge">
                  <StarIcon aria-hidden /> Projeto Destaque
                </span>
                <h3>FinFlow Finanças</h3>
                <p>
                  App <strong>mobile e web</strong> de finanças pessoais e compartilhadas. Um agente
                  de IA traduz linguagem natural em ações validadas no banco (17+ intents) e nunca
                  altera dados diretamente. Multi-tenant via <strong>Row Level Security</strong> no
                  PostgreSQL, e um dashboard web em <strong>Next.js</strong> compartilha a mesma base
                  e as regras de negócio do app mobile (React Native + Expo).
                </p>
                <div className="tags">
                  {[
                    'React Native',
                    'Expo SDK 54',
                    'TypeScript',
                    'Next.js',
                    'Supabase',
                    'PostgreSQL / RLS',
                    'Groq / Llama 3.3',
                    'Expo Router',
                  ].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href="https://github.com/FinFlowA/app-financas"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-project"
                  >
                    <GithubIcon aria-hidden /> Ver Repositório
                  </a>
                </div>
              </div>
              <div className="finflow-phone-col">
                <div className="phone-mockup">
                  <picture>
                    <source srcSet={asset('img/finflow-screenshot.webp')} type="image/webp" />
                    <img
                      src={asset('img/finflow-screenshot.jpeg')}
                      alt="FinFlow app na tela inicial"
                      className="phone-screenshot"
                      width={440}
                      height={982}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          {PROJECTS.map((project) => (
            <div className="project-card fade-in" key={project.title}>
              <div className="project-info">
                {project.featured && (
                  <span className="featured-badge">
                    <StarIcon aria-hidden /> Destaque
                  </span>
                )}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {project.repo && (
                  <div className="project-links">
                    <a href={project.repo} target="_blank" rel="noreferrer" className="btn-project">
                      <GithubIcon aria-hidden /> {project.repoLabel ?? 'Ver Código'}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
