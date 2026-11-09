import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/apiClient.js'
import './Admin.css'

const emptyForm = { name: '', description: '', category: '', phone: '', email: '', website: '', imageUrl: '' }

const categories = [
  ['HEALTH', 'Salut'],
  ['WELLNESS', 'Benestar'],
  ['EDUCATION', 'Educació'],
  ['MUSIC', 'Música'],
  ['SPORTS', 'Esport'],
  ['CREATIVE', 'Creativitat'],
  ['HOME', 'Llar i reparacions'],
  ['OTHER', 'Altres'],
]

export default function AdminProfessionals() {
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
      const data = await api.getProfessionals()
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
      phone: item.phone ?? '',
      email: item.email ?? '',
      website: item.website ?? '',
      imageUrl: item.imageUrl ?? '',
    })
    setError('')
    setSuccess('')
    document.getElementById('name').focus()
  }

  async function handleDelete(id) {
    if (busy || !window.confirm('Segur que vols eliminar el professional?')) return
    setError('')
    setSuccess('')
    setDeletingId(id)

    try {
      await api.deleteProfessional(id)
      if (editingId === id) {
        setEditingId(null)
        setForm(emptyForm)
      }
      setSuccess('Professional eliminat correctament.')
      await loadItems()
    } catch {
      setError("No s'ha pogut eliminar el professional.")
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
      ? "No s'ha pogut actualitzar el professional."
      : "No s'ha pogut crear el professional."

    if (!form.name.trim() || !form.description.trim() || !form.category) {
      setError(errorMessage)
      return
    }

    setSaving(true)

    try {
      if (editing) {
        await api.updateProfessional(editingId, form)
      } else {
        await api.createProfessional(form)
      }

      setEditingId(null)
      setForm(emptyForm)
      setSuccess(editing ? 'Professional actualitzat correctament.' : 'Professional creat correctament.')
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
        <h2 id="admin-form-heading">{editingId === null ? 'Professionals locals' : 'Editar professional'}</h2>

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

            <label htmlFor="phone">Telèfon</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} type="tel" />

            <label htmlFor="email">Correu electrònic</label>
            <input id="email" name="email" value={form.email} onChange={handleChange} type="email" />

            <label htmlFor="website">Web o perfil</label>
            <input id="website" name="website" value={form.website} onChange={handleChange} type="text" />

            <label htmlFor="imageUrl">URL de la imatge vertical</label>
            <input id="imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} type="text" />

            <div className="admin-actions">
              <button type="submit" disabled={busy}>
                {saving ? 'Desant...' : editingId === null ? 'Crear professional' : 'Guardar canvis'}
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
        <h2 id="admin-list-heading">Professionals actuals</h2>

        {loading ? (
          <p role="status">Carregant professionals...</p>
        ) : loadError ? (
          <p className="admin-error" role="alert">No s'han pogut carregar els professionals.</p>
        ) : items.length === 0 ? (
          <p>Encara no hi ha professionals.</p>
        ) : (
          <ul className="admin-list">
            {items.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{categories.find(([value]) => value === item.category)?.[1] ?? item.category}</p>
                {item.email && <p>{item.email}</p>}
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
