import React, { useState } from 'react'
import { useHabitData } from '../context/HabitDataContext'
import { CATEGORY_LABELS } from '../habits/habitConfig'
import './HabitManagerModal.css'

function HabitManagerModal({ onClose }) {
  const { habits, addHabit, editHabit, deleteHabit } = useHabitData()
  const [editingId, setEditingId] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    label: '',
    category: 'finance',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isNew = editingId === 'NEW'

  const handleEdit = (habit) => {
    setFormData({
      id: habit.id,
      label: habit.label,
      category: habit.category || 'finance',
    })
    setEditingId(habit.id)
    setError('')
  }

  const handleNew = () => {
    setFormData({
      id: '',
      label: '',
      category: 'finance',
    })
    setEditingId('NEW')
    setError('')
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this habit? All past data for this habit will no longer be visible (but it remains in the database).')) {
      await deleteHabit(id)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { id, label, category } = formData
    if (!id || !label || !category) {
      setError('ID, Label, and Category are required.')
      return
    }

    if (!/^[a-zA-Z0-9_\-]+$/.test(id)) {
      setError('ID must be alphanumeric, underscores, or dashes only (e.g., "morning_run").')
      return
    }

    if (isNew && habits.some(h => h.id === id)) {
      setError('A habit with this ID already exists.')
      return
    }

    setIsSubmitting(true)
    let ok = false
    if (isNew) {
      ok = await addHabit({ id, label, category })
    } else {
      ok = await editHabit({ id, label, category })
    }
    setIsSubmitting(false)

    if (ok) {
      setEditingId(null)
    } else {
      setError('Failed to save habit to server.')
    }
  }

  return (
    <div className="hm-modal-backdrop" onClick={onClose}>
      <div className="hm-modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="hm-modal-header">
          <h2>Manage Habits</h2>
          <button className="hm-btn-close" onClick={onClose}>×</button>
        </header>

        <div className="hm-modal-body">
          {editingId ? (
            <form onSubmit={handleSubmit} className="hm-form">
              <h3>{isNew ? 'Add New Habit' : 'Edit Habit'}</h3>
              
              {error && <div className="hm-error">{error}</div>}

              <label className="hm-label">
                <span>Unique ID (for tracking)</span>
                <input
                  type="text"
                  className="hm-input"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  disabled={!isNew}
                  placeholder="e.g. morning_run"
                />
              </label>

              <label className="hm-label">
                <span>Display Name</span>
                <input
                  type="text"
                  className="hm-input"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Morning Run"
                />
              </label>

              <label className="hm-label">
                <span>Category</span>
                <select
                  className="hm-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </label>

              <div className="hm-form-actions">
                <button type="button" className="hm-btn hm-btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                <button type="submit" className="hm-btn hm-btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Habit'}
                </button>
              </div>
            </form>
          ) : (
            <>
              {(!habits || habits.length === 0) ? (
                <p className="hm-empty">You have no habits defined yet.</p>
              ) : (
                <div className="hm-list">
                  {habits.map(h => (
                    <div className="hm-list-item" key={h.id}>
                      <div className="hm-item-info">
                        <strong>{h.label}</strong> <span className={`habit-cat habit-cat--${h.category}`}>{CATEGORY_LABELS[h.category] || h.category}</span>
                      </div>
                      <div className="hm-item-actions">
                        <button className="hm-btn hm-btn-secondary hm-btn-sm" onClick={() => handleEdit(h)}>Edit</button>
                        <button className="hm-btn hm-btn-danger hm-btn-sm" onClick={() => handleDelete(h.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button className="hm-btn hm-btn-primary" onClick={handleNew}>+ Add Habit</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HabitManagerModal
