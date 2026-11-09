import { useEffect, useState } from 'react'
import { api } from '../api/apiClient.js'
import ProfessionalCard from '../components/ProfessionalCard.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

const filters = [
  { label: 'Tots', category: null },
  { label: 'Salut', category: 'HEALTH' },
  { label: 'Benestar', category: 'WELLNESS' },
  { label: 'Educació', category: 'EDUCATION' },
  { label: 'Música', category: 'MUSIC' },
  { label: 'Esport', category: 'SPORTS' },
  { label: 'Creativitat', category: 'CREATIVE' },
  { label: 'Llar i reparacions', category: 'HOME' },
  { label: 'Altres', category: 'OTHER' },
]

const categoryLabels = Object.fromEntries(filters.filter((filter) => filter.category).map((filter) => [filter.category, filter.label]))

function formatProfessional(professional) {
  return {
    ...professional,
    categoryLabel: categoryLabels[professional.category] || 'Altres',
  }
}

export default function Professionals() {
  const [professionals, setProfessionals] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.getProfessionals()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Expected an array from the API')
        setProfessionals(data.map(formatProfessional))
      })
      .catch(() => setError(true))
  }, [])

  const filteredProfessionals = professionals?.filter(
    (professional) => selectedCategory === null || professional.category === selectedCategory,
  )

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'han pogut carregar els professionals.</p>
  } else if (filteredProfessionals?.length === 0) {
    content = <p>Encara no hi ha professionals publicats.</p>
  } else if (filteredProfessionals) {
    content = (
      <div className="card-grid professional-grid">
        {filteredProfessionals.map((professional) => (
          <ProfessionalCard professional={professional} key={professional.id} to={`/professionals/${professional.id}`} />
        ))}
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="professionals-page">
        <section className="section agenda-section">
          <h1>Professionals locals</h1>
          <div className="business-filters" aria-label="Filtra per categoria">
            {filters.map((filter) => (
              <button
                className={selectedCategory === filter.category ? 'active' : ''}
                type="button"
                key={filter.label}
                onClick={() => setSelectedCategory(filter.category)}
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
