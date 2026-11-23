import Seo from '../components/Seo.jsx'
import { useEffect, useState } from 'react'
import { api } from '../api/apiClient.js'
import CourseWorkshopCard from '../components/CourseWorkshopCard.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import { formatCourseWorkshop, sortCoursesWorkshopsByDate } from '../utils/courseWorkshops.js'


export default function CoursesWorkshops() {
  const [coursesWorkshops, setCoursesWorkshops] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.getCoursesWorkshops()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Expected an array from the API')
        setCoursesWorkshops(sortCoursesWorkshopsByDate(data).map(formatCourseWorkshop))
      })
      .catch(() => setError(true))
  }, [])

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'han pogut carregar els cursos i tallers.</p>
  } else if (coursesWorkshops?.length === 0) {
    content = <p>Encara no hi ha cursos ni tallers disponibles.</p>
  } else if (coursesWorkshops) {
    content = (
      <div className="card-grid events-grid">
        {coursesWorkshops.map((courseWorkshop) => <CourseWorkshopCard courseWorkshop={courseWorkshop} key={courseWorkshop.id} />)}
      </div>
    )
  }

  return (
    <>
      <Seo />
      <Navbar />
      <main className="agenda-page">
        <section className="section agenda-section">
          <h1>Cursos i tallers a La Floresta</h1>
          <p className="section-intro">Descobreix propostes de dansa, art, moviment i altres activitats a La Floresta, Sant Cugat del Vallès. Consulta les dates, els espais i les dades d’inscripció de cada curs o taller.</p>
          {content}
        </section>
      </main>
      <Footer />
    </>
  )
}
