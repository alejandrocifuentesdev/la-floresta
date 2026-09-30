const difficultyLabels = {
  EASY: 'Fàcil',
  MEDIUM: 'Mitjana',
  HARD: 'Difícil',
}

function formatDuration(minutes) {
  if (minutes == null) return null

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return [hours ? `${hours} h` : null, remainingMinutes ? `${remainingMinutes} min` : null]
    .filter(Boolean)
    .join(' ')
}

export default function RouteCard({ route }) {
  const distance = route.distanceKm != null
    ? `${new Intl.NumberFormat('ca-ES').format(route.distanceKm)} km`
    : null
  const duration = formatDuration(route.durationMinutes)
  const details = [distance, duration].filter(Boolean).join(' · ')

  return (
    <article className="route-card">
      {route.imageUrl && (
        <div
          className="route-image"
          style={{ backgroundImage: `url(${route.imageUrl})` }}
          role="img"
          aria-label={`Imatge de ${route.name}`}
        />
      )}
      <div className="route-content">
        <h3>{route.name}</h3>
        {route.description && <p className="route-description">{route.description}</p>}
        {details && <p className="route-details">{details}</p>}
        {difficultyLabels[route.difficulty] && (
          <p className="route-difficulty">{difficultyLabels[route.difficulty]}</p>
        )}
        {route.startLocation && <p className="route-start"><strong>Inici:</strong> {route.startLocation}</p>}
      </div>
    </article>
  )
}
