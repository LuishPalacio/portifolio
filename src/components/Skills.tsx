import type { IconType } from 'react-icons';
import {
  AiIcon,
  ChipIcon,
  CodeIcon,
  DatabaseIcon,
  ReactIcon,
  ServerIcon,
  WrenchIcon,
} from '../lib/icons';

interface SkillCard {
  Icon: IconType;
  title: string;
  text: string;
  highlight?: boolean;
}

const SKILLS: SkillCard[] = [
  {
    Icon: ReactIcon,
    title: 'React & Mobile',
    text: 'React, React Native, Next.js, Expo SDK 54, Expo Router, TypeScript, React Navigation, Reanimated',
    highlight: true,
  },
  {
    Icon: ServerIcon,
    title: 'Back-end & APIs',
    text: 'Node.js, Python (Flask, Django), APIs REST, arquitetura MVC, POO',
  },
  {
    Icon: AiIcon,
    title: 'Integração com IA',
    text: 'APIs de LLMs (Groq, Llama 3.3 70B), agentes estruturados via JSON Schema, linguagem natural convertida em ações validadas',
  },
  {
    Icon: DatabaseIcon,
    title: 'Banco de Dados',
    text: 'PostgreSQL, Supabase (Auth + Row Level Security), MySQL, SQLAlchemy, SQLite, modelagem relacional',
  },
  {
    Icon: CodeIcon,
    title: 'Mobile Nativo & Linguagens',
    text: 'Kotlin, Jetpack Compose, MVVM · JavaScript, TypeScript, Python, C++, HTML5, CSS3',
  },
  {
    Icon: WrenchIcon,
    title: 'Ferramentas & DevOps',
    text: 'Git, GitHub, GitHub Actions (CI/CD), Docker, Docker Compose, pytest, Postman, Linux, VS Code',
  },
  {
    Icon: ChipIcon,
    title: 'Eletrônica, IoT & Design',
    text: 'Arduino, ESP32, Raspberry Pi Pico · Figma, Canva, Photoshop, Pacote Office',
  },
];

export default function Skills() {
  return (
    <section id="habilidades" className="section">
      <div className="container">
        <h2 className="section-title fade-in">Habilidades</h2>
        <div className="skills-grid">
          {SKILLS.map(({ Icon, title, text, highlight }) =>
            highlight ? (
              <div className="skill-card mobile-highlight fade-in" key={title}>
                <Icon aria-hidden />
                <div className="skill-text">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ) : (
              <div className="skill-card fade-in" key={title}>
                <Icon aria-hidden />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
