import { asset } from '../lib/assets';

const TAGS = [
  'React',
  'React Native',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Supabase / PostgreSQL',
  'Python',
  'Kotlin',
  'Inglês intermediário',
];

export default function About() {
  return (
    <section id="sobre" className="section">
      <div className="container">
        <h2 className="section-title fade-in">Sobre Mim</h2>
        <div className="sobre-layout">
          <div className="sobre-content fade-in">
            <p>
              Estudante do <strong>6º semestre de Ciência da Computação</strong> no Centro
              Universitário Braz Cubas (conclusão prevista para Dezembro/2027). Atuo como{' '}
              <strong>Assistente de T.I (Pleno)</strong> na ODEEN Intelligence for Security,
              consolidando uma base prática de infraestrutura, suporte técnico e redes, depois de
              dois anos como <strong>Professor de Informática</strong> na Escola DiscoverON.
            </p>
            <p>
              Meu foco de carreira é o <strong>desenvolvimento de software</strong>, com eixo
              principal em <strong>React, React Native e TypeScript</strong>. Construo apps mobile
              com Expo e dashboards web com <strong>Next.js</strong>, back-end com{' '}
              <strong>Node.js</strong> e <strong>Python</strong> (Flask, Django), e bancos no
              Supabase / PostgreSQL com Row Level Security. Também trabalho integração de{' '}
              <strong>agentes de IA</strong> que traduzem linguagem natural em ações validadas.
            </p>
            <p>
              Tenho familiaridade com <strong>Kotlin nativo</strong> (Jetpack Compose, MVVM) e
              contato ativo com eletrônica e IoT (Arduino, ESP32, Raspberry Pi Pico), o que reforça
              minha visão de integração entre hardware e software. Interesse crescente em{' '}
              <strong>cibersegurança</strong> e <strong>inteligência artificial</strong>.
            </p>
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
