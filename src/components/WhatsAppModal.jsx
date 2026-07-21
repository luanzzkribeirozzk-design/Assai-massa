import { useEffect, useRef, useState } from 'react'
import { buildWhatsAppLink } from '../constants'
import './WhatsAppModal.css'

export default function WhatsAppModal({ plan, onClose }) {
  const [name, setName] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!plan) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return

    const priceInfo = [plan.priceLabel, plan.cashLabel].filter(Boolean).join(' ou ')

    const message = [
      `Olá! Meu nome é ${trimmedName}.`,
      `Tenho interesse no ${plan.name} (${priceInfo}) da Academia Fitness.`,
      `Podem me passar mais informações sobre a matrícula?`,
    ].join(' ')

    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div className="wa-modal__backdrop" onMouseDown={onClose}>
      <div
        className="wa-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="wa-modal__close" onClick={onClose} aria-label="Fechar">
          <span />
          <span />
        </button>

        <p className="eyebrow">Falta pouco</p>
        <h3 id="wa-modal-title" className="wa-modal__title">
          {plan.name}
        </h3>
        <p className="wa-modal__price">
          {plan.priceLabel}
          {plan.cashLabel ? ` · ${plan.cashLabel}` : ''}
        </p>

        <p className="wa-modal__text">
          Informe seu nome para gerarmos uma mensagem pronta e enviarmos direto para o
          WhatsApp da Academia Fitness.
        </p>

        <form onSubmit={handleSubmit} className="wa-modal__form">
          <label htmlFor="wa-name">Seu nome</label>
          <input
            id="wa-name"
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome completo"
            autoComplete="name"
            required
          />
          <button type="submit" className="btn btn-primary btn-block">
            Enviar para o WhatsApp
          </button>
        </form>
      </div>
    </div>
  )
}
