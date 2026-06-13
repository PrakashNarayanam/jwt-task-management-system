import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'
import Loader from '../components/Loader'
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { FaSearch, FaPlus, FaInbox } from 'react-icons/fa'
import './dashboard.css'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')

  const fetchTasksData = async () =>{
    try{
      setLoading(true)
      const res = await getTasks()
      setTasks(res.data)
    }catch(err){ 
      toast.error(err.response?.data?.msg || 'Failed to load tasks') 
    } finally{ 
      setLoading(false) 
    }
  }

  useEffect(()=>{ fetchTasksData() }, [])

  const handleAdd = async data =>{
    try{
      const res = await createTask(data)
      setTasks(s => [res.data, ...s])
      setIsFormOpen(false)
      toast.success('Task added successfully!')
    }catch(err){ 
      toast.error(err.response?.data?.msg || 'Failed to add task') 
    }
  }

  const handleUpdate = async data =>{
    try{
      const res = await updateTask(editing._id, data)
      setTasks(s => s.map(t => t._id === res.data._id ? res.data : t))
      setEditing(null)
      setIsFormOpen(false)
      toast.success('Task updated successfully!')
    }catch(err){ 
      toast.error(err.response?.data?.msg || 'Failed to update task') 
    }
  }

  const handleDelete = task =>{
    setDeletingTask(task)
  }

  const confirmDelete = async () => {
    if(!deletingTask) return
    const taskToDelete = deletingTask
    setDeletingTask(null)
    try{
      await deleteTask(taskToDelete._id)
      setTasks(s => s.filter(t => t._id !== taskToDelete._id))
      toast.success('Task deleted successfully')
    }catch(err){ 
      toast.error(err.response?.data?.msg || 'Failed to delete task') 
    }
  }

  const handleToggle = async task =>{
    try{
      const res = await updateTask(task._id, { completed: !task.completed })
      setTasks(s => s.map(t => t._id === res.data._id ? res.data : t))
      toast.success(res.data.completed ? 'Task completed!' : 'Task set to pending')
    }catch(err){ 
      toast.error('Failed to update task status') 
    }
  }

  const handleEditTrigger = task => {
    setEditing(task)
    setIsFormOpen(true)
  }

  const handleAddTrigger = () => {
    setEditing(null)
    setIsFormOpen(true)
  }

  const filteredTasks = tasks
    .filter(t => (filter === 'all') || (filter === 'completed' ? t.completed : !t.completed))
    .filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || (t.description && t.description.toLowerCase().includes(query.toLowerCase())))
    .sort((a,b)=> sort === 'newest' ? new Date(b.createdAt)-new Date(a.createdAt) : new Date(a.createdAt)-new Date(b.createdAt))

  const stats = { 
    total: tasks.length, 
    completed: tasks.filter(t=>t.completed).length, 
    pending: tasks.filter(t=>!t.completed).length 
  }

  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <header className="dash-header card">
          <div>
            <h1>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
              Welcome back, <strong style={{ color: 'var(--text-primary)' }}>{user?.name || 'User'}</strong>! Here's your status report.
            </p>
          </div>
          
          <div className="stats">
            <div className="stat stat-total">
              <span>Total Tasks</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="stat stat-pending">
              <span>Pending</span>
              <strong>{stats.pending}</strong>
            </div>
            <div className="stat stat-completed">
              <span>Completed</span>
              <strong>{stats.completed}</strong>
            </div>
          </div>
        </header>

        <section className="controls-bar card">
          <div className="controls-left">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search tasks by title or content..." 
                value={query} 
                onChange={e=>setQuery(e.target.value)} 
              />
            </div>
            <select className="filter-select" value={filter} onChange={e=>setFilter(e.target.value)}>
              <option value="all">Status: All</option>
              <option value="pending">Status: Pending</option>
              <option value="completed">Status: Completed</option>
            </select>
            <select className="sort-select" value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
          <div className="controls-right">
            <button className="btn primary" onClick={handleAddTrigger}>
              <FaPlus />
              <span>Add Task</span>
            </button>
          </div>
        </section>

        <section className="tasks-section">
          {loading ? (
            <Loader />
          ) : (
            filteredTasks.length === 0 ? (
              <div className="card empty-state">
                <FaInbox className="empty-icon" />
                <h3>No Tasks Found</h3>
                <p>
                  {query || filter !== 'all' 
                    ? "Try adjusting your search query or status filters." 
                    : "Get started by adding your first task!"}
                </p>
                {!query && filter === 'all' && (
                  <button className="btn primary" onClick={handleAddTrigger} style={{ marginTop: '8px' }}>
                    <FaPlus />
                    <span>Create Your First Task</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="tasks-grid">
                {filteredTasks.map(t=> (
                  <TaskCard 
                    key={t._id} 
                    task={t} 
                    onEdit={handleEditTrigger} 
                    onDelete={handleDelete} 
                    onToggle={handleToggle} 
                  />
                ))}
              </div>
            )
          )}
        </section>
      </main>

      {/* Task Creation & Editing Modal Overlay */}
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => { setIsFormOpen(false); setEditing(null); }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <TaskForm 
              onSubmit={editing ? handleUpdate : handleAdd} 
              editing={editing} 
              onCancel={() => { setIsFormOpen(false); setEditing(null); }} 
            />
          </div>
        </div>
      )}

      {/* Task Deletion Confirmation Modal Overlay */}
      {deletingTask && (
        <div className="modal-overlay" onClick={() => setDeletingTask(null)}>
          <div className="modal-content" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '450px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Delete Task</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Are you sure you want to delete the task <strong style={{ color: 'var(--text-primary)' }}>"{deletingTask.title}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
              <button className="btn" onClick={() => setDeletingTask(null)}>Cancel</button>
              <button className="btn danger" onClick={confirmDelete}>Delete Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
