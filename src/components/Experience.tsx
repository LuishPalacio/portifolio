interface Job {
  period: string;
  title: string;
  company: string;
  bullets: string[];
}

const JOBS: Job[] = [
  {
    period: 'Desde Jun 2026',
    title: 'Assistente de T.I (Pleno)',
    company: 'ODEEN Intelligence for Security · Mogi das Cruzes, SP',
    bullets: [
      'Instalação, configuração e projeto de equipamentos eletrônicos para sistemas de T.I',
      'Manutenção preventiva e corretiva de hardware, reparo de falhas e montagem de circuitos',
      'Diagnóstico e troubleshooting em dispositivos variados',
      'Instalação de componentes físicos em servidores, roteadores e switches',
      'Suporte técnico direto aos usuários, garantindo a estabilidade dos sistemas',
    ],
  },
  {
    period: 'Jul 2024 a Jun 2026',
    title: 'Professor de Informática',
    company: 'Escola DiscoverON · Santa Isabel, SP',
    bullets: [
      'Aulas práticas e teóricas de lógica de programação e desenvolvimento web (HTML, CSS, JavaScript) para ensino fundamental e médio',
      'Robótica em C++, integrando hardware e software em projetos com sensores, motores e programação embarcada',
      'Automação de tarefas com Python, prototipagem de interfaces no Figma e introdução ao Pacote Office',
      'Criação de material didático focado em boas práticas de código, autonomia e pensamento computacional',
      'Condução de oficinas e projetos interativos que estimulam trabalho em equipe e criatividade',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experiencia" className="section">
      <div className="container">
        <h2 className="section-title fade-in">Experiência</h2>
        <div className="experience-grid">
          {JOBS.map((job) => (
            <div className="experience-card fade-in" key={job.title + job.company}>
              <p className="experience-period">{job.period}</p>
              <h3 className="experience-title">{job.title}</h3>
              <p className="experience-company">{job.company}</p>
              <ul className="experience-list">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
