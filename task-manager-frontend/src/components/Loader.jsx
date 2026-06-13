import React from 'react'
import './loader.css'

export default function Loader({ fullPage }){
  return (
    <div className={`loader-container ${fullPage ? 'full-page' : ''}`}>
      <div className="spinner" />
    </div>
  )
}
