export const WHATSAPP_NUMBER = '5519996298503'
export const PHONE_DISPLAY = '(19) 99629-8503'
export const INSTAGRAM_URL =
  'https://www.instagram.com/academia_fitnessleme?igsh=NThnZXk4eDc1OWR5'
export const MAPS_URL = 'https://maps.app.goo.gl/nmqAUxbKVR6phUX1A'

export function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export const GENERIC_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da Academia Fitness e gostaria de mais informações.'

export const PLANS = [
  {
    id: 'anual',
    name: 'Plano Anual',
    highlight: true,
    tagline: 'Melhor custo-benefício',
    priceLabel: '12x de R$ 79,90',
    priceSub: 'no cartão de crédito',
    cashLabel: 'À vista: R$ 850,00',
    cashSub: 'equivale a R$ 70,83 por mês',
  },
  {
    id: 'semestral',
    name: 'Plano Semestral',
    tagline: 'Valor promocional',
    priceLabel: '6x de R$ 95,00',
    priceSub: 'no cartão de crédito',
  },
  {
    id: 'trimestral',
    name: 'Plano Trimestral',
    tagline: 'Valor promocional',
    priceLabel: '3x de R$ 105,00',
    priceSub: 'no cartão de crédito',
  },
  {
    id: 'mensal',
    name: 'Mensal Avulso',
    tagline: 'Sem fidelidade',
    priceLabel: 'R$ 135,00',
    priceSub: 'por mês',
  },
  {
    id: 'promo-2-meses',
    name: 'Promoção 2 Meses',
    tagline: 'Pagamento à vista',
    priceLabel: 'R$ 170,00',
    priceSub: 'equivale a R$ 85,00 por mês',
  },
]

export const PLANS_NOTE =
  'Valor especial para pagamentos efetuados entre os dias 01 e 07 de cada mês.'

export const PAYMENT_METHODS = ['Cartão de crédito', 'Cartão de débito', 'PIX']

export const SCHEDULE = [
  { day: 'Segunda a Quinta-feira', hours: '05:00 às 22:00' },
  { day: 'Sexta-feira', hours: '05:00 às 21:00' },
  { day: 'Sábado', hours: '08:00 às 11:00 e 14:00 às 17:00' },
  { day: 'Domingos e Feriados', hours: '08:30 às 11:30' },
]

export const SLOGANS = [
  '+ Força | + Saúde | + Resultados',
  'Transforme seu corpo. Supere seus limites.',
  'Sua melhor versão começa aqui.',
  'Seu melhor investimento: você.',
]
