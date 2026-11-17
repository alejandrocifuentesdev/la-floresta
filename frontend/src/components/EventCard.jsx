import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  const [squareImageUrl, setSquareImageUrl] = useState(null)
  const isSquare = event.imageUrl && squareImageUrl === event.imageUrl

  return (
    <Link className="event-card-link" to={`/agenda/${event.id}`}>
      <article className="event-card">
        {event.imageUrl ? (
          <img
            key={event.imageUrl}
            className={`card-image event-card-image${isSquare ? ' event-card-image-square' : ''}`}
            src={event.imageUrl}
            alt={`Imatge de ${event.title}`}
            onLoad={({ currentTarget }) => {
              setSquareImageUrl(currentTarget.naturalWidth === currentTarget.naturalHeight ? event.imageUrl : null)
            }}
          />
        ) : (
          <div className="card-image event-card-image image-placeholder" role="img" aria-label="Imatge no disponible" />
        )}
        <div className="event-content">
          <p className="card-meta">{event.date}</p>
          <h3>{event.title}</h3>
          <p className="location">● <span>{event.location}</span></p>
          <p>{event.description}</p>
        </div>
      </article>
    </Link>
  )
}
