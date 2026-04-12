'use client'

import { useState, useRef } from 'react'
import { searchFoods } from '@/lib/diet-api'
import { FoodSearchItem, TrackedFood } from '@/lib/diet-types'
import { useDiet } from './DietContext'
import { getCalories, getProtein, getCarbs, getFat } from '@/lib/diet-api'

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const

export default function FoodSearch() {
  const { addFood } = useDiet()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<FoodSearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [adding, setAdding] = useState<number | null>(null)
  const [servings, setServings] = useState<Record<number, number>>({})
  const [meal, setMeal] = useState<Record<number, typeof MEAL_TYPES[number]>>({})
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setResults([])
    try {
      const data = await searchFoods(query)
      setResults(data.foods || [])
      if (!data.foods?.length) setError('No foods found. Try a different search term.')
    } catch (e) {
      setError('Failed to fetch data please reload the page and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = (food: FoodSearchItem) => {
    const s = servings[food.fdcId] ?? 1
    const m = meal[food.fdcId] ?? 'snack'
    const servingSize = food.servingSize || 100
    const servingSizeUnit = food.servingSizeUnit || 'g'

    const tracked: TrackedFood = {
      id: `${food.fdcId}-${Date.now()}`,
      fdcId: food.fdcId,
      description: food.description,
      brandOwner: food.brandOwner,
      servingSize,
      servingSizeUnit,
      servings: s,
      nutrients: food.foodNutrients,
      mealType: m,
      addedAt: new Date().toISOString(),
    }
    addFood(tracked)
    setAdding(food.fdcId)
    setTimeout(() => setAdding(null), 1500)
  }

  return (
    <div className="food-search">
      <h3 className="diet-section-title">
        <i className="fas fa-search" /> Search Foods
      </h3>
      

      <div className="food-search-box">
        <input
          ref={inputRef}
          type="text"
          className="diet-input"
          placeholder="Search for any food (e.g. chicken breast, apple, oats…)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
        />
        <button className="diet-btn" onClick={handleSearch} disabled={loading}>
          {loading ? <span className="diet-spinner" /> : <><i className="fas fa-search" /> Search</>}
        </button>
      </div>

      {error && <p className="diet-error"><i className="fas fa-exclamation-circle" /> {error}</p>}

      {results.length > 0 && (
        <div className="food-results">
          {results.map(food => {
            const s = servings[food.fdcId] ?? 1
            const m = meal[food.fdcId] ?? 'snack'
            const kcal = getCalories(food.foodNutrients)
            const p = getProtein(food.foodNutrients)
            const c = getCarbs(food.foodNutrients)
            const f = getFat(food.foodNutrients)
            const scale = ((food.servingSize || 100) / 100) * s
            const isAdded = adding === food.fdcId

            return (
              <div key={food.fdcId} className="food-result-card">
                <div className="food-result-top">
                  <div>
                    <p className="food-result-name">{food.description}</p>
                    {food.brandOwner && (
                      <p className="food-result-brand">{food.brandOwner}</p>
                    )}
                    {food.foodCategory && (
                      <span className="food-result-category">{food.foodCategory}</span>
                    )}
                  </div>
                  <div className="food-result-macros">
                    <span className="macro-pill cal">{Math.round(kcal * scale)} kcal</span>
                    <span className="macro-pill pro">P: {Math.round(p * scale)}g</span>
                    <span className="macro-pill car">C: {Math.round(c * scale)}g</span>
                    <span className="macro-pill fat">F: {Math.round(f * scale)}g</span>
                  </div>
                </div>

                <div className="food-result-controls">
                  <div className="serving-control">
                    <label>Servings</label>
                    <input
                      type="number"
                      min="0.25"
                      max="20"
                      step="0.25"
                      value={s}
                      onChange={e =>
                        setServings(prev => ({ ...prev, [food.fdcId]: Number(e.target.value) }))
                      }
                      className="serving-input"
                    />
                    <span className="serving-unit">
                      × {food.servingSize || 100}{food.servingSizeUnit || 'g'}
                    </span>
                  </div>

                  <div className="meal-control">
                    <label>Meal</label>
                    <select
                      value={m}
                      onChange={e =>
                        setMeal(prev => ({
                          ...prev,
                          [food.fdcId]: e.target.value as typeof MEAL_TYPES[number],
                        }))
                      }
                      className="meal-select"
                    >
                      {MEAL_TYPES.map(t => (
                        <option key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className={`add-food-btn ${isAdded ? 'added' : ''}`}
                    onClick={() => handleAdd(food)}
                  >
                    {isAdded
                      ? <><i className="fas fa-check" /> Added!</>
                      : <><i className="fas fa-plus" /> Add</>}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
