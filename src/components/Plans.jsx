import { useState } from 'react'
import { PAYMENT_METHODS, PLANS, PLANS_NOTE } from '../constants'
import WhatsAppModal from './WhatsAppModal'
import './Plans.css'

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <section id="planos" className="section plans">
      <div className="container">
        <div className="plans__head">
          <div>
            <p className="eyebrow">Planos e preços</p>
            <h2 className="section-title">
              Escolha o plano que <em>cabe no seu ritmo.</em>
            </h2>
          </div>
          <p className="section-lede plans__lede">
            Selecione um plano abaixo, informe seu nome e enviamos a mensagem pronta direto
            para o WhatsApp da nossa equipe.
          </p>
        </div>

        <div className="plans__grid">
          {PLANS.map((plan) => (
            <div key={plan.id} className={`plan-card ${plan.highlight ? 'plan-card--highlight' : ''}`}>
              {plan.highlight && <span className="plan-card__badge">Mais escolhido</span>}
              <p className="plan-card__tagline">{plan.tagline}</p>
              <h3 className="plan-card__name">{plan.name}</h3>

              <div className="plan-card__price">
                <strong>{plan.priceLabel}</strong>
                <span>{plan.priceSub}</span>
              </div>

              {plan.cashLabel && (
                <div className="plan-card__cash">
                  <span className="neon-line" style={{ width: 16 }} />
                  <div>
                    <strong>{plan.cashLabel}</strong>
                    <span>{plan.cashSub}</span>
                  </div>
                </div>
              )}

              <button
                className={`btn btn-block ${plan.highlight ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedPlan(plan)}
              >
                Escolher plano
              </button>
            </div>
          ))}
        </div>

        <p className="plans__note">{PLANS_NOTE}</p>

        <div className="plans__payment">
          <span className="plans__payment-label">Formas de pagamento aceitas</span>
          <div className="plans__payment-methods">
            {PAYMENT_METHODS.map((method) => (
              <span key={method}>{method}</span>
            ))}
          </div>
        </div>
      </div>

      {selectedPlan && (
        <WhatsAppModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </section>
  )
}
