import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/apiClient.js'
import './Admin.css'

const emptyForm = { title: '', description: '', date: '', location: '', imageUrl: '' }

export default function AdminEvents() {
  const [form, setForm] = useState(emptyForm)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingEventId, setEditingEventId] = useState(null)
  const [deletingEventId, setDeletingEventId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const busy = saving || deletingEventId !== null

  async function loadEvents() {
    setLoading(true)
    setLoadError(false)
    try {
      const data = await api.getEvents()
      if (!Array.isArray(data)) throw new Error('Expected an array from the API')
      setEvents(data)
    } catch {
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function cancelEditing() {
    setEditingEventId(null)
    setForm(emptyForm)
    setError('')
    setSuccess('')
  }

  function startEditing(event) {
    if (busy) return
    setEditingEventId(event.id)
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      imageUrl: event.imageUrl ?? '',
    })
    setError('')
    setSuccess('')
    document.getElementById('event-title').focus()
  }

  async function handleDelete(id) {
    if (busy || !window.confirm('Segur que vols eliminar aquesta activitat?')) return
    setError('')
    setSuccess('')
    setDeletingEventId(id)
    try {
      await api.deleteEvent(id)
      if (editingEventId === id) {
        setEditingEventId(null)
        setForm(emptyForm)
      }
      setSuccess('Activitat eliminada correctament.')
      await loadEvents()
    } catch {
      setError("No s'ha pogut eliminar l'activitat.")
    } finally {
      setDeletingEventId(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (busy) return
    setError('')
    setSuccess('')
    const editing = editingEventId !== null
    const errorMessage = editing
      ? "No s'ha pogut actualitzar l'activitat."
      : "No s'ha pogut crear l'activitat."

    if (!form.title.trim() || !form.description.trim() || !form.date || !form.location.trim()) {
      setError(errorMessage)
      return
    }

    setSaving(true)
    try {
      if (editing) {
        await api.updateEvent(editingEventId, form)
      } else {
        await api.createEvent(form)
      }
      setEditingEventId(null)
      setForm(emptyForm)
      setSuccess(editing ? 'Activitat actualitzada correctament.' : 'Activitat creada correctament.')
      await loadEvents()
    } catch {
      setError(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="admin-page">
      <Link className="admin-back-link" to="/admin">Tornar a administració</Link>
      <h1>Administració</h1>
      <section aria-labelledby="admin-create-heading">
        <h2 id="admin-create-heading">{editingEventId === null ? 'Activitats' : 'Editar activitat'}</h2>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={busy}>
            <label htmlFor="event-title">Títol</label>
            <input id="event-title" name="title" value={form.title} onChange={handleChange} required />

            <label htmlFor="event-description">Descripció</label>
            <textarea id="event-description" name="description" value={form.description} onChange={handleChange} rows={5} required />

            <label htmlFor="event-date">Data</label>
            <input id="event-date" name="date" type="date" value={form.date} onChange={handleChange} required />

            <label htmlFor="event-location">Ubicació</label>
            <input id="event-location" name="location" value={form.location} onChange={handleChange} required />

            <label htmlFor="event-image-url">URL de la imatge</label>
            <input id="event-image-url" name="imageUrl" value={form.imageUrl} onChange={handleChange} />

            <div className="admin-actions">
              <button type="submit" disabled={busy}>
                {saving ? 'Desant activitat...' : editingEventId === null ? 'Crear activitat' : 'Guardar canvis'}
              </button>
              {editingEventId !== null && (
                <button type="button" className="admin-secondary" onClick={cancelEditing}>Cancel·lar</button>
              )}
            </div>
          </fieldset>
        </form>
        {error && <p className="admin-error" role="alert">{error}</p>}
        {success && <p role="status">{success}</p>}
      </section>

      <section aria-labelledby="admin-list-heading" aria-busy={loading}>
        <h2 id="admin-list-heading">Activitats actuals</h2>
        {loading ? (
          <p role="status">Carregant activitats...</p>
        ) : loadError ? (
          <p className="admin-error" role="alert">No s'han pogut carregar les activitats.</p>
        ) : events.length === 0 ? (
          <p>Encara no hi ha activitats.</p>
        ) : (
          <ul className="admin-list">
            {events.map((event) => (
              <li key={event.id}>
                <h3>{event.title}</h3>
                <p><time dateTime={event.date}>{event.date.split('-').reverse().join('/')}</time></p>
                <p>{event.location}</p>
                <div className="admin-actions">
                  <button type="button" className="admin-secondary" disabled={busy} onClick={() => startEditing(event)}>Editar</button>
                  <button type="button" className="admin-secondary" disabled={busy} onClick={() => handleDelete(event.id)}>
                    {deletingEventId === event.id ? 'Eliminant...' : 'Eliminar'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
