import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/apiClient.js'
import './Admin.css'

const emptyForm = { name: '', description: '', category: '', address: '', latitude: '', longitude: '', imageUrl: '' }
const categories = [
  ['PARK', 'Parc'],
  ['VIEWPOINT', 'Mirador'],
  ['CULTURE', 'Cultura'],
  ['TRANSPORT', 'Transport'],
  ['SPORTS', 'Esports'],
  ['PUBLIC_SERVICE', 'Servei públic'],
  ['OTHER', 'Altres'],
]

export default function AdminPointsOfInterest() {
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
      const data = await api.getPointsOfInterest()
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
      category: item.category ?? '',
      address: item.address ?? '',
      latitude: item.latitude ?? '',
      longitude: item.longitude ?? '',
      imageUrl: item.imageUrl ?? '',
    })
    setError('')
    setSuccess('')
    document.getElementById('name').focus()
  }

  async function handleDelete(id) {
    if (busy || !window.confirm("Segur que vols eliminar el lloc d'interès?")) return
    setError('')
    setSuccess('')
    setDeletingId(id)
    try {
      await api.deletePointOfInterest(id)
      if (editingId === id) {
        setEditingId(null)
        setForm(emptyForm)
      }
      setSuccess("Lloc d'interès eliminat correctament.")
      await loadItems()
    } catch {
      setError("No s'ha pogut eliminar el lloc d'interès.")
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
      ? "No s'ha pogut actualitzar el lloc d'interès."
      : "No s'ha pogut crear el lloc d'interès."

    if (!form.name.trim() || !form.description.trim() || !form.category || !form.address.trim() ||
      form.latitude === '' || !Number.isFinite(Number(form.latitude)) || Number(form.latitude) < -90 || Number(form.latitude) > 90 ||
      form.longitude === '' || !Number.isFinite(Number(form.longitude)) || Number(form.longitude) < -180 || Number(form.longitude) > 180) {
      setError(errorMessage)
      return
    }

    const payload = {
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    }
    setSaving(true)
    try {
      if (editing) {
        await api.updatePointOfInterest(editingId, payload)
      } else {
        await api.createPointOfInterest(payload)
      }
      setEditingId(null)
      setForm(emptyForm)
      setSuccess(editing ? "Lloc d'interès actualitzat correctament." : "Lloc d'interès creat correctament.")
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
        <h2 id="admin-form-heading">{editingId === null ? "Llocs d'interès" : "Editar lloc d'interès"}</h2>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={busy}>
            <label htmlFor="name">Nom</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required type="text" />

            <label htmlFor="description">Descripció</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} required rows={5} />

            <label htmlFor="category">Categoria</label>
            <select id="category" name="category" value={form.category} onChange={handleChange} required>
              <option value="">Selecciona una opció</option>
              {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>

            <label htmlFor="address">Adreça</label>
            <input id="address" name="address" value={form.address} onChange={handleChange} required type="text" />

            <label htmlFor="latitude">Latitud</label>
            <input id="latitude" name="latitude" value={form.latitude} onChange={handleChange} required type="number" step="any" min="-90" max="90" />

            <label htmlFor="longitude">Longitud</label>
            <input id="longitude" name="longitude" value={form.longitude} onChange={handleChange} required type="number" step="any" min="-180" max="180" />

            <label htmlFor="imageUrl">URL de la imatge</label>
            <input id="imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} type="text" />

            <div className="admin-actions">
              <button type="submit" disabled={busy}>
                {saving ? 'Desant...' : editingId === null ? "Crear lloc d'interès" : 'Guardar canvis'}
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
        <h2 id="admin-list-heading">Llocs d'interès actuals</h2>
        {loading ? (
          <p role="status">Carregant llocs d'interès...</p>
        ) : loadError ? (
          <p className="admin-error" role="alert">No s'han pogut carregar els llocs d'interès.</p>
        ) : items.length === 0 ? (
          <p>Encara no hi ha llocs d'interès.</p>
        ) : (
          <ul className="admin-list">
            {items.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{categories.find(([value]) => value === item.category)?.[1] ?? item.category}</p>
                <p>{item.address}</p>
                <p>{item.latitude}, {item.longitude}</p>
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
