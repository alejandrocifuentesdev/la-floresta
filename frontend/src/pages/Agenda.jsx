import { useEffect, useState } from 'react'
import { api } from '../api/apiClient.js'
import EventCard from '../components/EventCard.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

function formatEvent(event) {
  const date = new Date(`${event.date}T12:00:00`)
  return {
    ...event,
    date: Number.isNaN(date.getTime()) ? event.date : new Intl.DateTimeFormat('ca-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(date),
  }
}

export default function Agenda() {
  const [events, setEvents] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.getUpcomingEvents()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Expected an array from the API')
        setEvents(data.map(formatEvent))
      })
      .catch(() => setError(true))
  }, [])

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'han pogut carregar les activitats.</p>
  } else if (events?.length === 0) {
    content = <p>Encara no hi ha activitats programades.</p>
  } else if (events) {
    content = (
      <div className="card-grid events-grid">
        {events.map((event) => <EventCard event={event} key={event.id} />)}
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="agenda-page">
        <section className="section agenda-section">
          <h1>Agenda</h1>
          <h2>Propers esdeveniments</h2>
          {content}
        </section>
      </main>
      <Footer />
    </>
  )
}
