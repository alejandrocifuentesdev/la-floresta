import { useEffect, useState } from 'react'
import { api } from '../api/apiClient.js'
import BusinessCard from '../components/BusinessCard.jsx'
import EventCard from '../components/EventCard.jsx'
import CourseWorkshopCard from '../components/CourseWorkshopCard.jsx'
import { formatCourseWorkshop } from '../utils/courseWorkshops.js'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ProfessionalCard from '../components/ProfessionalCard.jsx'

const exploreLinks = [
  { icon: 'calendar', title: 'Agenda', text: 'Activitats i esdeveniments', href: '#agenda' },
  { icon: 'pin', title: 'Mapa', text: "Punts d’interès del poble", href: '#llocs' },
  { icon: 'shop', title: 'Comerços i serveis', text: 'Negocis locals', href: '#comercos-i-serveis' },
]

function formatEvent(event) {
  const date = new Date(`${event.date}T12:00:00`)
  return {
    ...event,
    date: Number.isNaN(date.getTime()) ? event.date : new Intl.DateTimeFormat('ca-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(date),
  }
}

function formatBusiness(business) {
  return {
    ...business,
    category: business.category?.replaceAll('_', ' '),
    detail: business.address,
  }
}

const professionalCategoryLabels = {
  HEALTH: 'Salut',
  WELLNESS: 'Benestar',
  EDUCATION: 'Educació',
  MUSIC: 'Música',
  SPORTS: 'Esport',
  CREATIVE: 'Creativitat',
  HOME: 'Llar i reparacions',
  OTHER: 'Altres',
}

function formatProfessional(professional) {
  return {
    ...professional,
    categoryLabel: professionalCategoryLabels[professional.category] || 'Altres',
  }
}

function formatPointOfInterest(point) {
  return {
    ...point,
    category: point.category?.replaceAll('_', ' '),
    detail: point.address,
  }
}

function SectionContent({ items, error, className, renderItem }) {
  if (error) return <p>No s'han pogut carregar les dades d'aquesta secció.</p>
  if (items === null) return <p>Carregant...</p>
  if (items.length === 0) return <p>Encara no hi ha contingut.</p>

  return <div className={className}>{items.map(renderItem)}</div>
}

function ExploreIcon({ type }) {
  const paths = {
    calendar: <><rect x="4" y="5" width="24" height="23" rx="2"/><path d="M9 2v6M23 2v6M4 11h24"/></>,
    pin: <><path d="M16 30S5 20 5 11a11 11 0 0 1 22 0c0 9-11 19-11 19Z"/><circle cx="16" cy="11" r="4"/></>,
    shop: <><path d="M3 12h26L25 4H7l-4 8Z"/><path d="M5 12v16h22V12M12 28V18h8v10M3 12c0 3 5 4 7 0 2 4 10 4 12 0 2 4 7 3 7 0"/></>,
  }
  return <svg className="explore-icon" viewBox="0 0 32 32" aria-hidden="true">{paths[type]}</svg>
}

export default function Home() {
  const [events, setEvents] = useState(null)
  const [coursesWorkshops, setCoursesWorkshops] = useState(null)
  const [businesses, setBusinesses] = useState(null)
  const [professionals, setProfessionals] = useState(null)
  const [interests, setInterests] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const loadSection = (key, request, setItems, formatter) => {
      request()
        .then((data) => {
          if (!Array.isArray(data)) throw new Error('Expected an array from the API')
          setItems(data.slice(0, 3).map(formatter))
        })
        .catch(() => setErrors((current) => ({ ...current, [key]: true })))
    }

    loadSection('events', api.getUpcomingEvents, setEvents, formatEvent)
    loadSection('coursesWorkshops', api.getCoursesWorkshops, setCoursesWorkshops, formatCourseWorkshop)
    loadSection('businesses', api.getFeaturedBusinesses, setBusinesses, formatBusiness)
    loadSection('professionals', api.getProfessionals, setProfessionals, formatProfessional)
    loadSection('interests', api.getFeaturedPointsOfInterest, setInterests, formatPointOfInterest)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <section className="hero" id="inici" aria-label="Vista panoràmica de La Floresta" />

        <section className="section" id="agenda">
          <SectionHeading title="Properes activitats" linkText="Veure tota l’agenda" href="/agenda" />
          <SectionContent items={events} error={errors.events} className="card-grid events-grid"
            renderItem={(event) => <EventCard event={event} key={event.id} />} />
        </section>


        <section className="section" id="cursos-tallers">
          <SectionHeading title="Cursos i tallers" linkText="Veure tots els cursos i tallers" href="/cursos-tallers" />
          <SectionContent items={coursesWorkshops} error={errors.coursesWorkshops} className="card-grid events-grid"
            renderItem={(courseWorkshop) => <CourseWorkshopCard courseWorkshop={courseWorkshop} key={courseWorkshop.id} />} />
        </section>

        <section className="section" id="comercos-i-serveis">
          <SectionHeading title="Comerços i serveis destacats" linkText="Veure tots els negocis" href="/comercos" />
          <SectionContent items={businesses} error={errors.businesses} className="card-grid business-grid"
            renderItem={(business) => (
              <BusinessCard business={business} key={business.id} to={`/comercos/${business.id}`} />
            )} />
        </section>

        <section className="section" id="professionals">
          <SectionHeading title="Professionals locals" linkText="Veure tots els professionals" href="/professionals" />
          <SectionContent items={professionals} error={errors.professionals} className="card-grid professional-grid"
            renderItem={(professional) => (
              <ProfessionalCard professional={professional} key={professional.id} to={`/professionals/${professional.id}`} />
            )} />
        </section>

        <section className="section continuation-section" id="llocs">
          <SectionHeading title="Llocs d’interès" linkText="Veure el mapa" href="/mapa" />
          <SectionContent items={interests} error={errors.interests} className="card-grid business-grid"
            renderItem={(place) => <BusinessCard business={place} key={place.id} />} />
        </section>

      </main>
      <Footer />
    </>
  )
}
