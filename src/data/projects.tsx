import type { ReactNode } from 'react';

/** Filtros da seção de projetos (também usados pelo comando `projetos` do terminal). */
export const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'ia', label: 'IA' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'backend', label: 'Back-end' },
  { id: 'academico', label: 'Acadêmico' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];
export type ProjectCategory = Exclude<CategoryId, 'todos'>;

export function isCategoryId(value: string): value is CategoryId {
  return CATEGORIES.some((category) => category.id === value);
}

/** Categorias do card em destaque do FinFlow (fora de PROJECTS). */
export const FINFLOW_CATEGORIES: ProjectCategory[] = ['ia', 'web', 'mobile', 'backend'];

export interface Project {
  title: string;
  description: ReactNode;
  tags: string[];
  categories: ProjectCategory[];
  repo?: string;
  repoLabel?: string;
  /** Link para a versão publicada (site, app web etc.). */
  live?: string;
  liveLabel?: string;
  /** Selo amarelo ao lado do título, ex.: "Em desenvolvimento". */
  status?: string;
  featured?: boolean;
}

/**
 * Cards da grade de projetos. O FinFlow fica fora desta lista porque tem um card
 * próprio, em largura total, com mockup de celular (ver components/Projects.tsx).
 */
export const PROJECTS: Project[] = [
  {
    title: 'Agente de IA para Análise de Vendas',
    categories: ['ia', 'backend'],
    featured: true,
    description: (
      <>
        Agente que responde em português perguntas sobre as vendas de um restaurante fictício
        (Sabor da Casa) e encontrou um padrão escondido de propósito nos dados. A IA{' '}
        <strong>não escreve SQL</strong>: escolhe entre 8 ferramentas fixas com SQL parametrizado no{' '}
        <strong>DuckDB</strong>, e todo número sai calculado pelo Python. Previsão de faturamento
        com regressão Ridge (11,8% de erro) e custo zero: DuckDB, scikit-learn e Groq no lugar de
        Athena, SageMaker e Bedrock.
      </>
    ),
    tags: ['Python', 'Groq · gpt-oss-120b', 'Function Calling', 'DuckDB', 'scikit-learn', 'pytest'],
    repo: 'https://github.com/LuishPalacio/sabor-da-casa-analytics-agent',
    repoLabel: 'Ver Repositório',
  },
  {
    title: 'Empório da Música · Agente de Atendimento',
    categories: ['ia', 'backend'],
    featured: true,
    description: (
      <>
        Agente de atendimento ao cliente para uma loja fictícia de instrumentos musicais, feito como
        desafio técnico de AI Engineering. Usa <strong>tool calling nativo</strong> com 6 ferramentas
        fixas: consulta catálogo, estoque, pedidos e promoções no <strong>MySQL</strong> e busca nas
        políticas da loja com retrieval léxico, sem inventar preço, prazo ou regra. Conversas
        persistidas e retomáveis, preços formatados em Python e mais de 40 testes com pytest.
      </>
    ),
    tags: ['Python', 'Groq · gpt-oss-120b', 'Tool Calling', 'RAG', 'MySQL', 'Docker Compose'],
    repo: 'https://github.com/LuishPalacio/emporio-da-musica-agent',
    repoLabel: 'Ver Repositório',
  },
  {
    title: 'StockFlow',
    categories: ['web', 'backend'],
    featured: true,
    description: (
      <>
        Sistema de controle de ativos de T.I que <strong>desenvolvi e coloquei em produção na
        ODEEN</strong>, substituindo a planilha da equipe (cerca de 1.090 registros importados).
        Python/Flask e MySQL, login com conta Microsoft (SSO), controle de acesso por perfil,
        auditoria de alterações, Docker e deploy no Railway. A versão pública usa PostgreSQL e dados
        fictícios, com testes em pytest e CI no GitHub Actions.
      </>
    ),
    tags: ['Python', 'Flask', 'MySQL / PostgreSQL', 'Microsoft SSO', 'Docker', 'GitHub Actions'],
    repo: 'https://github.com/LuishPalacio/stockflow',
    repoLabel: 'Ver Repositório',
  },
  {
    title: 'Task Manager',
    categories: ['web', 'backend'],
    status: 'em desenvolvimento',
    description: (
      <>
        API REST em <strong>Java 21 e Spring Boot 3</strong> para gerenciar projetos e tarefas, com
        autenticação JWT, migrações com Flyway e anexos no <strong>AWS S3</strong> via URLs
        pré-assinadas (LocalStack para rodar localmente sem custo). Front-end em React + TypeScript
        com board por status, prioridade e prazo.
      </>
    ),
    tags: ['Java 21', 'Spring Boot', 'JWT', 'PostgreSQL', 'AWS S3', 'React', 'TypeScript'],
  },
  {
    title: 'FoodNode Analytics',
    categories: ['backend', 'academico'],
    description: (
      <>
        Roteamento ótimo de entregas de fast-food com <strong>Dijkstra</strong> (min-heap) e{' '}
        <strong>BFS</strong> em grafos dirigidos ponderados. Arquitetura em 4 camadas com o domínio
        livre de I/O, interface desktop em Tkinter, CLI e 65 testes automatizados. Projeto em grupo
        da disciplina de Teoria dos Grafos (Braz Cubas).
      </>
    ),
    tags: ['Python', 'Grafos', 'Dijkstra / BFS', 'Tkinter', 'pytest'],
    repo: 'https://github.com/LuishPalacio/foodnode-analytics',
    repoLabel: 'Ver Código',
  },
  {
    title: 'Este Portfólio',
    categories: ['web'],
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
    categories: ['web', 'backend', 'academico'],
    description: (
      <>
        Sistema fullstack em <strong>Python / Flask</strong> com arquitetura <strong>MVC</strong>.
        Painel Kanban, modelos de processos reutilizáveis, gestão de usuários, notificações por
        e-mail e controle de prazos. Desenvolvido no 3º semestre da graduação (Braz Cubas).
      </>
    ),
    tags: ['Python (Flask)', 'SQLAlchemy', 'MVC', 'Kanban'],
    repo: 'https://github.com/LuishPalacio/sistema-gerenciamento-tarefas',
    repoLabel: 'Ver Código',
  },
  {
    title: 'Ferreira & Moreira',
    categories: ['web'],
    description: (
      <>
        Site institucional de um escritório de <strong>arquitetura e engenharia</strong> em São
        Paulo, com página de serviços e galeria de projetos: desenvolvimento, hospedagem e
        manutenção.
      </>
    ),
    tags: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    repo: 'https://github.com/LuishPalacio/ferreira-moreira-site',
    repoLabel: 'Ver Código',
    live: 'https://luishpalacio.github.io/ferreira-moreira-site/',
    liveLabel: 'Ver Site',
  },
  {
    title: 'Sistema de Pedidos (Backend)',
    categories: ['backend', 'academico'],
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

/** Total exibido nas estatísticas de contato: os cards acima + o FinFlow. */
export const PROJECT_COUNT = PROJECTS.length + 1;
