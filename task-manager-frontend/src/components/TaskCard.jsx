import React from 'react'
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa'
import './taskcard.css'

export default function TaskCard({ task, onEdit, onDelete, onToggle }){
  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className={`task-card ${task.completed ? 'task-completed' : 'task-pending'}`}>
      <div>
        <div className="task-card-header">
          <h3>{task.title}</h3>
          <span className={`status-badge ${task.completed ? 'badge-completed' : 'badge-pending'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <p className="task-desc">{task.description || 'No description provided.'}</p>
      </div>
      
      <div className="task-card-footer">
        <span className="task-date">{formattedDate}</span>
        <div className="task-actions">
          <button 
            className={`action-btn toggle-btn ${task.completed ? 'completed-task' : ''}`} 
            onClick={() => onToggle(task)} 
            title={task.completed ? 'Mark as Pending' : 'Mark as Completed'}
          >
            <FaCheck/>
          </button>
          <button 
            className="action-btn edit-btn" 
            onClick={() => onEdit(task)} 
            title="Edit Task"
          >
            <FaEdit/>
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={() => onDelete(task)} 
            title="Delete Task"
          >
            <FaTrash/>
          </button>
        </div>
      </div>
    </div>
  )
}
