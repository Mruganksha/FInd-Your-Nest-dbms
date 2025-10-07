import axios from 'axios'
import mockApi from './mockApi'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'
const baseURL = import.meta.env.VITE_API_BASE_URL || ''

const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

// Exported API wrapper - uses mock functions when VITE_USE_MOCK=true
const api = {
  login: (data) => useMock ? mockApi.login(data) : client.post('/users/login', data).then(r=>r.data),
  register: (data) => useMock ? mockApi.register(data) : client.post('/users/register', data).then(r=>r.data),
  getListings: (params) => useMock ? mockApi.getListings(params) : client.get('/listings', { params }).then(r=>r.data),
  getListingById: (id) => useMock ? mockApi.getListingById(id) : client.get(`/listings/${id}`).then(r=>r.data),
  addWishlist: (listingId) => useMock ? mockApi.addWishlist(listingId) : client.post('/wishlist', { listingId }).then(r=>r.data),
  getWishlist: () => useMock ? mockApi.getWishlist() : client.get('/wishlist').then(r=>r.data),
}

export default api
