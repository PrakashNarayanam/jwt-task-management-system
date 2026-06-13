import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin, register as apiRegister, getMe } from '../services/authService'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    try {
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const res = await getMe()
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
        } catch (err) {
          logout()
        }
      }
      setLoading(false)
    }

    verifySession()
  }, [])

  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      const res = await apiLogin({ email, password })
      const { token: t, user: u } = res.data
      setToken(t)
      setUser(u)
      localStorage.setItem('token', t)
      localStorage.setItem('user', JSON.stringify(u))
      navigate('/dashboard')
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.response?.data?.msg || err.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async ({ name, email, password }) => {
    setLoading(true)
    try {
      const res = await apiRegister({ name, email, password })
      const { token: t, user: u } = res.data
      setToken(t)
      setUser(u)
      localStorage.setItem('token', t)
      localStorage.setItem('user', JSON.stringify(u))
      navigate('/dashboard')
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.response?.data?.msg || err.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
