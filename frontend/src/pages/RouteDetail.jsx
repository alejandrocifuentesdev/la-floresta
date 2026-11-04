import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/apiClient.js'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import { difficultyLabels, formatDuration } from '../utils/routes.js'

export default function RouteDetail() {
  const { id } = useParams()
  const [route, setRoute] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    setRoute(null)
    setError(false)

    api.getRouteById(id)
      .then((data) => {
        if (!data) throw new Error('Route not found')
        if (active) setRoute(data)
      })
      .catch(() => { if (active) setError(true) })

    return () => { active = false }
  }, [id])

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'ha pogut carregar la ruta.</p>
  } else if (route) {
    content = (
      <article className="business-detail">
        {route.imageUrl && (
          <img className="business-detail-image" src={route.imageUrl} alt={`Imatge de ${route.name}`} />
        )}
        <h1>{route.name}</h1>
        {(difficultyLabels[route.difficulty] || route.distanceKm != null || route.durationMinutes != null || route.startLocation) && (
          <section className="business-information">
            <h2>Informació</h2>
            <dl>
              {difficultyLabels[route.difficulty] && <><dt>Dificultat</dt><dd>{difficultyLabels[route.difficulty]}</dd></>}
              {route.distanceKm != null && <><dt>Distància</dt><dd>{new Intl.NumberFormat('ca-ES').format(route.distanceKm)} km</dd></>}
              {route.durationMinutes != null && <><dt>Durada</dt><dd>{formatDuration(route.durationMinutes)}</dd></>}
              {route.startLocation && <><dt>Inici</dt><dd>{route.startLocation}</dd></>}
            </dl>
          </section>
        )}
        {route.description && <p className="business-detail-description route-detail-description">{route.description}</p>}
      </article>
    )
  }

  return (
    <>
      <Navbar />
      <main className="business-detail-page">
        <div className="section business-detail-container">
          <Link className="back-link" to="/rutes">← Tornar a rutes</Link>
          {content}
        </div>
      </main>
      <Footer />
    </>
  )
}
