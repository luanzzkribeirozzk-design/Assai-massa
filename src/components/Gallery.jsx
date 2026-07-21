import './Gallery.css'

const IMAGES = [
  { src: '/images/academia-02.jpg', alt: 'Corredor de máquinas de musculação da Academia Fitness', span: 'wide' },
  { src: '/images/academia-03.jpg', alt: 'Equipamento de treino de glúteos em destaque' },
  { src: '/images/academia-05.jpg', alt: 'Estação de treino de posterior de coxa' },
  { src: '/images/academia-06.jpg', alt: 'Área de pesos livres e halteres da academia', span: 'wide' },
  { src: '/images/academia-07-logo-wall.jpg', alt: 'Parede de identidade visual da Academia Fitness' },
]

export default function Gallery() {
  return (
    <section id="estrutura" className="section gallery">
      <div className="container">
        <p className="eyebrow">Estrutura</p>
        <h2 className="section-title">
          Cada canto pensado <em>para o treino.</em>
        </h2>

        <div className="gallery__grid">
          {IMAGES.map((image) => (
            <figure
              key={image.src}
              className={`gallery__item ${image.span === 'wide' ? 'gallery__item--wide' : ''}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
