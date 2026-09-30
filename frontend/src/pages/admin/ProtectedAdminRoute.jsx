import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkAuth } from '../../api/apiClient.js'
import './Admin.css'

export default function ProtectedAdminRoute() {
  const { pathname } = useLocation()
  const [session, setSession] = useState(null)

  useEffect(() => {
    let active = true
    checkAuth()
      .then(({ authenticated }) => { if (active) setSession({ pathname, authenticated }) })
      .catch(() => { if (active) setSession({ pathname, error: true }) })
    return () => { active = false }
  }, [pathname])

  if (session?.pathname !== pathname) return <p className="admin-page">Comprovant sessió...</p>
  if (session.error) return <p className="admin-page admin-error" role="alert">No s'ha pogut comprovar la sessió. Torna a carregar la pàgina.</p>
  return session.authenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}
