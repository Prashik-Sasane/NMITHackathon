import { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored token and validate with backend
    const token = localStorage.getItem('token')
    if (token) {
      validateToken()
    } else {
      setLoading(false)
    }
  }, [])

  const validateToken = async () => {
    try {
      const response = await apiService.auth.getMe()
      if (response.success) {
        setUser(response.data.user)
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    } catch (error) {
      // Token is invalid or expired
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await apiService.auth.login({ email, password })
      
      if (response.success) {
        const { user, token } = response.data
        setUser(user)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Login failed' }
      }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' }
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await apiService.auth.register({ username, email, password })
      
      if (response.success) {
        const { user, token } = response.data
        setUser(user)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Registration failed' }
      }
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' }
    }
  }

  const logout = async () => {
    try {
      // Call logout endpoint to invalidate token on server
      await apiService.auth.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local state regardless of API call result
      setUser(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  const updateProfile = async (updates) => {
    try {
      const response = await apiService.auth.updateProfile(updates)
      
      if (response.success) {
        const updatedUser = response.data.user
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Update failed' }
      }
    } catch (error) {
      return { success: false, error: error.message || 'Update failed' }
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await apiService.auth.changePassword({
        currentPassword,
        newPassword
      })
      
      if (response.success) {
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Password change failed' }
      }
    } catch (error) {
      return { success: false, error: error.message || 'Password change failed' }
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
