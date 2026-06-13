import React, { useState, useEffect } from 'react'
import './taskform.css'

export default function TaskForm({ onSubmit, editing, onCancel }){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    if(editing){
      setTitle(editing.title || '')
      setDescription(editing.description || '')
      setCompleted(Boolean(editing.completed))
    } else {
      setTitle('')
      setDescription('')
      setCompleted(false)
    }
    setError(null)
  }, [editing])

  const handleSubmit = e =>{
    e.preventDefault()
    if(!title.trim()) {
      setError('Title is required')
      return
    }
    setError(null)
    onSubmit({ title: title.trim(), description: description.trim(), completed })
  }

  return (
    <div className="task-form-container">
      <h2>{editing ? 'Edit Task Details' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task-title">Title *</label>
          <input 
            id="task-title"
            className={error ? 'form-input-error' : ''}
            value={title} 
            onChange={e => {
              setTitle(e.target.value)
              if (error) setError(null)
            }} 
            placeholder="What needs to be done?" 
          />
          {error && <span className="form-error-text">{error}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="task-desc">Description</label>
          <textarea 
            id="task-desc"
            rows="4"
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Add details about this task..." 
          />
        </div>

        <div className="form-group">
          <label className="checkbox">
            <input 
              type="checkbox" 
              checked={completed} 
              onChange={e => setCompleted(e.target.checked)} 
            /> 
            <span>Mark task as completed immediately</span>
          </label>
        </div>

        <div className="task-form-actions">
          {onCancel && (
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button className="btn primary" type="submit">
            {editing ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}
