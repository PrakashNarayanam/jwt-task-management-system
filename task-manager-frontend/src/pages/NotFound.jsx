import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
import './auth.css'

export default function NotFound() {
  return (
    <div className="auth-page">
      <div className="card auth-card" style={{ textAlign: 'center', alignItems: 'center' }}>
        <div 
          style={{ 
            fontSize: '3.5rem', 
            color: 'hsl(var(--color-danger))', 
            marginBottom: '10px',
            textShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
          }}
        >
          <FaExclamationTriangle />
        </div>
        <h2>404</h2>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Page Not Found
        </p>
        <p style={{ marginBottom: '10px' }}>
          The path you are trying to reach does not exist or has been relocated.
        </p>
        <Link to="/" className="btn primary" style={{ width: '100%', textDecoration: 'none' }}>
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
