import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/apiClient.js'
import './Admin.css'

const emptyForm = { name: '', description: '', distanceKm: '', durationMinutes: '', difficulty: '', startLocation: '', imageUrl: '' }
const difficulties = [
  ['EASY', 'Fàcil'],
  ['MEDIUM', 'Mitjana'],
  ['HARD', 'Difícil'],
]

export default function AdminRoutes() {
  const [form, setForm] = useState(emptyForm)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const busy = saving || deletingId !== null

  async function loadItems() {
    setLoading(true)
    setLoadError(false)
    try {
      const data = await api.getRoutes()
      if (!Array.isArray(data)) throw new Error('Expected an array from the API')
      setItems(data)
    } catch {
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function cancelEditing() {
    setEditingId(null)
    setForm(emptyForm)
    setError('')
    setSuccess('')
  }

  function startEditing(item) {
    if (busy) return
    setEditingId(item.id)
    setForm({
      name: item.name ?? '',
      description: item.description ?? '',
      distanceKm: item.distanceKm ?? '',
      durationMinutes: item.durationMinutes ?? '',
      difficulty: item.difficulty ?? '',
      startLocation: item.startLocation ?? '',
      imageUrl: item.imageUrl ?? '',
    })
    setError('')
    setSuccess('')
    document.getElementById('name').focus()
  }

  async function handleDelete(id) {
    if (busy || !window.confirm("Segur que vols eliminar la ruta?")) return
    setError('')
    setSuccess('')
    setDeletingId(id)
    try {
      await api.deleteRoute(id)
      if (editingId === id) {
        setEditingId(null)
        setForm(emptyForm)
      }
      setSuccess('Ruta eliminada correctament.')
      await loadItems()
    } catch {
      setError("No s'ha pogut eliminar la ruta.")
    } finally {
      setDeletingId(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (busy) return
    setError('')
    setSuccess('')
    const editing = editingId !== null
    const errorMessage = editing
      ? "No s'ha pogut actualitzar la ruta."
      : "No s'ha pogut crear la ruta."

    if (!form.name.trim() || !form.description.trim() || !form.difficulty || !form.startLocation.trim() ||
      form.distanceKm === '' || !Number.isFinite(Number(form.distanceKm)) || Number(form.distanceKm) <= 0 ||
      form.durationMinutes === '' || !Number.isInteger(Number(form.durationMinutes)) || Number(form.durationMinutes) <= 0) {
      setError(errorMessage)
      return
    }

    const payload = {
      ...form,
      distanceKm: Number(form.distanceKm),
      durationMinutes: Number(form.durationMinutes),
    }
    setSaving(true)
    try {
      if (editing) {
        await api.updateRoute(editingId, payload)
      } else {
        await api.createRoute(payload)
      }
      setEditingId(null)
      setForm(emptyForm)
      setSuccess(editing ? 'Ruta actualitzada correctament.' : 'Ruta creada correctament.')
      await loadItems()
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
      <section aria-labelledby="admin-form-heading">
        <h2 id="admin-form-heading">{editingId === null ? "Rutes" : "Editar ruta"}</h2>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={busy}>
            <label htmlFor="name">Nom</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required type="text" />

            <label htmlFor="description">Descripció</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} required rows={5} />

            <label htmlFor="distanceKm">Distància (km)</label>
            <input id="distanceKm" name="distanceKm" value={form.distanceKm} onChange={handleChange} required type="number" step="any" min="0" />

            <label htmlFor="durationMinutes">Durada (minuts)</label>
            <input id="durationMinutes" name="durationMinutes" value={form.durationMinutes} onChange={handleChange} required type="number" step="1" min="1" />

            <label htmlFor="difficulty">Dificultat</label>
            <select id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange} required>
              <option value="">Selecciona una opció</option>
              {difficulties.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>

            <label htmlFor="startLocation">Lloc d'inici</label>
            <input id="startLocation" name="startLocation" value={form.startLocation} onChange={handleChange} required type="text" />

            <label htmlFor="imageUrl">URL de la imatge</label>
            <input id="imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} type="text" />

            <div className="admin-actions">
              <button type="submit" disabled={busy}>
                {saving ? 'Desant...' : editingId === null ? "Crear ruta" : 'Guardar canvis'}
              </button>
              {editingId !== null && (
                <button type="button" className="admin-secondary" onClick={cancelEditing}>Cancel·lar</button>
              )}
            </div>
          </fieldset>
        </form>
        {error && <p className="admin-error" role="alert">{error}</p>}
        {success && <p role="status">{success}</p>}
      </section>

      <section aria-labelledby="admin-list-heading" aria-busy={loading}>
        <h2 id="admin-list-heading">Rutes actuals</h2>
        {loading ? (
          <p role="status">Carregant rutes...</p>
        ) : loadError ? (
          <p className="admin-error" role="alert">No s'han pogut carregar les rutes.</p>
        ) : items.length === 0 ? (
          <p>Encara no hi ha rutes.</p>
        ) : (
          <ul className="admin-list">
            {items.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.distanceKm} km · {item.durationMinutes} min · {difficulties.find(([value]) => value === item.difficulty)?.[1] ?? item.difficulty}</p>
                <p>{item.startLocation}</p>
                <div className="admin-actions">
                  <button type="button" className="admin-secondary" disabled={busy} onClick={() => startEditing(item)}>Editar</button>
                  <button type="button" className="admin-secondary" disabled={busy} onClick={() => handleDelete(item.id)}>
                    {deletingId === item.id ? 'Eliminant...' : 'Eliminar'}
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
