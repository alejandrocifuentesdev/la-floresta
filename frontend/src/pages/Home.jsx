import { useEffect, useState } from 'react'
import { api } from '../api/apiClient.js'
import BusinessCard from '../components/BusinessCard.jsx'
import EventCard from '../components/EventCard.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const exploreLinks = [
  { icon: 'calendar', title: 'Agenda', text: 'Activitats i esdeveniments', href: '#agenda' },
  { icon: 'pin', title: 'Mapa', text: "Punts d’interès del poble", href: '#llocs' },
  { icon: 'shop', title: 'Comerços i serveis', text: 'Negocis locals', href: '#comercos-i-serveis' },
  { icon: 'route', title: 'Rutes', text: "Itineraris per l’entorn", href: '#rutes' },
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

function formatPointOfInterest(point) {
  return {
    ...point,
    category: point.category?.replaceAll('_', ' '),
    detail: point.address,
  }
}

function formatRoute(route) {
  const routeDetails = [
    route.distanceKm != null ? `${route.distanceKm} km` : null,
    route.difficulty?.replaceAll('_', ' '),
  ].filter(Boolean)

  return {
    ...route,
    category: routeDetails.join(' · '),
    detail: route.startLocation,
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
    route: <><circle cx="12" cy="5" r="3"/><path d="m11 9-3 7 5 3-3 11M13 12l6 4 4-5M14 19l7 10M24 3l2 2-2 2"/></>,
  }
  return <svg className="explore-icon" viewBox="0 0 32 32" aria-hidden="true">{paths[type]}</svg>
}

export default function Home() {
  const [events, setEvents] = useState(null)
  const [businesses, setBusinesses] = useState(null)
  const [interests, setInterests] = useState(null)
  const [routes, setRoutes] = useState(null)
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
    loadSection('businesses', api.getBusinesses, setBusinesses, formatBusiness)
    loadSection('interests', api.getPointsOfInterest, setInterests, formatPointOfInterest)
    loadSection('routes', api.getRoutes, setRoutes, formatRoute)
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

        <section className="explore-section" id="explora">
          <div className="section explore-inner">
            <h2>Explora La Floresta</h2>
            <div className="explore-grid">
              {exploreLinks.map((item) => (
                <a className="explore-card" href={item.href} key={item.title}>
                  <ExploreIcon type={item.icon} />
                  <span><strong>{item.title}</strong><small>{item.text}</small></span>
                  <span className="arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="comercos-i-serveis">
          <SectionHeading title="Comerços i serveis destacats" linkText="Veure tots els negocis" href="/comercos" />
          <SectionContent items={businesses} error={errors.businesses} className="card-grid business-grid"
            renderItem={(business) => <BusinessCard business={business} key={business.id} />} />
        </section>

        <section className="section continuation-section" id="llocs">
          <SectionHeading title="Llocs d’interès" linkText="Veure el mapa" href="#llocs" />
          <SectionContent items={interests} error={errors.interests} className="card-grid business-grid"
            renderItem={(place) => <BusinessCard business={place} key={place.id} />} />
        </section>

        <section className="section continuation-section" id="rutes">
          <SectionHeading title="Rutes" linkText="Veure totes les rutes" href="#rutes" />
          <SectionContent items={routes} error={errors.routes} className="card-grid business-grid"
            renderItem={(route) => <BusinessCard business={route} key={route.id} />} />
        </section>
      </main>
      <Footer />
    </>
  )
}
