import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../api/apiClient.js'
import './Admin.css'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleLogout() {
    setSubmitting(true)
    setError('')
    try {
      await logout()
      navigate('/admin/login', { replace: true })
    } catch {
      setError('No s’ha pogut tancar la sessió. Torna-ho a provar.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <main className="admin-page">
      <h1>Administració</h1>
      <nav aria-label="Seccions d'administració">
        <ul className="admin-list admin-dashboard-links">
          <li><Link to="/admin/activitats">Activitats</Link></li>
          <li><Link to="/admin/comercos">Comerços</Link></li>
          <li><Link to="/admin/llocs">Llocs d'interès</Link></li>
          <li><Link to="/admin/rutes">Rutes</Link></li>
        </ul>
      </nav>
      <button className="admin-secondary" disabled={submitting} onClick={handleLogout}>Tancar sessió</button>
      {error && <p className="admin-error" role="alert">{error}</p>}
    </main>
  )
}
