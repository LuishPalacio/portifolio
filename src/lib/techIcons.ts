/**
 * Logos das tecnologias (Simple Icons) da faixa animada abaixo do Hero. Ficam fora de
 * `icons.ts` porque são grandes (~24 KB) e só a `TechMarquee` usa: como ela é carregada
 * com `lazy` no App, eles vão para um chunk separado e não pesam na primeira pintura.
 */
export {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiExpo,
  SiNodedotjs,
  SiPython,
  SiFlask,
  SiSpringboot,
  SiKotlin,
  SiSupabase,
  SiPostgresql,
  SiMysql,
  SiDuckdb,
  SiDocker,
  SiGithubactions,
  SiTailwindcss,
  SiVercel,
} from 'react-icons/si';

// Marcas sem ícone no Simple Icons
export { FaAws as AwsIcon, FaJava as JavaIcon } from 'react-icons/fa6';
