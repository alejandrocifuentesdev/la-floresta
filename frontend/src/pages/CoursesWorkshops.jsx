import { useEffect, useState } from 'react'
import { api } from '../api/apiClient.js'
import CourseWorkshopCard from '../components/CourseWorkshopCard.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import { formatCourseWorkshop } from '../utils/courseWorkshops.js'


export default function CoursesWorkshops() {
  const [coursesWorkshops, setCoursesWorkshops] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.getCoursesWorkshops()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Expected an array from the API')
        setCoursesWorkshops(data.map(formatCourseWorkshop))
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
      <Navbar />
      <main className="agenda-page">
        <section className="section agenda-section">
          <h1>Cursos i tallers</h1>
          {content}
        </section>
      </main>
      <Footer />
    </>
  )
}
