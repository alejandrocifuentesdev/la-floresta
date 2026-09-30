import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/apiClient.js'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

const categoryLabels = {
  BAR: 'Bar',
  RESTAURANT: 'Restaurant',
  SHOP: 'Botiga',
  SERVICE: 'Servei',
  OTHER: 'Altres',
}

function websiteUrl(website) {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`
}

export default function BusinessDetail() {
  const { id } = useParams()
  const [business, setBusiness] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setBusiness(null)
    setError(false)

    api.getBusinessById(id)
      .then(setBusiness)
      .catch(() => setError(true))
  }, [id])

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'ha pogut carregar el comerç.</p>
  } else if (business) {
    content = (
      <article className="business-detail">
        {business.imageUrl && (
          <img className="business-detail-image" src={business.imageUrl} alt={`Imatge de ${business.name}`} />
        )}
        <p className="business-detail-category">{categoryLabels[business.category] || 'Altres'}</p>
        <h1>{business.name}</h1>
        {business.description && <p className="business-detail-description">{business.description}</p>}

        {(business.address || business.phone || business.website) && (
          <section className="business-information">
            <h2>Informació</h2>
            <dl>
              {business.address && <><dt>Adreça</dt><dd>{business.address}</dd></>}
              {business.phone && <><dt>Telèfon</dt><dd><a href={`tel:${business.phone}`}>{business.phone}</a></dd></>}
              {business.website && (
                <><dt>Web</dt><dd><a href={websiteUrl(business.website)} target="_blank" rel="noreferrer">{business.website}</a></dd></>
              )}
            </dl>
          </section>
        )}
      </article>
    )
  }

  return (
    <>
      <Navbar />
      <main className="business-detail-page">
        <div className="section business-detail-container">
          <Link className="back-link" to="/comercos">← Tornar a comerços</Link>
          {content}
        </div>
      </main>
      <Footer />
    </>
  )
}
