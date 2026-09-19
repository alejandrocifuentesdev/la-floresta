export default function BusinessCard({ business }) {
  return (
    <article className="business-card">
      <div
        className={`business-image${business.imageUrl ? '' : ' image-placeholder'}`}
        style={business.imageUrl ? { backgroundImage: `url(${business.imageUrl})` } : undefined}
        role="img"
        aria-label={business.imageUrl ? `Imatge de ${business.name}` : 'Imatge no disponible'}
      />
      <div className="business-content">
        <h3>{business.name}</h3>
        <p>{business.category}</p>
        {business.detail && <p className="location">● <span>{business.detail}</span></p>}
      </div>
    </article>
  )
}
