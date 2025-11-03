import axios from 'axios'
import mockApi from './mockApi'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

// 🔧 Hardcoded backend base URL:
const baseURL = 'http://localhost:5000/api'

const client = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: ensure we got JSON
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
    if (error.response) {
      const ct = error.response.headers?.['content-type'] || ''
      let message = ''
      if (ct.includes('application/json') && error.response.data) {
        if (typeof error.response.data === 'string') message = error.response.data
        else if (error.response.data.message) message = error.response.data.message
        else message = JSON.stringify(error.response.data)
      } else if (typeof error.response.data === 'string') {
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

// API wrapper
const apiReal = {
  login: (data) => client.post('/users/login', data).then(r => r.data),
  register: (data) => client.post('/users/register', data).then(r => r.data),

  // listings
  getListings: (params) => client.get('/listings', { params }).then(r => r.data),
  getListingById: (id) => client.get(`/listings/${id}`).then(r => r.data),

  // wishlist
  addWishlist: (listing_id) => client.post('/wishlist', { listing_id }).then(r => r.data),
  getWishlist: () => client.get('/wishlist').then(r => r.data),
}

const api = useMock ? mockApi : apiReal

export default api
