'use client'

import { MealListItem } from '@/lib/types'
import styles from './recipecard.module.css'

const COOK_TIMES = ['20 min', '25 min', '30 min', '35 min', '45 min', '50 min']
const RATINGS = ['4.5', '4.6', '4.7', '4.8', '4.9']

interface Props {
  meal: MealListItem
  onViewRecipe: (id: string) => void
  viewMode?: 'grid' | 'list'
}

export default function RecipeCard({ meal, onViewRecipe, viewMode = 'grid' }: Props) {
  const idx = parseInt(meal.idMeal, 10) % COOK_TIMES.length
  const cookTime = COOK_TIMES[idx]
  const rating = RATINGS[parseInt(meal.idMeal, 10) % RATINGS.length]

  return (
    <article className={`${styles.card} ${viewMode === 'list' ? styles.cardList : ''}`} onClick={() => onViewRecipe(meal.idMeal)}>
      <div className={`${styles.imgWrap} ${viewMode === 'list' ? styles.imgWrapList : ''}`}>
        <img
          src={meal.strMealThumb || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={meal.strMeal}
          loading="lazy"
          className={styles.img}
        />
        {meal.strArea && (
          <div className={styles.badge}>{meal.strArea}</div>
        )}
      </div>

      <div className={`${styles.body} ${viewMode === 'list' ? styles.bodyList : ''}`}>
        <h3 className={styles.name}>{meal.strMeal}</h3>
        <div className={styles.meta}>
          {meal.strCategory && <span>🏷 {meal.strCategory}</span>}
          <span>⏱ {cookTime}</span>
        </div>
        <div className={styles.tags}>
          {meal.strCategory && <span className={styles.tag}>{meal.strCategory}</span>}
          {meal.strArea && <span className={styles.tag}>{meal.strArea}</span>}
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.viewBtn} tabIndex={-1}>
          View Recipe →
        </button>
        <span className={styles.rating}>⭐ {rating}</span>
      </div>
    </article>
  )
}