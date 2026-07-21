import { INSTAGRAM_URL, PHONE_DISPLAY, buildWhatsAppLink, GENERIC_WHATSAPP_MESSAGE } from '../constants'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#topo" className="footer__logo">
            <span className="footer__logo-mark" />
            ACADEMIA<em>FITNESS</em>
          </a>
          <p>Transforme seu corpo. Supere seus limites.</p>
        </div>

        <nav className="footer__links">
          <a href="#sobre">Sobre</a>
          <a href="#planos">Planos</a>
          <a href="#estrutura">Estrutura</a>
          <a href="#horarios">Horários</a>
          <a href="#localizacao">Localização</a>
        </nav>

        <div className="footer__contact">
          <a href={buildWhatsAppLink(GENERIC_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">
            {PHONE_DISPLAY}
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="neon-line neon-line--center" />
        <div className="container footer__bottom-text">
          <span>© {year} Academia Fitness. Todos os direitos reservados.</span>
          <span>vem ser fitness</span>
        </div>
      </div>
    </footer>
  )
}
