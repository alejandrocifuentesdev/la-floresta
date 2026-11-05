export function formatCourseWorkshopDate(value) {
  const date = new Date(`${value}T12:00:00`)
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('ca-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(date)
}

export function formatCourseWorkshop(courseWorkshop) {
  return { ...courseWorkshop, date: formatCourseWorkshopDate(courseWorkshop.date) }
}
