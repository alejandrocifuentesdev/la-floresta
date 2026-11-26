import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  const [loadedImage, setLoadedImage] = useState(null)
  const shape = loadedImage?.url === event.imageUrl ? loadedImage.shape : 'vertical'

  return (
    <Link className="event-card-link" to={`/agenda/${event.id}`}>
      <article className="event-card">
        {event.imageUrl ? (
          <img
            key={event.imageUrl}
            className={`card-image event-card-image event-card-image-${shape}`}
            src={event.imageUrl}
            alt={`Imatge de ${event.title}`}
            onLoad={({ currentTarget }) => {
              const { naturalWidth, naturalHeight } = currentTarget
              if (!naturalWidth || !naturalHeight) return
              setLoadedImage({
                url: event.imageUrl,
                shape: naturalWidth > naturalHeight ? 'horizontal' : naturalWidth === naturalHeight ? 'square' : 'vertical',
              })
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
