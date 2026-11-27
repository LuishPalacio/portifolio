import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { BriefcaseIcon } from '../lib/icons';
import { EASE_OUT } from '../lib/motion';
import SectionHeading from './SectionHeading';

interface Job {
  period: string;
  title: string;
  company: string;
  bullets: string[];
  /** Emprego atual: ganha o selo "atual" e o ponto aceso na linha do tempo. */
  current?: boolean;
}

const JOBS: Job[] = [
  {
    period: 'Desde Jun 2026',
    title: 'Assistente de T.I (Pleno)',
    company: 'ODEEN Intelligence for Security · Mogi das Cruzes, SP',
    current: true,
    bullets: [
      'Desenvolvi e coloquei em produção o sistema interno de controle de ativos de T.I que substituiu a planilha da equipe (cerca de 1.090 registros importados): Python/Flask, MySQL, login com conta Microsoft (SSO), controle de acesso por perfil, testes com pytest, CI no GitHub Actions, Docker e deploy no Railway',
      'Instalação e configuração de servidores, roteadores, switches e equipamentos eletrônicos de sistemas de T.I',
      'Manutenção preventiva e corretiva de hardware, diagnóstico e troubleshooting, reparo de falhas e montagem de circuitos',
      'Suporte técnico direto aos usuários, garantindo a estabilidade dos sistemas',
    ],
  },
  {
    period: 'Jul 2024 a Jun 2026',
    title: 'Professor de Informática e Robótica',
    company: 'Escola DiscoverON · Santa Isabel, SP',
    bullets: [
      'Aulas práticas e teóricas de lógica de programação e desenvolvimento web (HTML, CSS, JavaScript) para ensino fundamental e médio',
      'Robótica em C++, integrando hardware e software em projetos com sensores, motores e programação embarcada',
      'Automação de tarefas com Python, prototipagem de interfaces no Figma e Pacote Office',
      'Treinamento dos novos professores da equipe em robótica educacional',
      'Criação de material didático focado em boas práticas de código, resolução de problemas e pensamento computacional',
    ],
  },
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // A linha do tempo "enche" conforme a seção passa pela tela.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 55%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experiencia" className="section">
      <div className="container">
        <SectionHeading index="02" label="experiência">
          Experiência
        </SectionHeading>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-track" aria-hidden="true">
            <m.div className="timeline-fill" style={{ scaleY: reduceMotion ? 1 : fill }} />
          </div>

          {JOBS.map((job) => (
            <m.article
              key={job.title + job.company}
              className={`timeline-item${job.current ? ' current' : ''}`}
              // Entra pela esquerda, "saindo" da linha do tempo. Deslocamento negativo
              // nunca cria rolagem horizontal no celular (positivo criaria).
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <span className="timeline-dot" aria-hidden="true">
                <BriefcaseIcon />
              </span>
              <div className="timeline-card card glow">
                <div className="timeline-head">
                  <p className="experience-period">
                    {job.period}
                    {job.current && <span className="current-badge">atual</span>}
                  </p>
                  <h3 className="experience-title">{job.title}</h3>
                  <p className="experience-company">{job.company}</p>
                </div>
                <ul className="experience-list">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
