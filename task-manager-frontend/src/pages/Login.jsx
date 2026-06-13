import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import './auth.css'

export default function Login() {
  const { login, loading } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const tempErrors = {}
    if (!email.trim()) {
      tempErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address'
    }
    if (!password) {
      tempErrors.password = 'Password is required'
    }
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return
    
    const res = await login({ email: email.trim(), password })
    if (!res.ok) {
      toast.error(res.error || 'Invalid email or password')
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2>Welcome Back</h2>
        <p>Manage your tasks seamlessly and boost productivity</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              className={errors.email ? 'form-input-error' : ''}
              placeholder="you@example.com" 
              value={email} 
              onChange={e => {
                setEmail(e.target.value)
                if (errors.email) setErrors(prev => ({ ...prev, email: null }))
              }} 
            />
            {errors.email && <span className="form-error-msg">{errors.email}</span>}
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <div className="password-row">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password"
                className={errors.password ? 'form-input-error' : ''}
                placeholder="••••••••" 
                value={password} 
                onChange={e => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors(prev => ({ ...prev, password: null }))
                }} 
              />
              <button 
                type="button" 
                className="show-btn" 
                onClick={() => setShowPassword(s => !s)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span className="form-error-msg">{errors.password}</span>}
          </div>

          <button className="btn primary auth-submit-btn" type="submit" disabled={loading}>
            {loading ? <Loader /> : 'Sign In'}
          </button>
        </form>
        
        <p>Don't have an account? <Link to="/register">Create one here</Link></p>
      </div>
    </div>
  )
}
