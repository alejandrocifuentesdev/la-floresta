import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/apiClient.js'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import { formatCourseWorkshopDate } from '../utils/courseWorkshops.js'
import useCourseWorkshopImage from '../utils/useCourseWorkshopImage.js'


export default function CourseWorkshopDetail() {
  const { id } = useParams()
  const [courseWorkshop, setCourseWorkshop] = useState(null)
  const [error, setError] = useState(false)
  const { orientation, onLoad, onError } = useCourseWorkshopImage(courseWorkshop?.imageUrl)

  useEffect(() => {
    setCourseWorkshop(null)
    setError(false)

    api.getCourseWorkshopById(id)
      .then(setCourseWorkshop)
      .catch(() => setError(true))
  }, [id])

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'ha pogut carregar el curs o taller.</p>
  } else if (courseWorkshop) {
    content = (
      <article className={`business-detail detail-layout${courseWorkshop.imageUrl ? ` detail-layout-with-image detail-layout-${orientation}` : ''}`}>
        {courseWorkshop.imageUrl && (
          <img
            key={courseWorkshop.imageUrl}
            className={`detail-image detail-image-${orientation}`}
            src={courseWorkshop.imageUrl}
            alt={`Imatge de ${courseWorkshop.title}`}
            onLoad={onLoad}
            onError={onError}
          />
        )}
        <div className="detail-content">
          {courseWorkshop.date && <p className="business-detail-category">{formatCourseWorkshopDate(courseWorkshop.date)}</p>}
          <h1>{courseWorkshop.title}</h1>

          {courseWorkshop.location && (
            <section className="business-information">
              <h2>Informació</h2>
              <dl>
                <dt>Lloc</dt>
                <dd>{courseWorkshop.location}</dd>
                {courseWorkshop.organizer && (
                  <>
                    <dt>Organitzador</dt>
                    <dd>{courseWorkshop.organizer}</dd>
                  </>
                )}
              </dl>
            </section>
          )}
          {courseWorkshop.description && <p className="business-detail-description">{courseWorkshop.description}</p>}
        </div>
      </article>
    )
  }

  return (
    <>
      <Navbar />
      <main className="business-detail-page">
        <div className="section business-detail-container">
          <Link className="back-link" to="/cursos-tallers">← Tornar a cursos i tallers</Link>
          {content}
        </div>
      </main>
      <Footer />
    </>
  )
}
