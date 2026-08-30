const CERTIFICATIONS = [
  'Nano Course de Android · FIAP (80h)',
  'Big Data',
  'Networking Basics',
  'Minicurso React Native',
  'Engenharia de Software',
];

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
              {CERTIFICATIONS.map((cert) => (
                <span key={cert}>{cert}</span>
              ))}
            </div>
            <h3 className="edu-title edu-title-spaced">Idiomas</h3>
            <p className="edu-org">Português (nativo) · Inglês (intermediário)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
