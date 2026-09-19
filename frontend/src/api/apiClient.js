const API_BASE_URL = import.meta.env.VITE_API_URL || ''

async function get(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}

export const api = {
  getUpcomingEvents: () => get('/api/events/upcoming'),
  getBusinesses: () => get('/api/businesses'),
  getPointsOfInterest: () => get('/api/points-of-interest'),
  getRoutes: () => get('/api/routes'),
}
