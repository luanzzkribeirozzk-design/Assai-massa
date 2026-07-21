import './About.css'

const FEATURES = [
  {
    title: 'Equipamentos modernos',
    text: 'Estações de musculação completas, com máquinas para todos os grupos musculares.',
  },
  {
    title: 'Ambiente pensado para treinar',
    text: 'Iluminação, ventilação e organização que tornam o treino mais agradável, do início ao fim.',
  },
  {
    title: 'Horários amplos',
    text: 'Funcionamento de segunda a domingo, incluindo feriados, para caber na sua rotina.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="section about">
      <div className="container about__grid">
        <div className="about__media">
          <img src="/images/academia-04.jpg" alt="Ambiente interno da Academia Fitness com plantas e equipamentos" />
          <div className="about__media-frame" />
        </div>

        <div className="about__content">
          <p className="eyebrow">Sobre a academia</p>
          <h2 className="section-title">
            Seu melhor investimento: <em>você.</em>
          </h2>
          <p className="section-lede">
            A Academia Fitness reúne estrutura completa e ambiente cuidado para quem quer
            treinar com consistência, seja para começar do zero ou evoluir para o próximo
            nível.
          </p>

          <ul className="about__features">
            {FEATURES.map((feature) => (
              <li key={feature.title}>
                <span className="neon-line" style={{ width: 20 }} />
                <div>
                  <strong>{feature.title}</strong>
                  <p>{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
