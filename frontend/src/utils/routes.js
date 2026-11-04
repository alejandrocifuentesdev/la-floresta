export const difficultyLabels = {
  EASY: 'Fàcil',
  MEDIUM: 'Mitjana',
  HARD: 'Difícil',
}

export function formatDuration(minutes) {
  if (minutes == null) return null
  if (minutes === 0) return '0 min'

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return [hours ? `${hours} h` : null, remainingMinutes ? `${remainingMinutes} min` : null]
    .filter(Boolean)
    .join(' ')
}
