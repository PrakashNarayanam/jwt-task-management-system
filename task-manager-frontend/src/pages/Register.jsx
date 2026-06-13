import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import './auth.css'

export default function Register() {
  const { register, loading } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const tempErrors = {}
    if (!name.trim()) {
      tempErrors.name = 'Username is required'
    } else if (name.trim().length < 3) {
      tempErrors.name = 'Username must be at least 3 characters'
    }
    if (!email.trim()) {
      tempErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address'
    }
    if (!password) {
      tempErrors.password = 'Password is required'
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters'
    }
    if (!confirm) {
      tempErrors.confirm = 'Confirm password is required'
    } else if (password !== confirm) {
      tempErrors.confirm = 'Passwords do not match'
    }
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return
    
    const res = await register({ name: name.trim(), email: email.trim(), password })
    if (!res.ok) {
      toast.error(res.error || 'Registration failed')
    } else {
      toast.success('Account created successfully!')
    }
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2>Get Started</h2>
        <p>Create a free account and start organizing today</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-form-group">
            <label htmlFor="name">Username</label>
            <input 
              type="text" 
              id="name"
              className={errors.name ? 'form-input-error' : ''}
              placeholder="e.g. johndoe" 
              value={name} 
              onChange={e => {
                setName(e.target.value)
                if (errors.name) setErrors(prev => ({ ...prev, name: null }))
              }} 
            />
            {errors.name && <span className="form-error-msg">{errors.name}</span>}
          </div>

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
            <input 
              type="password" 
              id="password"
              className={errors.password ? 'form-input-error' : ''}
              placeholder="••••••••" 
              value={password} 
              onChange={e => {
                setPassword(e.target.value)
                if (errors.password) setErrors(prev => ({ ...prev, password: null }))
              }} 
            />
            {errors.password && <span className="form-error-msg">{errors.password}</span>}
          </div>

          <div className="auth-form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input 
              type="password" 
              id="confirm"
              className={errors.confirm ? 'form-input-error' : ''}
              placeholder="••••••••" 
              value={confirm} 
              onChange={e => {
                setConfirm(e.target.value)
                if (errors.confirm) setErrors(prev => ({ ...prev, confirm: null }))
              }} 
            />
            {errors.confirm && <span className="form-error-msg">{errors.confirm}</span>}
          </div>

          <button className="btn primary auth-submit-btn" type="submit" disabled={loading}>
            {loading ? <Loader /> : 'Sign Up'}
          </button>
        </form>
        
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  )
}
