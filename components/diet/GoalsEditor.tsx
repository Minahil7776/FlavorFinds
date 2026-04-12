'use client'

import { useState } from 'react'
import { useDiet } from './DietContext'
import { DailyGoals } from '@/lib/diet-types'

export default function GoalsEditor() {
  const { goals, updateGoals } = useDiet()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<DailyGoals>(goals)

  const handleSave = () => {
    updateGoals(draft)
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft(goals)
    setEditing(false)
  }

  if (!editing) {
    return (
      <div className="goals-summary">
        <div className="goals-summary-header">
          <h3 className="diet-section-title">
            <i className="fas fa-bullseye" /> Daily Goals
          </h3>
          <button className="edit-goals-btn" onClick={() => setEditing(true)}>
            <i className="fas fa-pencil-alt" /> Edit
          </button>
        </div>
        <div className="goals-grid">
          {[
            { label: 'Calories', value: goals.calories, unit: 'kcal', color: '#ff7b54' },
            { label: 'Protein', value: goals.protein, unit: 'g', color: '#ff7b54' },
            { label: 'Carbs', value: goals.carbs, unit: 'g', color: '#ffb26b' },
            { label: 'Fat', value: goals.fat, unit: 'g', color: '#ffd56b' },
            { label: 'Fiber', value: goals.fiber, unit: 'g', color: '#7bc67e' },
          ].map(({ label, value, unit, color }) => (
            <div key={label} className="goal-chip" style={{ borderColor: color }}>
              <span className="goal-chip-label">{label}</span>
              <span className="goal-chip-value" style={{ color }}>
                {value}<span className="goal-chip-unit">{unit}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="goals-editor">
      <h3 className="diet-section-title">
        <i className="fas fa-bullseye" /> Set Daily Goals
      </h3>
      <div className="goals-form">
        {(
          [
            { key: 'calories', label: 'Calories', unit: 'kcal', min: 500, max: 5000 },
            { key: 'protein', label: 'Protein', unit: 'g', min: 10, max: 300 },
            { key: 'carbs', label: 'Carbohydrates', unit: 'g', min: 20, max: 600 },
            { key: 'fat', label: 'Fat', unit: 'g', min: 10, max: 200 },
            { key: 'fiber', label: 'Fiber', unit: 'g', min: 5, max: 100 },
          ] as const
        ).map(({ key, label, unit, min, max }) => (
          <div key={key} className="goal-field">
            <label className="goal-field-label">{label} ({unit})</label>
            <div className="goal-field-input-wrap">
              <input
                type="number"
                className="diet-input goal-input"
                min={min}
                max={max}
                value={draft[key]}
                onChange={e =>
                  setDraft(prev => ({ ...prev, [key]: Number(e.target.value) }))
                }
              />
              <span className="goal-input-unit">{unit}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="goals-actions">
        <button className="diet-btn" onClick={handleSave}>
          <i className="fas fa-check" /> Save Goals
        </button>
        <button className="diet-btn-outline" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}
