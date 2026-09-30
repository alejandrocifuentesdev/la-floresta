import { Link } from 'react-router-dom'
import { getPointOfInterestCategoryLabel } from '../utils/pointOfInterestCategories.js'

export default function PointOfInterestCard({ point }) {
  return (
    <Link className="point-card-link" to={`/llocs/${point.id}`}>
    <article className="point-card">
      <div
        className={`point-image${point.imageUrl ? '' : ' image-placeholder'}`}
        style={point.imageUrl ? { backgroundImage: `url(${point.imageUrl})` } : undefined}
        role="img"
        aria-label={point.imageUrl ? `Imatge de ${point.name}` : 'Imatge no disponible'}
      />
      <div className="point-content">
        <h3>{point.name}</h3>
        <p className="point-category">{getPointOfInterestCategoryLabel(point.category)}</p>
        {point.description && <p className="point-description">{point.description}</p>}
        {point.address && <p className="point-address"><strong>Adreça:</strong> {point.address}</p>}
      </div>
    </article>
    </Link>
  )
}
