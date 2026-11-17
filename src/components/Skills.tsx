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
    title: 'Front-end & Mobile',
    text: 'React, Next.js, React Native, Expo SDK 54, Expo Router, TypeScript, Tailwind CSS, Reanimated, EAS Build',
    highlight: true,
  },
  {
    Icon: ServerIcon,
    title: 'Back-end & APIs',
    text: 'Java (Spring Boot, JWT), Python (Flask, Django), Node.js, APIs REST, Edge Functions, arquitetura MVC e em camadas, POO',
  },
  {
    Icon: AiIcon,
    title: 'IA Generativa & Agentes',
    text: 'LLMs (Groq: gpt-oss-120b, Llama 3.3 70B), tool/function calling, saídas estruturadas com JSON Schema, RAG. O modelo interpreta, o código valida e o usuário confirma',
  },
  {
    Icon: DatabaseIcon,
    title: 'Banco de Dados & Análise',
    text: 'PostgreSQL, Supabase (Auth + RLS + RPCs), MySQL, SQLite, DuckDB, SQLAlchemy, Flyway · scikit-learn, matplotlib',
  },
  {
    Icon: CodeIcon,
    title: 'Mobile Nativo & Linguagens',
    text: 'Kotlin, Jetpack Compose, MVVM · TypeScript, JavaScript, Python, Java, C++, HTML5, CSS3',
  },
  {
    Icon: WrenchIcon,
    title: 'DevOps, Cloud & Ferramentas',
    text: 'Git, GitHub Actions (CI/CD), Docker, Docker Compose, AWS (S3, EC2), Railway, Vercel, Microsoft Entra ID (SSO), Linux, pytest, Postman',
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
