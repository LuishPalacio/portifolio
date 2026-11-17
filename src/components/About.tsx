import { asset } from '../lib/assets';

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

const PRINCIPLES = [
  'Começo pelo problema, não pela ferramenta.',
  'Nenhum dado entra sem validação e nenhuma ação crítica roda sem confirmação.',
  'Todo bug encontrado vira teste automatizado.',
  'Prefiro um erro explícito a um resultado improvisado e errado.',
  'Documento as decisões técnicas.',
];

export default function About() {
  return (
    <section id="sobre" className="section">
      <div className="container">
        <h2 className="section-title fade-in">Sobre Mim</h2>
        <div className="sobre-layout">
          <div className="sobre-content fade-in">
            <p>
              <strong>Desenvolvedor Full Stack</strong> com foco em{' '}
              <strong>React, React Native e TypeScript</strong>. Construo aplicações web e mobile da
              interface ao banco de dados e integro <strong>IA generativa com segurança</strong>: o
              modelo interpreta, o código valida e o usuário confirma.
            </p>
            <p>
              Estudante do <strong>6º semestre de Ciência da Computação</strong> no Centro
              Universitário Braz Cubas (conclusão prevista para Dezembro/2027). Atuo como{' '}
              <strong>Assistente de T.I (Pleno)</strong> na ODEEN Intelligence for Security, onde,
              além de infraestrutura, redes e suporte, desenvolvi e coloquei em produção o sistema
              interno de controle de ativos de T.I. Antes, fui{' '}
              <strong>Professor de Informática e Robótica</strong> por dois anos, o que desenvolveu
              minha comunicação e a facilidade para explicar decisões técnicas.
            </p>
            <p>
              No dia a dia uso <strong>Next.js</strong> e Expo no front, <strong>Node.js</strong>,{' '}
              <strong>Python</strong> (Flask) e <strong>Java (Spring Boot)</strong> no back-end, e
              Supabase / PostgreSQL com Row Level Security. Tenho familiaridade com Kotlin nativo
              (Jetpack Compose, MVVM) e com eletrônica e IoT (Arduino, ESP32, Raspberry Pi Pico).
              Atualmente estudando <strong>cibersegurança</strong> e <strong>AWS</strong>.
            </p>
            <h3 className="sobre-subtitle">Como eu trabalho</h3>
            <ul className="experience-list sobre-principles">
              {PRINCIPLES.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
            <div className="sobre-tags">
              {TAGS.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="sobre-photo fade-in">
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
          </div>
        </div>
      </div>
    </section>
  );
}
