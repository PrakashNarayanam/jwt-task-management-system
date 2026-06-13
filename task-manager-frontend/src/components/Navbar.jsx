import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { FaSignOutAlt, FaTasks, FaUser } from 'react-icons/fa'
import './navbar.css'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  const nameInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U'

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-section">
          <div className="logo-icon"><FaTasks /></div>
          <span className="logo-text">TaskSphere</span>
        </Link>
        
        <div className="nav-actions">
          {user ? (
            <>
              <div className="user-profile">
                <div className="avatar" title={user.email}>
                  {nameInitial}
                </div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
              </div>
              <button className="btn logout-btn" onClick={logout} title="Sign Out">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="btn primary login-btn">
              <FaUser />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
