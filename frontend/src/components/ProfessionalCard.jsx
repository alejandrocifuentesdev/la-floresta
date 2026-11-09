import { Link } from 'react-router-dom'

export default function ProfessionalCard({ professional, to }) {
  const card = (
    <article className="professional-card">
      <div
        className={`professional-image${professional.imageUrl ? '' : ' image-placeholder'}`}
        style={professional.imageUrl ? { backgroundImage: `url(${professional.imageUrl})` } : undefined}
        role="img"
        aria-label={professional.imageUrl ? `Imatge de ${professional.name}` : 'Imatge no disponible'}
      />
      <div className="professional-content">
        <h3>{professional.name}</h3>
        <p className="professional-category">{professional.categoryLabel}</p>
      </div>
    </article>
  )

  if (!to) return card

  return <Link className="professional-card-link" to={to}>{card}</Link>
}
