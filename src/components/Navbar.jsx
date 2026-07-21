import { useEffect, useState } from 'react'
import './Navbar.css'

const LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#planos', label: 'Planos' },
  { href: '#estrutura', label: 'Estrutura' },
  { href: '#horarios', label: 'Horários' },
  { href: '#localizacao', label: 'Localização' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#topo" className="navbar__logo" onClick={() => setOpen(false)}>
          <span className="navbar__logo-mark" />
          <span>
            ACADEMIA<em>FITNESS</em>
          </span>
        </a>

        <nav className="navbar__links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#planos" className="btn btn-primary navbar__cta">
          Ver planos
        </a>

        <button
          className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#planos" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
          Ver planos
        </a>
      </div>
    </header>
  )
}
