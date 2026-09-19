export default function EventCard({ event }) {
  return (
    <article className="event-card">
      <div
        className={`card-image${event.imageUrl ? '' : ' image-placeholder'}`}
        style={event.imageUrl ? { backgroundImage: `url(${event.imageUrl})` } : undefined}
        role="img"
        aria-label={event.imageUrl ? `Imatge de ${event.title}` : 'Imatge no disponible'}
      />
      <div className="event-content">
        <p className="card-meta">{event.date}</p>
        <h3>{event.title}</h3>
        <p className="location">● <span>{event.location}</span></p>
        <p>{event.description}</p>
      </div>
    </article>
  )
}
