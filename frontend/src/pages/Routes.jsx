import { useEffect, useState } from 'react'
import { api } from '../api/apiClient.js'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import RouteCard from '../components/RouteCard.jsx'

const filters = [
  { label: 'Totes', difficulty: null },
  { label: 'Fàcils', difficulty: 'EASY' },
  { label: 'Mitjanes', difficulty: 'MEDIUM' },
  { label: 'Difícils', difficulty: 'HARD' },
]

export default function Routes() {
  const [routes, setRoutes] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.getRoutes()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Expected an array from the API')
        setRoutes(data)
      })
      .catch(() => setError(true))
  }, [])

  const filteredRoutes = routes?.filter(
    (route) => selectedDifficulty === null || route.difficulty === selectedDifficulty,
  )

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'han pogut carregar les rutes.</p>
  } else if (filteredRoutes?.length === 0) {
    content = <p>Encara no hi ha rutes disponibles.</p>
  } else if (filteredRoutes) {
    content = (
      <div className="card-grid routes-grid">
        {filteredRoutes.map((route) => <RouteCard route={route} key={route.id} />)}
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="routes-page">
        <section className="section agenda-section">
          <h1>Rutes</h1>
          <h2>Rutes per descobrir l'entorn de La Floresta</h2>
          <div className="route-filters" aria-label="Filtra per dificultat">
            {filters.map((filter) => (
              <button
                className={selectedDifficulty === filter.difficulty ? 'active' : ''}
                type="button"
                key={filter.label}
                onClick={() => setSelectedDifficulty(filter.difficulty)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {content}
        </section>
      </main>
      <Footer />
    </>
  )
}
