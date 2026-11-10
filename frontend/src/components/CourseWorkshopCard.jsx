import { Link } from 'react-router-dom'
import useCourseWorkshopImage from '../utils/useCourseWorkshopImage.js'

export default function CourseWorkshopCard({ courseWorkshop, showDescription = false }) {
  const { orientation, onLoad, onError } = useCourseWorkshopImage(courseWorkshop.imageUrl)

  return (
    <Link className="event-card-link" to={`/cursos-tallers/${courseWorkshop.id}`}>
      <article className="event-card">
        {courseWorkshop.imageUrl ? (
          <img
            key={courseWorkshop.imageUrl}
            className={`card-image course-workshop-image course-workshop-image-${orientation}`}
            src={courseWorkshop.imageUrl}
            alt={`Imatge de ${courseWorkshop.title}`}
            onLoad={onLoad}
            onError={onError}
          />
        ) : (
          <div className="card-image course-workshop-image image-placeholder" role="img" aria-label="Imatge no disponible" />
        )}
        <div className="event-content">
          <p className="card-meta">{courseWorkshop.date}</p>
          <h3>{courseWorkshop.title}</h3>
          <p className="location">● <span>{courseWorkshop.location}</span></p>
          {showDescription ? (courseWorkshop.description && <p>{courseWorkshop.description}</p>) : (courseWorkshop.organizer && <p>{courseWorkshop.organizer}</p>)}
        </div>
      </article>
    </Link>
  )
}
