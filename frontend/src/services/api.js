import axios from 'axios'

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available (only in browser)
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token')
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized, remove token and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    // If backend is not running, just log warning
    if (!error.response) {
      console.warn('Backend might not be running:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
