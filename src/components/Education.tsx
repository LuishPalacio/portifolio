import { asset } from '../lib/assets';
import { ExternalIcon } from '../lib/icons';

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

const resolveUrl = (url: string) => (/^https?:\/\//.test(url) ? url : asset(url));

export default function Education() {
  return (
    <section id="formacao" className="section">
      <div className="container">
        <h2 className="section-title fade-in">Formação & Certificações</h2>
        <div className="edu-grid">
          <div className="edu-card fade-in">
            <p className="edu-period">Jan 2024 a Dez 2027</p>
            <h3 className="edu-title">Bacharelado em Ciência da Computação</h3>
            <p className="edu-org">Centro Universitário Braz Cubas · Mogi das Cruzes, SP</p>
            <p className="edu-note">6º semestre · conclusão prevista para Dez/2027</p>
            <p className="edu-org edu-secondary">
              Ensino Médio Completo · E.E. Profª Brasilísia Machado Lobo
            </p>
          </div>

          <div className="edu-card fade-in">
            <h3 className="edu-title">Certificações</h3>
            <div className="cert-list">
              {CERTIFICATIONS.map((cert) => {
                const label = `${cert.name} · ${cert.issuer}${cert.hours ? ` (${cert.hours})` : ''}`;
                return cert.url ? (
                  <a
                    key={cert.name}
                    className="cert-link"
                    href={resolveUrl(cert.url)}
                    target="_blank"
                    rel="noreferrer"
                    title="Ver certificado"
                    aria-label={`${label}: ver certificado (abre em nova aba)`}
                  >
                    {label}
                    <ExternalIcon aria-hidden />
                  </a>
                ) : (
                  <span key={cert.name}>{label}</span>
                );
              })}
            </div>
            <h3 className="edu-title edu-title-spaced">Idiomas</h3>
            <p className="edu-org">Português (nativo) · Inglês (intermediário)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
