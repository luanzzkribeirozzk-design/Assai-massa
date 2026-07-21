import { buildWhatsAppLink, GENERIC_WHATSAPP_MESSAGE } from '../constants'
import './Hero.css'

export default function Hero() {
  return (
    <section id="topo" className="hero">
      <div className="hero__media">
        <img src="/images/academia-01.jpg" alt="Interior da Academia Fitness com equipamentos de musculação" />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <p className="eyebrow">Academia Fitness</p>
        <h1 className="hero__title">
          Transforme seu corpo.
          <br />
          Supere seus <em>limites.</em>
        </h1>
        <p className="hero__subtitle">
          Estrutura completa, ambiente climatizado e equipamentos modernos para você treinar
          com consistência todos os dias da semana.
        </p>

        <div className="hero__actions">
          <a href="#planos" className="btn btn-primary">
            Ver planos
          </a>
          <a
            href={buildWhatsAppLink(GENERIC_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Falar no WhatsApp
          </a>
        </div>

        <div className="hero__tag">
          <span className="neon-line" style={{ width: 32 }} />
          vem ser fitness
        </div>
      </div>

      <div className="hero__strip">
        <span className="neon-line neon-line--center" />
      </div>
    </section>
  )
}
