'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Meal } from '@/lib/types'

interface RecipeModalProps {
  meal: Meal | null
  loading: boolean
  onClose: () => void
}

export default function RecipeModal({ meal, loading, onClose }: RecipeModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const getIngredients = (meal: Meal) => {
    const items: string[] = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]
      if (ingredient && ingredient.trim()) {
        items.push(`${measure ?? ''} ${ingredient}`.trim())
      }
    }
    return items
  }

  const getInstructions = (meal: Meal): string[] => {
    if (!meal.strInstructions) return []
    let steps = meal.strInstructions
      .split('\r\n')
      .filter(s => s.trim() !== '')

    if (steps.length <= 1) {
      steps = meal.strInstructions
        .split('.')
        .filter(s => s.trim() !== '')
        .map(s => s.trim() + '.')
    }
    return steps
  }

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {loading ? 'Loading...' : meal?.strMeal ?? ''}
          </h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="loading">
              <div className="spinner" />
              <p>Loading recipe details...</p>
            </div>
          )}

          {!loading && meal && (
            <>
              <img
                src={meal.strMealThumb || 'https://via.placeholder.com/800x500?text=No+Image'}
                alt={meal.strMeal}
                className="modal-img"
              />

              <div className="modal-section">
                <h3 className="section-title">
                  <i className="fas fa-info-circle" /> About
                </h3>
                <p><strong>Cuisine:</strong> {meal.strArea || 'International'}</p>
                <p><strong>Category:</strong> {meal.strCategory}</p>
                {meal.strTags && (
                  <p><strong>Tags:</strong> {meal.strTags.split(',').join(', ')}</p>
                )}
                {meal.strSource && (
                  <p>
                    <strong>Source:</strong>{' '}
                    <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
                      View original
                    </a>
                  </p>
                )}
              </div>

              <div className="modal-section">
                <h3 className="section-title">
                  <i className="fas fa-carrot" /> Ingredients
                </h3>
                <ul className="ingredients-list">
                  {getIngredients(meal).map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3 className="section-title">
                  <i className="fas fa-list-ol" /> Instructions
                </h3>
                {getInstructions(meal).length > 0 ? (
                  <ol className="instructions-list">
                    {getInstructions(meal).map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p>No instructions available</p>
                )}
              </div>

              {meal.strYoutube && (
                <div className="modal-section">
                  <h3 className="section-title">
                    <i className="fab fa-youtube" /> Video Tutorial
                  </h3>
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-link"
                  >
                    <i className="fab fa-youtube" /> Watch on YouTube
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
