import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/apiClient.js'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import useCourseWorkshopImage from '../utils/useCourseWorkshopImage.js'

function formatDate(value) {
  const date = new Date(`${value}T12:00:00`)
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('ca-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(date)
}

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(false)
  const { orientation, onLoad, onError } = useCourseWorkshopImage(event?.imageUrl)

  useEffect(() => {
    setEvent(null)
    setError(false)

    api.getEventById(id)
      .then(setEvent)
      .catch(() => setError(true))
  }, [id])

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'ha pogut carregar l'activitat.</p>
  } else if (event) {
    content = (
      <article className={`business-detail detail-layout${event.imageUrl ? ` detail-layout-with-image detail-layout-${orientation}` : ''}`}>
        {event.imageUrl && (
          <img key={event.imageUrl} className={`detail-image detail-image-${orientation}`} onLoad={onLoad} onError={onError} src={event.imageUrl} alt={`Imatge de ${event.title}`} />
        )}
        <div className="detail-content">
          {event.date && <p className="business-detail-category">{formatDate(event.date)}</p>}
          <h1>{event.title}</h1>

          {event.location && (
            <section className="business-information">
              <h2>Informació</h2>
              <dl>
                <dt>Lloc</dt>
                <dd>{event.location}</dd>
              </dl>
            </section>
          )}
          {event.description && <p className="business-detail-description">{event.description}</p>}
        </div>
      </article>
    )
  }

  return (
    <>
      <Navbar />
      <main className="business-detail-page">
        <div className="section business-detail-container">
          <Link className="back-link" to="/agenda">← Tornar a l'agenda</Link>
          {content}
        </div>
      </main>
      <Footer />
    </>
  )
}
