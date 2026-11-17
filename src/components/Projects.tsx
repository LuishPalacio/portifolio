import type { Ref } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { asset } from '../lib/assets';
import { ExternalIcon, GithubIcon, StarIcon } from '../lib/icons';
import { useTilt } from '../hooks/useTilt';
import {
  CATEGORIES,
  FINFLOW_CATEGORIES,
  PROJECTS,
  type CategoryId,
  type Project,
  type ProjectCategory,
} from '../data/projects';

const FINFLOW_TAGS = [
  'React Native',
  'Expo SDK 54',
  'Next.js 16',
  'TypeScript',
  'Supabase',
  'PostgreSQL / RLS',
  'Edge Functions',
  'Agente de IA',
  'EAS Build',
];

const FINFLOW_HIGHLIGHTS = [
  'Finn, agente de IA que converte linguagem natural em JSON validado por contrato, pergunta o que falta e só altera dados após confirmação explícita: 48 intenções, idempotência, allowlist de intents e controle de custo',
  'Segurança na camada do banco: Row Level Security e operações compostas em RPCs transacionais e idempotentes, não só na aplicação',
  'Cartões com faturas e parcelamentos, metas, fluxo de caixa realizado e previsto, conciliação bancária via CSV/OFX e fila de ações offline',
  'Biometria no mobile, login com Google e distribuição com EAS Build e EAS Update',
];

const matches = (categories: ProjectCategory[], filter: CategoryId) =>
  filter === 'todos' || categories.includes(filter);

const countFor = (filter: CategoryId) =>
  PROJECTS.filter((project) => matches(project.categories, filter)).length +
  (matches(FINFLOW_CATEGORIES, filter) ? 1 : 0);

/**
 * Entrada ao rolar até o card, saída ao sair do filtro e reposicionamento (layout)
 * quando outros cards somem. Substitui o `.fade-in`, que só observa elementos
 * presentes no carregamento e deixaria invisíveis os cards que voltam pelo filtro.
 */
const cardMotion = {
  layout: true,
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  whileHover: { y: -5 },
  viewport: { once: true, amount: 0.15 },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.2 } },
  transition: {
    layout: { type: 'spring', bounce: 0.18, duration: 0.5 },
    default: { duration: 0.45, ease: 'easeOut' },
  },
} as const;

interface ProjectsProps {
  filter: CategoryId;
  onFilterChange: (filter: CategoryId) => void;
}

export default function Projects({ filter, onFilterChange }: ProjectsProps) {
  const visible = PROJECTS.filter((project) => matches(project.categories, filter));
  const showFinflow = matches(FINFLOW_CATEGORIES, filter);
  const total = visible.length + (showFinflow ? 1 : 0);

  return (
    <section id="projetos" className="section">
      <div className="container">
        <h2 className="section-title fade-in">Projetos</h2>

        <div className="project-filters fade-in" role="group" aria-label="Filtrar projetos por área">
          {CATEGORIES.map(({ id, label }) => {
            const active = id === filter;
            return (
              <button
                key={id}
                type="button"
                className={`filter-btn${active ? ' active' : ''}`}
                aria-pressed={active}
                onClick={() => onFilterChange(id)}
              >
                {active && (
                  <m.span
                    layoutId="project-filter-pill"
                    className="filter-pill"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                  />
                )}
                <span className="filter-label">{label}</span>
                <span className="filter-count">{countFor(id)}</span>
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {`Mostrando ${total} ${total === 1 ? 'projeto' : 'projetos'}`}
        </p>

        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {showFinflow && <FinflowCard key="finflow" />}
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/** Card em destaque: só o brilho segue o mouse (inclinar um card largo fica estranho). */
function FinflowCard({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const spotlight = useTilt(0);

  return (
    <m.div
      ref={ref}
      className="project-card featured"
      {...cardMotion}
      onPointerMove={spotlight.onPointerMove}
    >
      <span className="card-spotlight" aria-hidden="true" />
      <div className="project-inner">
        <div className="project-info">
          <span className="featured-badge">
            <StarIcon aria-hidden /> Projeto Destaque
          </span>
          <h3>FinFlow Finanças</h3>
          <p>
            Plataforma de finanças pessoais e compartilhadas com app <strong>mobile</strong> (React
            Native + Expo Router) e painel <strong>web em Next.js</strong>, sobre o mesmo back-end em{' '}
            <strong>Supabase</strong> (PostgreSQL, Auth, RLS, RPCs e Edge Functions) e as mesmas
            regras financeiras. Desenvolvido em dupla com o Gabriel Henrique, com os dois atuando no
            front-end e no back-end.
          </p>
          <ul className="project-highlights">
            {FINFLOW_HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="tags">
            {FINFLOW_TAGS.map((tag) => (
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
            <a
              href="https://finflow-mauve-chi.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="btn-project"
            >
              <ExternalIcon aria-hidden /> Acessar Painel Web
            </a>
          </div>
        </div>
        <div className="finflow-phone-col">
          <div className="phone-mockup">
            <picture>
              <source srcSet={asset('img/finflow-screenshot.webp')} type="image/webp" />
              <img
                src={asset('img/finflow-screenshot.jpeg')}
                alt="Tela inicial do app FinFlow com saldo, visão do mês e despesas por categoria (valores fictícios)"
                className="phone-screenshot"
                width={540}
                height={1170}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </m.div>
  );
}

function ProjectCard({ project, ref }: { project: Project; ref?: Ref<HTMLDivElement> }) {
  const tilt = useTilt();

  return (
    <m.div
      ref={ref}
      className="project-card"
      {...cardMotion}
      style={tilt.style}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
    >
      <span className="card-spotlight" aria-hidden="true" />
      <div className="project-info">
        {project.featured && (
          <span className="featured-badge">
            <StarIcon aria-hidden /> Destaque
          </span>
        )}
        <h3>
          {project.title}
          {project.status && <span className="status-badge">{project.status}</span>}
        </h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {(project.repo || project.live) && (
          <div className="project-links">
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" className="btn-project">
                <GithubIcon aria-hidden /> {project.repoLabel ?? 'Ver Código'}
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-project">
                <ExternalIcon aria-hidden /> {project.liveLabel ?? 'Ver Online'}
              </a>
            )}
          </div>
        )}
      </div>
    </m.div>
  );
}
