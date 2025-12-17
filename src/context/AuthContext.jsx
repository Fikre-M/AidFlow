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

  // Initialize users and check for existing session
  useEffect(() => {
    initializeUsers()
    const currentUser = localStorage.getItem(CURRENT_USER_KEY)
    if (currentUser) {
      const userData = JSON.parse(currentUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const register = (userData) => {
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
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
      const userToStore = { ...user }
      delete userToStore.password // Don't store password in session
      setUser(userToStore)
      setIsAuthenticated(true)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore))
      return { success: true, user: userToStore }
    }

    return { success: false, message: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
