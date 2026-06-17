import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const AUTH_STORAGE = 'job-portal-current-user'
const USERS_STORAGE = 'job-portal-users'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE)
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE) || '[]')
    if (!users.some((item) => item.email === 'admin@jobportal.com')) {
      users.unshift({
        name: 'Admin',
        email: 'admin@jobportal.com',
        password: 'admin123',
        isAdmin: true,
      })
      localStorage.setItem(USERS_STORAGE, JSON.stringify(users))
    }

    if (saved) {
      setUser(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE) || '[]')
    const existing = users.find((item) => item.email === email && item.password === password)
    if (!existing) {
      throw new Error('Invalid email or password')
    }
    const nextUser = {
      name: existing.name,
      email: existing.email,
      isAdmin: existing.isAdmin || false,
    }
    localStorage.setItem(AUTH_STORAGE, JSON.stringify(nextUser))
    setUser(nextUser)
  }

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE) || '[]')
    if (users.some((item) => item.email === email)) {
      throw new Error('This email is already registered')
    }
    const nextUser = { name, email, password, isAdmin: false }
    users.push(nextUser)
    localStorage.setItem(USERS_STORAGE, JSON.stringify(users))
    localStorage.setItem(AUTH_STORAGE, JSON.stringify({ name, email, isAdmin: false }))
    setUser({ name, email, isAdmin: false })
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE)
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
