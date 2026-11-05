import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/apiClient.js'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import useCourseWorkshopImage from '../utils/useCourseWorkshopImage.js'
import { getPointOfInterestCategoryLabel } from '../utils/pointOfInterestCategories.js'

export default function PointOfInterestDetail() {
  const { id } = useParams()
  const [point, setPoint] = useState(null)
  const [error, setError] = useState(false)
  const { orientation, onLoad, onError } = useCourseWorkshopImage(point?.imageUrl)

  useEffect(() => {
    setPoint(null)
    setError(false)

    api.getPointOfInterestById(id)
      .then(setPoint)
      .catch(() => setError(true))
  }, [id])

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'ha pogut carregar el lloc d'interès.</p>
  } else if (point) {
    content = (
      <article className={`business-detail detail-layout${point.imageUrl ? ` detail-layout-with-image detail-layout-${orientation}` : ''}`}>
        {point.imageUrl && (
          <img key={point.imageUrl} className={`detail-image detail-image-${orientation}`} src={point.imageUrl} alt={`Imatge de ${point.name}`} onLoad={onLoad} onError={onError} />
        )}
        <div className="detail-content">
          <p className="business-detail-category">{getPointOfInterestCategoryLabel(point.category)}</p>
          <h1>{point.name}</h1>
          {point.description && <p className="business-detail-description">{point.description}</p>}

          {point.address && (
            <section className="business-information">
              <h2>Informació</h2>
              <dl>
                <dt>Adreça</dt>
                <dd>{point.address}</dd>
              </dl>
            </section>
          )}
        </div>
      </article>
    )
  }

  return (
    <>
      <Navbar />
      <main className="business-detail-page">
        <div className="section business-detail-container">
          <Link className="back-link" to="/mapa">← Tornar al mapa</Link>
          {content}
        </div>
      </main>
      <Footer />
    </>
  )
}
