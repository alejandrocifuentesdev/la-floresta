import { Link } from 'react-router-dom'

const categoryLabels = {
  BAR: 'Bar',
  RESTAURANT: 'Restaurant',
  SHOP: 'Botiga',
  SERVICE: 'Servei',
  OTHER: 'Altres',
  PARK: 'Parc',
  VIEWPOINT: 'Mirador',
  CULTURE: 'Cultura',
  TRANSPORT: 'Transport',
  SPORTS: 'Esports',
  PUBLIC_SERVICE: 'Servei públic',
}

export default function BusinessCard({ business, to }) {
  const card = (
    <article className="business-card">
      <div
        className={`business-image${business.imageUrl ? '' : ' image-placeholder'}`}
        style={business.imageUrl ? { backgroundImage: `url(${business.imageUrl})` } : undefined}
        role="img"
        aria-label={business.imageUrl ? `Imatge de ${business.name}` : 'Imatge no disponible'}
      />
      <div className="business-content">
        <h3>{business.name}</h3>
        <p>{categoryLabels[business.category] || business.category}</p>
        {business.detail && <p className="location">● <span>{business.detail}</span></p>}
      </div>
    </article>
  )

  if (!to) return card

  return <Link className="business-card-link" to={to}>{card}</Link>
}
