import axios from 'axios'
import mockApi from './mockApi'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'
// default to /api so Vite dev proxy works; override with VITE_API_BASE_URL for production builds
const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const client = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Response interceptor: ensure we got JSON (helps catch when dev server returns index.html)
client.interceptors.response.use(
  (response) => {
    const ct = response.headers?.['content-type'] || ''
    if (!ct.includes('application/json')) {
      const preview = typeof response.data === 'string' ? response.data.slice(0, 300) : JSON.stringify(response.data).slice(0, 300)
      return Promise.reject(new Error(`Expected JSON but received: ${preview}`))
    }
    return response
  },
  (error) => {
    // Normalize errors for callers
    if (error.response) {
      const ct = error.response.headers?.['content-type'] || ''
      let message = ''
      if (ct.includes('application/json') && error.response.data) {
        // server returned JSON error body
        if (typeof error.response.data === 'string') message = error.response.data
        else if (error.response.data.message) message = error.response.data.message
        else message = JSON.stringify(error.response.data)
      } else if (typeof error.response.data === 'string') {
        // got HTML or plain text (likely index.html); include small preview
        message = error.response.data.slice(0, 300)
      } else {
        message = `Request failed with status ${error.response.status}`
      }
      return Promise.reject(new Error(message || `Request failed: ${error.response.status}`))
    }
    if (error.request) return Promise.reject(new Error('No response received from server'))
    return Promise.reject(error)
  }
)

// Request interceptor: attach Authorization header when token is present
client.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (e) {
      // ignore (e.g., during SSR)
    }
    return config
  },
  (error) => Promise.reject(error)
)

// API wrapper - use mock when requested (mockApi should return same shapes)
const apiReal = {
  login: (data) => client.post('/users/login', data).then(r => r.data),
  register: (data) => client.post('/users/register', data).then(r => r.data),

  // listings
  getListings: (params) => client.get('/listings', { params }).then(r => r.data),
  getListingById: (id) => client.get(`/listings/${id}`).then(r => r.data),

  // wishlist - send { listing_id } to match backend expectation
  addWishlist: (id) => client.post('/wishlist', { listing_id: id }).then(r => r.data),
  getWishlist: () => client.get('/wishlist').then(r => r.data),
  removeWishlist: (id) => client.delete(`/wishlist/${id}`).then(r => r.data),
  // bookings
  createBooking: (payload) => client.post('/bookings', payload).then(r => r.data),
  getBookings: () => client.get('/bookings').then(r => r.data),
}

const api = useMock ? mockApi : apiReal

export default api
