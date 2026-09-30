import { useEffect, useState } from 'react'
import { Icon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { api } from '../api/apiClient.js'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import PointOfInterestCard from '../components/PointOfInterestCard.jsx'
import { getPointOfInterestCategoryLabel } from '../utils/pointOfInterestCategories.js'

const LA_FLORESTA_POSITION = [41.4445, 2.073]

const defaultMarkerIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function hasValidPosition(point) {
  return Number.isFinite(Number(point.latitude)) && Number.isFinite(Number(point.longitude))
}

export default function Map() {
  const [points, setPoints] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.getPointsOfInterest()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Expected an array from the API')
        setPoints(data)
      })
      .catch(() => setError(true))
  }, [])

  let content = <p>Carregant...</p>

  if (error) {
    content = <p>No s'han pogut carregar els llocs d'interès.</p>
  } else if (points?.length === 0) {
    content = <p>Encara no hi ha llocs d'interès.</p>
  } else if (points) {
    content = (
      <MapContainer className="points-map" center={LA_FLORESTA_POSITION} zoom={15} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.filter(hasValidPosition).map((point) => (
          <Marker
            icon={defaultMarkerIcon}
            key={point.id}
            position={[Number(point.latitude), Number(point.longitude)]}
          >
            <Popup>
              <div className="point-popup">
                {point.imageUrl && <img src={point.imageUrl} alt="" />}
                <strong><Link to={`/llocs/${point.id}`}>{point.name}</Link></strong>
                <span>{getPointOfInterestCategoryLabel(point.category)}</span>
                {point.address && <span>{point.address}</span>}
                {point.description && <p>{point.description}</p>}
                <Link className="point-popup-link" to={`/llocs/${point.id}`}>Veure més →</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    )
  }

  return (
    <>
      <Navbar />
      <main className="map-page">
        <section className="section agenda-section">
          <h1>Mapa</h1>
          <h2>Llocs d'interès de La Floresta</h2>
          {content}
          {points?.length > 0 && (
            <section className="points-section">
              <h2>Llocs d'interès</h2>
              <div className="card-grid points-grid">
                {points.map((point) => (
                  <PointOfInterestCard key={point.id} point={point} />
                ))}
              </div>
            </section>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
