import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkAuth, login } from '../../api/apiClient.js'
import './Admin.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [checking, setChecking] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    checkAuth().then(({ authenticated }) => {
      if (active && authenticated) navigate('/admin', { replace: true })
    }).catch(() => {
      if (active) setError('No s’ha pogut comprovar la sessió. Torna-ho a provar.')
    }).finally(() => { if (active) setChecking(false) })
    return () => { active = false }
  }, [navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(username, password)
      navigate('/admin', { replace: true })
    } catch (error) {
      setError(error.status === 401 ? 'Usuari o contrasenya incorrectes.' : 'No s’ha pogut iniciar la sessió. Torna-ho a provar.')
    } finally {
      setPassword('')
      setSubmitting(false)
    }
  }

  if (checking) return <p className="admin-page">Comprovant sessió...</p>
  return (
    <main className="admin-page">
      <h1>Administració</h1>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={submitting}>
          <label htmlFor="username">Usuari</label>
          <input id="username" name="username" autoComplete="username" required value={username} onChange={event => setUsername(event.target.value)} />
          <label htmlFor="password">Contrasenya</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} />
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button type="submit">{submitting ? 'Iniciant sessió...' : 'Iniciar sessió'}</button>
        </fieldset>
      </form>
    </main>
  )
}
