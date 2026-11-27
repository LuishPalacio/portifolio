import { m } from 'motion/react';
import type { IconType } from 'react-icons';
import { asset } from '../lib/assets';
import {
  BookIcon,
  BriefcaseIcon,
  BugIcon,
  GraduationIcon,
  ShieldIcon,
  TargetIcon,
  WarningIcon,
} from '../lib/icons';
import { EASE_OUT, fadeUp, inView, pop, stagger } from '../lib/motion';
import SectionHeading from './SectionHeading';

const TAGS = [
  'React',
  'React Native',
  'Next.js',
  'TypeScript',
  'Python',
  'Java / Spring Boot',
  'Supabase / PostgreSQL',
  'IA Generativa & Agentes',
  'Docker',
  'Inglês intermediário',
];

const PRINCIPLES: { Icon: IconType; text: string }[] = [
  { Icon: TargetIcon, text: 'Começo pelo problema, não pela ferramenta.' },
  {
    Icon: ShieldIcon,
    text: 'Nenhum dado entra sem validação e nenhuma ação crítica roda sem confirmação.',
  },
  { Icon: BugIcon, text: 'Todo bug encontrado vira teste automatizado.' },
  { Icon: WarningIcon, text: 'Prefiro um erro explícito a um resultado improvisado e errado.' },
  { Icon: BookIcon, text: 'Documento as decisões técnicas.' },
];

export default function About() {
  return (
    <section id="sobre" className="section">
      <div className="container">
        <SectionHeading index="01" label="sobre">
          Sobre <span className="text-gradient">Mim</span>
        </SectionHeading>

        <div className="sobre-layout">
          <m.div className="sobre-content" variants={stagger(0.12)} {...inView}>
            <m.p variants={fadeUp}>
              <strong>Desenvolvedor Full Stack</strong> com foco em{' '}
              <strong>React, React Native e TypeScript</strong>. Construo aplicações web e mobile da
              interface ao banco de dados e integro <strong>IA generativa com segurança</strong>: o
              modelo interpreta, o código valida e o usuário confirma.
            </m.p>
            <m.p variants={fadeUp}>
              Estudante do <strong>6º semestre de Ciência da Computação</strong> no Centro
              Universitário Braz Cubas (conclusão prevista para Dezembro/2027). Atuo como{' '}
              <strong>Assistente de T.I (Pleno)</strong> na ODEEN Intelligence for Security, onde,
              além de infraestrutura, redes e suporte, desenvolvi e coloquei em produção o sistema
              interno de controle de ativos de T.I. Antes, fui{' '}
              <strong>Professor de Informática e Robótica</strong> por dois anos, o que desenvolveu
              minha comunicação e a facilidade para explicar decisões técnicas.
            </m.p>
            <m.p variants={fadeUp}>
              No dia a dia uso <strong>Next.js</strong> e Expo no front, <strong>Node.js</strong>,{' '}
              <strong>Python</strong> (Flask) e <strong>Java (Spring Boot)</strong> no back-end, e
              Supabase / PostgreSQL com Row Level Security. Tenho familiaridade com Kotlin nativo
              (Jetpack Compose, MVVM) e com eletrônica e IoT (Arduino, ESP32, Raspberry Pi Pico).
              Atualmente estudando <strong>cibersegurança</strong> e <strong>AWS</strong>.
            </m.p>
            <m.ul className="sobre-tags" variants={stagger(0.04, 0.1)}>
              {TAGS.map((tag) => (
                <m.li key={tag} variants={pop}>
                  {tag}
                </m.li>
              ))}
            </m.ul>
          </m.div>

          <div className="sobre-aside">
            <m.div
              className="photo-frame"
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            >
              <div className="photo-ring" aria-hidden="true" />
              <div className="photo-wrapper">
                <picture>
                  <source srcSet={asset('img/luis-foto.webp')} type="image/webp" />
                  <img
                    src={asset('img/luis-foto.jpeg')}
                    alt="Luis Henrique Palacio"
                    width={480}
                    height={640}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <span className="photo-chip chip-study">
                <GraduationIcon aria-hidden /> Ciência da Computação
              </span>
              <span className="photo-chip chip-work">
                <BriefcaseIcon aria-hidden /> T.I · ODEEN
              </span>
            </m.div>

            <m.div className="principles-card card glow" variants={stagger(0.08)} {...inView}>
              <m.h3 className="sobre-subtitle" variants={fadeUp}>
                Como eu trabalho
              </m.h3>
              <ul className="principles">
                {PRINCIPLES.map(({ Icon, text }) => (
                  <m.li key={text} variants={fadeUp}>
                    <span className="principle-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    {text}
                  </m.li>
                ))}
              </ul>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
