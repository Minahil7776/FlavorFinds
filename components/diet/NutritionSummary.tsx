'use client'

import { useDiet } from './DietContext'

function MacroBar({
  label, current, goal, color, unit = 'g',
}: {
  label: string
  current: number
  goal: number
  color: string
  unit?: string
}) {
  const pct = Math.min((current / goal) * 100, 100)
  const over = current > goal

  return (
    <div className="macro-bar-wrap">
      <div className="macro-bar-header">
        <span className="macro-label">{label}</span>
        <span className="macro-value" style={{ color: over ? '#e74c3c' : '#2c2c2c' }}>
          {Math.round(current)}<span className="macro-unit">/{goal}{unit}</span>
        </span>
      </div>
      <div className="macro-track">
        <div
          className="macro-fill"
          style={{
            width: `${pct}%`,
            background: over ? '#e74c3c' : color,
          }}
        />
      </div>
    </div>
  )
}

export default function NutritionSummary() {
  const { totals, goals } = useDiet()
  const calPct = Math.min((totals.calories / goals.calories) * 100, 100)
  const calOver = totals.calories > goals.calories

  return (
    <div className="nutrition-summary">
      {/* Calorie Ring */}
      <div className="cal-section">
        <div className="cal-ring-wrap">
          <svg viewBox="0 0 120 120" className="cal-ring">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#f0f0f0" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke={calOver ? '#e74c3c' : '#ff7b54'}
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - calPct / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div className="cal-ring-text">
            <span className="cal-consumed" style={{ color: calOver ? '#e74c3c' : '#ff7b54' }}>
              {Math.round(totals.calories)}
            </span>
            <span className="cal-label">kcal</span>
            <span className="cal-remaining">
              {calOver
                ? `+${Math.round(totals.calories - goals.calories)} over`
                : `${Math.round(goals.calories - totals.calories)} left`}
            </span>
          </div>
        </div>
        <p className="cal-goal-text">Daily Goal: {goals.calories} kcal</p>
      </div>

      {/* Macro Bars */}
      <div className="macros-section">
        <MacroBar label="Protein" current={totals.protein} goal={goals.protein} color="#ff7b54" />
        <MacroBar label="Carbs" current={totals.carbs} goal={goals.carbs} color="#ffb26b" />
        <MacroBar label="Fat" current={totals.fat} goal={goals.fat} color="#ffd56b" />
        <MacroBar label="Fiber" current={totals.fiber} goal={goals.fiber} color="#7bc67e" />
      </div>
    </div>
  )
}
