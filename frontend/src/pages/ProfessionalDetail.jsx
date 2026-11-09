import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/apiClient.js'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

const categoryLabels = {
  HEALTH: 'Salut',
  WELLNESS: 'Benestar',
  EDUCATION: 'Educació',
  MUSIC: 'Música',
  SPORTS: 'Esport',
  CREATIVE: 'Creativitat',
  HOME: 'Llar i reparacions',
  OTHER: 'Altres',
}

function websiteUrl(website) {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`
}

export default function ProfessionalDetail() {
  const { id } = useParams()
  const [professional, setProfessional] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setProfessional(null)
    setError(false)

    api.getProfessionalById(id)
      .then(setProfessional)
      .catch(() => setError(true))
  }, [id])

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'ha pogut carregar el professional.</p>
  } else if (professional) {
    content = (
      <article className={`business-detail detail-layout${professional.imageUrl ? ' detail-layout-with-image detail-layout-vertical' : ''}`}>
        {professional.imageUrl && (
          <img className="detail-image detail-image-vertical" src={professional.imageUrl} alt={`Imatge de ${professional.name}`} />
        )}
        <div className="detail-content">
          <p className="business-detail-category">{categoryLabels[professional.category] || 'Altres'}</p>
          <h1>{professional.name}</h1>
          {professional.description && <p className="business-detail-description">{professional.description}</p>}

          {(professional.phone || professional.email || professional.website) && (
            <section className="business-information">
              <h2>Contacte</h2>
              <dl>
                {professional.phone && <><dt>Telèfon</dt><dd><a href={`tel:${professional.phone}`}>{professional.phone}</a></dd></>}
                {professional.email && <><dt>Correu</dt><dd><a href={`mailto:${professional.email}`}>{professional.email}</a></dd></>}
                {professional.website && (
                  <><dt>Web</dt><dd><a href={websiteUrl(professional.website)} target="_blank" rel="noreferrer">{professional.website}</a></dd></>
                )}
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
          <Link className="back-link" to="/professionals">← Tornar a professionals</Link>
          {content}
        </div>
      </main>
      <Footer />
    </>
  )
}
