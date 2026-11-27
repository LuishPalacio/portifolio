import type { CSSProperties } from 'react';
import { m } from 'motion/react';
import type { Variants } from 'motion/react';
import { asset } from '../lib/assets';
import { CertificateIcon, ExternalIcon, GraduationIcon, LanguageIcon } from '../lib/icons';
import { EASE_OUT, fadeUp, inView, rise, stagger } from '../lib/motion';
import SectionHeading from './SectionHeading';

/** Blocos dos semestres crescem de baixo para cima, em sequência. */
const growY: Variants = {
  hidden: { opacity: 0, scaleY: 0.2 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

interface Certification {
  name: string;
  issuer: string;
  /** Carga horária, quando o certificado informa. */
  hours?: string;
  /**
   * Onde o certificado abre: link do emissor (https://…) ou arquivo em `public/`
   * (caminho relativo, resolvido com `asset`). Sem `url`, aparece sem clique.
   */
  url?: string;
}

/** PDF público do certificado de Nano Course da FIAP, a partir da chave da credencial. */
const fiapCertificate = (chave: string) =>
  `https://on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=${chave}&action=view`;

const CERTIFICATIONS: Certification[] = [
  {
    name: 'Engenharia de Software',
    issuer: 'FIAP',
    hours: '100h',
    url: fiapCertificate('4602b8a837f9bd37c9b6f0d3e72573c9'),
  },
  {
    name: 'Android',
    issuer: 'FIAP',
    hours: '80h',
    url: fiapCertificate('95a9578f8d1b23917e8481d6ae15a414'),
  },
  {
    name: 'Big Data & Analytics',
    issuer: 'FIAP',
    hours: '60h',
    url: fiapCertificate('aea0d2004c0506cc66cc4c69ab0a4c0f'),
  },
  {
    name: 'Minicurso React Native',
    issuer: 'Rocketseat',
    url: 'https://app.rocketseat.com.br/certificates/a7af9fb4-5f6e-49cc-a342-1d6b8545d93e',
  },
  { name: 'Networking Basics', issuer: 'Cisco', url: 'certificados/networking-basics-cisco.pdf' },
];

/** Andamento da graduação (Jan 2024 a Dez 2027 = 8 semestres). */
const SEMESTER = 6;
const TOTAL_SEMESTERS = 8;
const YEARS = ['2024', '2025', '2026', '2027'];

const semesterState = (index: number) =>
  index < SEMESTER - 1 ? 'done' : index === SEMESTER - 1 ? 'current' : 'next';

const resolveUrl = (url: string) => (/^https?:\/\//.test(url) ? url : asset(url));

export default function Education() {
  return (
    <section id="formacao" className="section">
      <div className="container">
        <SectionHeading index="03" label="formação">
          Formação & <span className="text-gradient">Certificações</span>
        </SectionHeading>

        <div className="edu-grid">
          <m.div className="edu-card card glow" variants={rise} custom={0} {...inView}>
            <span className="card-icon" aria-hidden="true">
              <GraduationIcon />
            </span>
            <p className="edu-period">Jan 2024 a Dez 2027</p>
            <h3 className="edu-title">Bacharelado em Ciência da Computação</h3>
            <p className="edu-org">Centro Universitário Braz Cubas · Mogi das Cruzes, SP</p>

            <div className="progress">
              <div className="progress-head">
                <span>
                  {SEMESTER}º de {TOTAL_SEMESTERS} semestres
                </span>
                <span>conclusão prevista para Dez/2027</span>
              </div>
              {/* Um bloco por semestre: concluídos, o atual (pulsando) e os que faltam. */}
              <m.div
                className="semesters"
                aria-hidden="true"
                variants={stagger(0.07, 0.2)}
                {...inView}
                viewport={{ once: true, amount: 1 }}
              >
                {Array.from({ length: TOTAL_SEMESTERS }, (_, i) => (
                  <m.span
                    key={i}
                    className={`semester ${semesterState(i)}`}
                    style={{ '--t': i / (TOTAL_SEMESTERS - 1) } as CSSProperties}
                    variants={growY}
                  />
                ))}
              </m.div>
              <div className="semester-years" aria-hidden="true">
                {YEARS.map((year) => (
                  <span key={year}>{year}</span>
                ))}
              </div>
            </div>

            <p className="edu-org edu-secondary">
              Ensino Médio Completo · E.E. Profª Brasilísia Machado Lobo
            </p>

            <h3 className="edu-title edu-title-spaced">
              <LanguageIcon aria-hidden className="edu-title-icon" /> Idiomas
            </h3>
            <div className="lang-list">
              <span>
                Português <em>nativo</em>
              </span>
              <span>
                Inglês <em>intermediário</em>
              </span>
            </div>
          </m.div>

          <m.div className="edu-card card glow" variants={rise} custom={1} {...inView}>
            <span className="card-icon" aria-hidden="true">
              <CertificateIcon />
            </span>
            <h3 className="edu-title">Certificações</h3>
            <m.ul className="cert-list" variants={stagger(0.07, 0.25)} {...inView}>
              {CERTIFICATIONS.map((cert) => {
                const label = `${cert.name} · ${cert.issuer}${cert.hours ? ` (${cert.hours})` : ''}`;
                const content = (
                  <>
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-name">{cert.name}</span>
                    {cert.hours && <span className="cert-hours">{cert.hours}</span>}
                  </>
                );
                return (
                  <m.li key={cert.name} variants={fadeUp}>
                    {cert.url ? (
                      <a
                        className="cert-row cert-link"
                        href={resolveUrl(cert.url)}
                        target="_blank"
                        rel="noreferrer"
                        title="Ver certificado"
                        aria-label={`${label}: ver certificado (abre em nova aba)`}
                      >
                        {content}
                        <ExternalIcon aria-hidden className="cert-open" />
                      </a>
                    ) : (
                      <span className="cert-row">{content}</span>
                    )}
                  </m.li>
                );
              })}
            </m.ul>
          </m.div>
        </div>
      </div>
    </section>
  );
}
