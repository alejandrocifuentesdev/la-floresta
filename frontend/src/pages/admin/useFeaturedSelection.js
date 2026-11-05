import { useRef, useState } from 'react'

export default function useFeaturedSelection({ items, setItems, updateFeatured, loadItems, busy }) {
  const [changingId, setChangingId] = useState(null)
  const [error, setError] = useState('')
  const pending = useRef(false)
  const count = items.filter((item) => item.featured).length

  async function toggle(item) {
    if (busy || pending.current) return
    setError('')
    if (!item.featured && count >= 3) {
      setError("Ja hi ha 3 seleccionats. Desmarca'n un abans de seleccionar-ne un altre.")
      return
    }
    pending.current = true
    setChangingId(item.id)
    try {
      const updated = await updateFeatured(item.id, !item.featured)
      setItems((current) => current.map((entry) => entry.id === updated.id ? updated : entry))
    } catch (failure) {
      setError(failure.status === 409
        ? "Ja hi ha 3 seleccionats. Desmarca'n un abans de seleccionar-ne un altre."
        : "No s'ha pogut canviar la selecció de l'inici.")
      await loadItems()
    } finally {
      pending.current = false
      setChangingId(null)
    }
  }

  return { count, changingId, error, toggle }
}
