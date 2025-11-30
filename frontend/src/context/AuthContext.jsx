import { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

// Create context for authentication
const AuthContext = createContext()

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => {
    // Get token from localStorage if it exists
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  })
  const [loading, setLoading] = useState(true)

  // Function to fetch user data from API
  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data.user)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      setLoading(false)
    }
  }

  // Check if user is logged in when component mounts
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { user, token } = response.data
      
      // Save token to localStorage
      localStorage.setItem('token', token)
      setToken(token)
      setUser(user)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      }
    }
  }

  // Register function
  const register = async (email, password, name) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
      })
      const { user, token } = response.data
      
      // Save token to localStorage
      localStorage.setItem('token', token)
      setToken(token)
      setUser(user)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed',
      }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete api.defaults.headers.common['Authorization']
  }

  // Update profile function
  const updateProfile = async (updates) => {
    try {
      const response = await api.put('/auth/profile', updates)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Update failed',
      }
    }
  }

  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await api.put('/auth/password', {
        currentPassword,
        newPassword,
      })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Password change failed',
      }
    }
  }

  // Value to provide to context
  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
