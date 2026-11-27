import { m } from 'motion/react';
import type { IconType } from 'react-icons';
import {
  AiIcon,
  ChipIcon,
  CodeIcon,
  DatabaseIcon,
  ReactIcon,
  ServerIcon,
  ShieldIcon,
  SparklesIcon,
  UserCheckIcon,
  WrenchIcon,
} from '../lib/icons';
import { inView, rise } from '../lib/motion';
import SectionHeading from './SectionHeading';

interface SkillGroup {
  Icon: IconType;
  title: string;
  items: string[];
  /** Na grade de 3 colunas: "wide" ocupa duas colunas e "tall" ocupa duas linhas. */
  size?: 'wide' | 'tall';
  /** Mostra o fluxo "o modelo interpreta → o código valida → o usuário confirma". */
  aiFlow?: boolean;
}

/** A ordem importa: com `grid-auto-flow: dense`, ela monta o mosaico da grade. */
const SKILLS: SkillGroup[] = [
  {
    Icon: ReactIcon,
    title: 'Front-end & Mobile',
    size: 'wide',
    items: [
      'React',
      'Next.js',
      'React Native',
      'Expo SDK 54',
      'Expo Router',
      'TypeScript',
      'Tailwind CSS',
      'Reanimated',
      'EAS Build',
    ],
  },
  {
    Icon: AiIcon,
    title: 'IA Generativa & Agentes',
    size: 'tall',
    aiFlow: true,
    items: [
      'LLMs (Groq: gpt-oss-120b, Llama 3.3 70B)',
      'Tool / function calling',
      'Saídas estruturadas com JSON Schema',
      'RAG',
    ],
  },
  {
    Icon: ServerIcon,
    title: 'Back-end & APIs',
    items: [
      'Java (Spring Boot, JWT)',
      'Python (Flask, Django)',
      'Node.js',
      'APIs REST',
      'Edge Functions',
      'Arquitetura MVC e em camadas',
      'POO',
    ],
  },
  {
    Icon: DatabaseIcon,
    title: 'Banco de Dados & Análise',
    items: [
      'PostgreSQL',
      'Supabase (Auth + RLS + RPCs)',
      'MySQL',
      'SQLite',
      'DuckDB',
      'SQLAlchemy',
      'Flyway',
      'scikit-learn',
      'matplotlib',
    ],
  },
  {
    Icon: CodeIcon,
    title: 'Mobile Nativo & Linguagens',
    items: [
      'Kotlin',
      'Jetpack Compose',
      'MVVM',
      'TypeScript',
      'JavaScript',
      'Python',
      'Java',
      'C++',
      'HTML5',
      'CSS3',
    ],
  },
  {
    Icon: WrenchIcon,
    title: 'DevOps, Cloud & Ferramentas',
    items: [
      'Git',
      'GitHub Actions (CI/CD)',
      'Docker',
      'Docker Compose',
      'AWS (S3, EC2)',
      'Railway',
      'Vercel',
      'Microsoft Entra ID (SSO)',
      'Linux',
      'pytest',
      'Postman',
    ],
  },
  {
    Icon: ChipIcon,
    title: 'Eletrônica, IoT & Design',
    items: ['Arduino', 'ESP32', 'Raspberry Pi Pico', 'Figma', 'Canva', 'Photoshop', 'Pacote Office'],
  },
];

const AI_FLOW: { Icon: IconType; label: string }[] = [
  { Icon: SparklesIcon, label: 'O modelo interpreta' },
  { Icon: ShieldIcon, label: 'O código valida' },
  { Icon: UserCheckIcon, label: 'O usuário confirma' },
];

export default function Skills() {
  return (
    <section id="habilidades" className="section">
      <div className="container">
        <SectionHeading index="04" label="habilidades">
          Habilidades
        </SectionHeading>

        <div className="skills-grid">
          {SKILLS.map(({ Icon, title, items, size, aiFlow }, i) => (
            <m.div
              key={title}
              className={`skill-card card glow${size ? ` ${size}` : ''}`}
              variants={rise}
              custom={i % 3}
              {...inView}
            >
              <div className="skill-head">
                <span className="card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{title}</h3>
              </div>

              <ul className="chip-list">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {aiFlow && (
                <div className="ai-flow">
                  <p className="ai-flow-title">Como integro IA</p>
                  <div className="ai-steps-wrap">
                    {/* Linha com um ponto que percorre os três passos, atrás dos ícones. */}
                    <span className="ai-track" aria-hidden="true">
                      <span className="ai-dot" />
                    </span>
                    <ol className="ai-steps">
                      {AI_FLOW.map(({ Icon: StepIcon, label }) => (
                        <li key={label}>
                          <span className="ai-step-icon" aria-hidden="true">
                            <StepIcon />
                          </span>
                          {label}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
