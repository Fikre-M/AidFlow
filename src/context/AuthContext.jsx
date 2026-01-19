import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Mock user database in localStorage
const USERS_KEY = 'ai_casemanager_users'
const CURRENT_USER_KEY = 'ai_casemanager_current_user'

// Initialize with demo user
const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY)
  if (!existingUsers) {
    const demoUsers = [
      {
        id: 1,
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'password',
        role: 'admin'
      }
    ]
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers))
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize users and check for existing session
  useEffect(() => {
    const initAuth = () => {
      try {
        initializeUsers()
        const currentUser = localStorage.getItem(CURRENT_USER_KEY)
        if (currentUser) {
          const userData = JSON.parse(currentUser)
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Clear corrupted data
        localStorage.removeItem(CURRENT_USER_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const register = (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email)
      if (existingUser) {
        return { success: false, message: 'User with this email already exists' }
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        role: 'user',
        createdAt: new Date().toISOString()
      }

      users.push(newUser)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))

      // Auto-login after registration
      const userToStore = { ...newUser }
      delete userToStore.password // Don't store password in session
      setUser(userToStore)
      setIsAuthenticated(true)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore))

      return { success: true, user: userToStore }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, message: 'Registration failed. Please try again.' }
    }
  }

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
      const foundUser = users.find(u => u.email === email && u.password === password)

      if (foundUser) {
        const userToStore = { ...foundUser }
        delete userToStore.password // Don't store password in session
        setUser(userToStore)
        setIsAuthenticated(true)
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore))
        return { success: true, user: userToStore }
      }

      return { success: false, message: 'Invalid email or password' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  const logout = () => {
    try {
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem(CURRENT_USER_KEY)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      login, 
      logout, 
      register 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
