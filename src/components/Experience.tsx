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
