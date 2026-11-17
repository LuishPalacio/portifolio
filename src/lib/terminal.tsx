import type { ReactNode } from 'react';
import { CATEGORIES, PROJECTS, isCategoryId, type CategoryId } from '../data/projects';
import { asset } from './assets';
import { CV_URL, EMAIL, GITHUB_USER, LINKS } from './links';

/** O que os comandos podem fazer na página. */
export interface TerminalActions {
  setProjectFilter: (filter: CategoryId) => void;
  toggleTheme: () => void;
  scrollTo: (sectionId: string) => void;
  openUrl: (url: string) => void;
}

/** Retorno especial: limpa a tela do terminal. */
export const CLEAR = Symbol('clear');
export type CommandOutput = ReactNode | typeof CLEAR;

interface Command {
  /** Como aparece no `help` (ex.: "projetos [área]"). */
  usage: string;
  description: string;
  /** Comandos escondidos não aparecem no `help` (easter eggs). */
  hidden?: boolean;
  run: (args: string[], actions: TerminalActions) => CommandOutput;
}

const SECTIONS = ['sobre', 'experiencia', 'formacao', 'habilidades', 'projetos', 'contato'];

/** Minúsculas, sem acento e sem hífen: "Acadêmico" → "academico", "Back-end" → "backend". */
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/-/g, '');

const muted = (text: ReactNode) => <span className="term-muted">{text}</span>;
const accent = (text: ReactNode) => <span className="term-accent">{text}</span>;
const error = (text: ReactNode) => <span className="term-error">{text}</span>;
const link = (href: string, text: string) => (
  <a className="term-link" href={href} target="_blank" rel="noreferrer">
    {text}
  </a>
);

const AREAS = CATEGORIES.map((category) => category.id).join(' | ');

const COMMANDS: Record<string, Command> = {
  help: {
    usage: 'help',
    description: 'lista os comandos',
    run: () => (
      <>
        {Object.values(COMMANDS)
          .filter((command) => !command.hidden)
          .map((command) => (
            <span key={command.usage}>
              {accent(command.usage.padEnd(18))}
              {command.description}
              {'\n'}
            </span>
          ))}
        {muted('Dica: Tab completa, ↑ e ↓ navegam no histórico.')}
      </>
    ),
  },
  sobre: {
    usage: 'sobre',
    description: 'quem eu sou',
    run: () => (
      <>
        Luis Henrique Palacio · {accent('Desenvolvedor Full Stack')}
        {'\n'}React, React Native e TypeScript; Python, Java e Node.js no back-end.
        {'\n'}IA generativa com segurança: o modelo interpreta, o código valida e o usuário
        confirma.
        {'\n'}
        {muted('Ciência da Computação (Braz Cubas, 6º semestre) · Assistente de T.I na ODEEN')}
      </>
    ),
  },
  stack: {
    usage: 'stack',
    description: 'tecnologias que uso',
    run: () => (
      <>
        {accent('front   ')} React, Next.js, TypeScript, Tailwind
        {'\n'}
        {accent('mobile  ')} React Native, Expo, Kotlin, Jetpack Compose
        {'\n'}
        {accent('back    ')} Java (Spring Boot), Python (Flask), Node.js
        {'\n'}
        {accent('dados   ')} PostgreSQL, Supabase, MySQL, DuckDB
        {'\n'}
        {accent('ia      ')} LLMs, tool calling, JSON Schema, RAG
        {'\n'}
        {accent('devops  ')} Git, GitHub Actions, Docker, AWS (S3, EC2)
      </>
    ),
  },
  experiencia: {
    usage: 'experiencia',
    description: 'onde trabalhei',
    run: () => (
      <>
        {accent('2026 →    ')} Assistente de T.I (Pleno) · ODEEN
        {'\n'}
        {muted('           sistema de ativos de T.I em produção (Flask, MySQL, SSO)')}
        {'\n'}
        {accent('2024-2026 ')} Professor de Informática e Robótica · DiscoverON
      </>
    ),
  },
  projetos: {
    usage: 'projetos [área]',
    description: 'lista ou filtra os projetos',
    run: (args, actions) => {
      if (args.length === 0) {
        const titles = ['FinFlow Finanças', ...PROJECTS.map((project) => project.title)];
        return (
          <>
            {titles.map((title) => `• ${title}\n`).join('')}
            {muted(`Filtre com: projetos <${AREAS}>`)}
          </>
        );
      }

      const area = normalize(args[0]);
      if (!isCategoryId(area)) {
        return error(`área desconhecida: ${args[0]}. Use: ${AREAS}`);
      }

      actions.setProjectFilter(area);
      actions.scrollTo('projetos');
      const label = CATEGORIES.find((category) => category.id === area)?.label ?? area;
      return <>Filtro {accent(label)} aplicado. Indo até os projetos…</>;
    },
  },
  contato: {
    usage: 'contato',
    description: 'e-mail, LinkedIn e GitHub',
    run: () => (
      <>
        {accent('email    ')} {link(LINKS.email, EMAIL)}
        {'\n'}
        {accent('linkedin ')} {link(LINKS.linkedin, 'linkedin.com/in/luishpalacio')}
        {'\n'}
        {accent('github   ')} {link(LINKS.github, `github.com/${GITHUB_USER}`)}
      </>
    ),
  },
  cv: {
    usage: 'cv',
    description: 'abre meu currículo (PDF)',
    run: (_args, actions) => {
      actions.openUrl(asset(CV_URL));
      return 'Abrindo o currículo em uma nova aba…';
    },
  },
  github: {
    usage: 'github',
    description: 'abre meu GitHub',
    run: (_args, actions) => {
      actions.openUrl(LINKS.github);
      return 'Abrindo o GitHub…';
    },
  },
  linkedin: {
    usage: 'linkedin',
    description: 'abre meu LinkedIn',
    run: (_args, actions) => {
      actions.openUrl(LINKS.linkedin);
      return 'Abrindo o LinkedIn…';
    },
  },
  ls: {
    usage: 'ls',
    description: 'lista as seções da página',
    run: () => SECTIONS.map((section) => `${section}/`).join('  '),
  },
  cd: {
    usage: 'cd <seção>',
    description: 'vai até uma seção',
    run: (args, actions) => {
      const section = normalize(args[0] ?? '').replace(/\/$/, '');
      if (!section) return error('uso: cd <seção>. Veja as seções com ls.');
      if (!SECTIONS.includes(section)) return error(`cd: seção não encontrada: ${args[0]}`);
      actions.scrollTo(section);
      return muted(`→ ${section}/`);
    },
  },
  tema: {
    usage: 'tema',
    description: 'alterna tema claro/escuro',
    run: (_args, actions) => {
      actions.toggleTheme();
      return 'Tema alternado.';
    },
  },
  clear: {
    usage: 'clear',
    description: 'limpa o terminal',
    run: () => CLEAR,
  },
  sudo: {
    usage: 'sudo',
    description: '',
    hidden: true,
    run: (args, actions) => {
      if (args.some((arg) => ['contratar', 'hire'].includes(normalize(arg)))) {
        actions.scrollTo('contato');
        return <>Permissão concedida. {accent('Te levando até o contato 🚀')}</>;
      }
      return error('Permissão negada. Tente: sudo contratar 😉');
    },
  },
};

const ALIASES: Record<string, string> = {
  ajuda: 'help',
  whoami: 'sobre',
  skills: 'stack',
  habilidades: 'stack',
  experiencias: 'experiencia',
  projects: 'projetos',
  contact: 'contato',
  curriculo: 'cv',
  theme: 'tema',
  limpar: 'clear',
  cls: 'clear',
};

/** Executa uma linha digitada e devolve a saída (ou `CLEAR`). */
export function runCommand(line: string, actions: TerminalActions): CommandOutput {
  const [rawName, ...args] = line.trim().split(/\s+/);
  const name = normalize(rawName);
  const command = COMMANDS[ALIASES[name] ?? name];

  if (!command) {
    return error(`comando não encontrado: ${rawName}. Digite help.`);
  }
  return command.run(args, actions);
}

export interface Completion {
  /** Linha completada, quando só uma opção serve. */
  line?: string;
  /** Opções possíveis, quando há mais de uma. */
  candidates: string[];
}

/** Completa o comando (1ª palavra, incluindo apelidos) ou o argumento de `projetos`/`cd`. */
export function completeCommand(line: string): Completion {
  const parts = line.trimStart().split(/\s+/);
  const resolve = (options: string[], partial: string, toLine: (match: string) => string) => {
    const matches = options.filter((option) => option.startsWith(normalize(partial)));
    return matches.length === 1
      ? { line: toLine(matches[0]), candidates: [] }
      : { candidates: matches };
  };

  if (parts.length === 1) {
    // Comandos principais primeiro; apelidos ("whoami", "limpar"…) só se nenhum servir,
    // para "proj" completar "projetos" em vez de empatar com "projects".
    const toLine = (match: string) => `${match} `;
    const visible = Object.keys(COMMANDS).filter((name) => !COMMANDS[name].hidden);
    const primary = resolve(visible, parts[0], toLine);
    return primary.line || primary.candidates.length > 0
      ? primary
      : resolve(Object.keys(ALIASES), parts[0], toLine);
  }

  if (parts.length === 2) {
    const command = ALIASES[normalize(parts[0])] ?? normalize(parts[0]);
    const options =
      command === 'projetos'
        ? CATEGORIES.map((category) => category.id)
        : command === 'cd'
          ? SECTIONS
          : [];
    return resolve(options, parts[1], (match) => `${parts[0]} ${match}`);
  }

  return { candidates: [] };
}
