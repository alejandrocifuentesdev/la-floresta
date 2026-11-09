const API_BASE_URL = import.meta.env.VITE_API_URL || ''

async function request(endpoint, options) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, credentials: 'include' })

  if (!response.ok) {
    const error = new Error(`API request failed with status ${response.status}`)
    error.status = response.status
    throw error
  }

  const text = await response.text()
  return text ? JSON.parse(text) : undefined
}

function get(endpoint) {
  return request(endpoint)
}

export const api = {
  getCoursesWorkshops: () => get('/api/courses-workshops'),
  getCourseWorkshopById: (id) => get(`/api/courses-workshops/${encodeURIComponent(id)}`),
  createCourseWorkshop: (data) => request('/api/courses-workshops', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  updateCourseWorkshop: (id, data) => request(`/api/courses-workshops/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deleteCourseWorkshop: (id) => request(`/api/courses-workshops/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  getEvents: () => get('/api/events'),
  createEvent: (event) => request('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  }),
  updateEvent: (id, event) => request(`/api/events/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  }),
  deleteEvent: (id) => request(`/api/events/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  getUpcomingEvents: () => get('/api/events/upcoming'),
  getEventById: (id) => get(`/api/events/${encodeURIComponent(id)}`),
  getBusinesses: () => get('/api/businesses'),
  getFeaturedBusinesses: () => get('/api/businesses/featured'),
  updateBusinessFeatured: (id, featured) => request(`/api/businesses/${encodeURIComponent(id)}/featured`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ featured }),
  }),
  createBusiness: (data) => request('/api/businesses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  updateBusiness: (id, data) => request(`/api/businesses/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deleteBusiness: (id) => request(`/api/businesses/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  getBusinessById: (id) => get(`/api/businesses/${encodeURIComponent(id)}`),
  getProfessionals: () => get('/api/professionals'),
  getProfessionalById: (id) => get(`/api/professionals/${encodeURIComponent(id)}`),
  createProfessional: (data) => request('/api/professionals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  updateProfessional: (id, data) => request(`/api/professionals/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deleteProfessional: (id) => request(`/api/professionals/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  getPointsOfInterest: () => get('/api/points-of-interest'),
  getFeaturedPointsOfInterest: () => get('/api/points-of-interest/featured'),
  updatePointOfInterestFeatured: (id, featured) => request(`/api/points-of-interest/${encodeURIComponent(id)}/featured`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ featured }),
  }),
  createPointOfInterest: (data) => request('/api/points-of-interest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  updatePointOfInterest: (id, data) => request(`/api/points-of-interest/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  deletePointOfInterest: (id) => request(`/api/points-of-interest/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  getPointOfInterestById: (id) => get(`/api/points-of-interest/${encodeURIComponent(id)}`),
}

export function login(username, password) {
  return request('/api/admin/login', {
    method: 'POST',
    body: new URLSearchParams({ username, password }),
  })
}

export function logout() {
  return request('/api/admin/logout', { method: 'POST' })
}

export function checkAuth() {
  return request('/api/admin/auth', { cache: 'no-store' })
}
