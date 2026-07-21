import { MAPS_URL, PHONE_DISPLAY, buildWhatsAppLink, GENERIC_WHATSAPP_MESSAGE } from '../constants'
import './Location.css'

export default function Location() {
  return (
    <section id="localizacao" className="section location">
      <div className="container location__grid">
        <div>
          <p className="eyebrow">Localização e contato</p>
          <h2 className="section-title">
            Venha treinar <em>com a gente.</em>
          </h2>
          <p className="section-lede">
            Está com dúvidas antes de visitar? Fale direto com nossa equipe pelo telefone ou
            WhatsApp, ou veja como chegar até a academia.
          </p>

          <div className="location__actions">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Ver no mapa
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
        </div>

        <div className="location__card">
          <div className="location__row">
            <span className="location__label">Telefone / WhatsApp</span>
            <a href={`tel:+${'55' + PHONE_DISPLAY.replace(/\D/g, '')}`} className="location__value">
              {PHONE_DISPLAY}
            </a>
          </div>
          <span className="neon-line" />
          <div className="location__row">
            <span className="location__label">Endereço</span>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="location__value">
              Ver localização no Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
