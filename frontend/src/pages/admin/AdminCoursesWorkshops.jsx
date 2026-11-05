import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/apiClient.js'
import './Admin.css'

const emptyForm = { title: '', description: '', date: '', location: '', organizer: '', imageUrl: '' }

export default function AdminCoursesWorkshops() {
  const [form, setForm] = useState(emptyForm)
  const [coursesWorkshops, setCoursesWorkshops] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingCourseWorkshopId, setEditingCourseWorkshopId] = useState(null)
  const [deletingCourseWorkshopId, setDeletingCourseWorkshopId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const busy = saving || deletingCourseWorkshopId !== null

  async function loadCoursesWorkshops() {
    setLoading(true)
    setLoadError(false)
    try {
      const data = await api.getCoursesWorkshops()
      if (!Array.isArray(data)) throw new Error('Expected an array from the API')
      setCoursesWorkshops(data)
    } catch {
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCoursesWorkshops()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function cancelEditing() {
    setEditingCourseWorkshopId(null)
    setForm(emptyForm)
    setError('')
    setSuccess('')
  }

  function startEditing(event) {
    if (busy) return
    setEditingCourseWorkshopId(event.id)
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      organizer: event.organizer ?? '',
      imageUrl: event.imageUrl ?? '',
    })
    setError('')
    setSuccess('')
    document.getElementById('course-workshop-title').focus()
  }

  async function handleDelete(id) {
    if (busy || !window.confirm('Segur que vols eliminar aquest curs o taller?')) return
    setError('')
    setSuccess('')
    setDeletingCourseWorkshopId(id)
    try {
      await api.deleteCourseWorkshop(id)
      if (editingCourseWorkshopId === id) {
        setEditingCourseWorkshopId(null)
        setForm(emptyForm)
      }
      setSuccess('Curs o taller eliminat correctament.')
      await loadCoursesWorkshops()
    } catch {
      setError("No s'ha pogut eliminar el curs o taller.")
    } finally {
      setDeletingCourseWorkshopId(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (busy) return
    setError('')
    setSuccess('')
    const editing = editingCourseWorkshopId !== null
    const errorMessage = editing
      ? "No s'ha pogut actualitzar el curs o taller."
      : "No s'ha pogut crear el curs o taller."

    if (!form.title.trim() || !form.description.trim() || !form.date || !form.location.trim()) {
      setError(errorMessage)
      return
    }

    setSaving(true)
    try {
      if (editing) {
        await api.updateCourseWorkshop(editingCourseWorkshopId, form)
      } else {
        await api.createCourseWorkshop(form)
      }
      setEditingCourseWorkshopId(null)
      setForm(emptyForm)
      setSuccess(editing ? 'Curs o taller actualitzat correctament.' : 'Curs o taller creat correctament.')
      await loadCoursesWorkshops()
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
        <h2 id="admin-create-heading">{editingCourseWorkshopId === null ? 'Cursos i tallers' : 'Editar curs o taller'}</h2>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={busy}>
            <label htmlFor="course-workshop-title">Títol</label>
            <input id="course-workshop-title" name="title" value={form.title} onChange={handleChange} required />

            <label htmlFor="course-workshop-description">Descripció</label>
            <textarea id="course-workshop-description" name="description" value={form.description} onChange={handleChange} rows={5} required />

            <label htmlFor="course-workshop-date">Data</label>
            <input id="course-workshop-date" name="date" type="date" value={form.date} onChange={handleChange} required />

            <label htmlFor="course-workshop-location">Ubicació</label>
            <input id="course-workshop-location" name="location" value={form.location} onChange={handleChange} required />

            <label htmlFor="course-workshop-organizer">Organitzador</label>
            <input id="course-workshop-organizer" name="organizer" value={form.organizer} onChange={handleChange} />

            <label htmlFor="course-workshop-image-url">URL de la imatge</label>
            <input id="course-workshop-image-url" name="imageUrl" value={form.imageUrl} onChange={handleChange} />

            <div className="admin-actions">
              <button type="submit" disabled={busy}>
                {saving ? 'Desant curs o taller...' : editingCourseWorkshopId === null ? 'Crear curs o taller' : 'Guardar canvis'}
              </button>
              {editingCourseWorkshopId !== null && (
                <button type="button" className="admin-secondary" onClick={cancelEditing}>Cancel·lar</button>
              )}
            </div>
          </fieldset>
        </form>
        {error && <p className="admin-error" role="alert">{error}</p>}
        {success && <p role="status">{success}</p>}
      </section>

      <section aria-labelledby="admin-list-heading" aria-busy={loading}>
        <h2 id="admin-list-heading">Cursos i tallers actuals</h2>
        {loading ? (
          <p role="status">Carregant cursos i tallers...</p>
        ) : loadError ? (
          <p className="admin-error" role="alert">No s'han pogut carregar els cursos i tallers.</p>
        ) : coursesWorkshops.length === 0 ? (
          <p>Encara no hi ha cursos i tallers.</p>
        ) : (
          <ul className="admin-list">
            {coursesWorkshops.map((event) => (
              <li key={event.id}>
                <h3>{event.title}</h3>
                <p><time dateTime={event.date}>{event.date.split('-').reverse().join('/')}</time></p>
                <p>{event.location}</p>
                {event.organizer && <p>{event.organizer}</p>}
                <div className="admin-actions">
                  <button type="button" className="admin-secondary" disabled={busy} onClick={() => startEditing(event)}>Editar</button>
                  <button type="button" className="admin-secondary" disabled={busy} onClick={() => handleDelete(event.id)}>
                    {deletingCourseWorkshopId === event.id ? 'Eliminant...' : 'Eliminar'}
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
