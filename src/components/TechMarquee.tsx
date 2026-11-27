import type { IconType } from 'react-icons';
import {
  AwsIcon,
  JavaIcon,
  SiDocker,
  SiDuckdb,
  SiExpo,
  SiFlask,
  SiGithubactions,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from '../lib/techIcons';

const TECHS: { name: string; Icon: IconType }[] = [
  { name: 'React', Icon: SiReact },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Python', Icon: SiPython },
  { name: 'React Native', Icon: SiReact },
  { name: 'Expo', Icon: SiExpo },
  { name: 'Java', Icon: JavaIcon },
  { name: 'Spring Boot', Icon: SiSpringboot },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Flask', Icon: SiFlask },
  { name: 'Supabase', Icon: SiSupabase },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'DuckDB', Icon: SiDuckdb },
  { name: 'Kotlin', Icon: SiKotlin },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'Docker', Icon: SiDocker },
  { name: 'GitHub Actions', Icon: SiGithubactions },
  { name: 'AWS', Icon: AwsIcon },
  { name: 'Vercel', Icon: SiVercel },
];

/**
 * Faixa de tecnologias rolando em loop. A lista aparece duas vezes para o loop não ter
 * emenda; a cópia fica escondida de leitores de tela. Pausa com o mouse em cima e, com
 * "reduzir movimento", vira uma lista parada (ver index.css).
 */
export default function TechMarquee() {
  return (
    <section className="tech-strip" aria-label="Tecnologias com que trabalho">
      <p className="tech-strip-label" aria-hidden="true">
        tecnologias do meu dia a dia
      </p>
      <div className="marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-track" aria-hidden={copy === 1 ? true : undefined}>
            {TECHS.map(({ name, Icon }) => (
              <li key={name}>
                <Icon aria-hidden />
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
