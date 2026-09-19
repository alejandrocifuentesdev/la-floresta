import { useEffect, useState } from 'react'
import { api } from '../api/apiClient.js'
import BusinessCard from '../components/BusinessCard.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

const filters = [
  { label: 'Tots', category: null },
  { label: 'Bars', category: 'BAR' },
  { label: 'Restaurants', category: 'RESTAURANT' },
  { label: 'Botigues', category: 'SHOP' },
  { label: 'Serveis', category: 'SERVICE' },
  { label: 'Altres', category: 'OTHER' },
]

function formatBusiness(business) {
  return {
    ...business,
    category: business.category?.replaceAll('_', ' '),
    detail: business.address,
  }
}

export default function Businesses() {
  const [businesses, setBusinesses] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.getBusinesses()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Expected an array from the API')
        setBusinesses(data.map(formatBusiness))
      })
      .catch(() => setError(true))
  }, [])

  const filteredBusinesses = businesses?.filter(
    (business) => selectedCategory === null || business.category === selectedCategory,
  )

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'han pogut carregar els comerços i serveis.</p>
  } else if (filteredBusinesses?.length === 0) {
    content = <p>Encara no hi ha comerços o serveis.</p>
  } else if (filteredBusinesses) {
    content = (
      <div className="card-grid business-grid">
        {filteredBusinesses.map((business) => <BusinessCard business={business} key={business.id} />)}
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="businesses-page">
        <section className="section agenda-section">
          <h1>Comerços i serveis</h1>
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
