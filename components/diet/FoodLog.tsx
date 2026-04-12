'use client'

import { useDiet } from './DietContext'
import { TrackedFood } from '@/lib/diet-types'
import { getCalories, getCarbs, getFat, getProtein, scaleNutrients } from '@/lib/diet-api'

const MEAL_ICONS: Record<string, string> = {
  breakfast: 'fa-sun',
  lunch: 'fa-cloud-sun',
  dinner: 'fa-moon',
  snack: 'fa-apple-alt',
}

const MEAL_COLORS: Record<string, string> = {
  breakfast: '#ffb26b',
  lunch: '#ff7b54',
  dinner: '#9b59b6',
  snack: '#7bc67e',
}

function FoodItem({ food }: { food: TrackedFood }) {
  const { removeFood, updateServings } = useDiet()
  const scaled = scaleNutrients(food.nutrients, food.servingSize, food.servings)

  return (
    <div className="food-log-item">
      <div className="food-log-info">
        <p className="food-log-name">{food.description}</p>
        {food.brandOwner && <p className="food-log-brand">{food.brandOwner}</p>}
        <div className="food-log-macros">
          <span>{Math.round(getCalories(scaled))} kcal</span>
          <span>P: {Math.round(getProtein(scaled))}g</span>
          <span>C: {Math.round(getCarbs(scaled))}g</span>
          <span>F: {Math.round(getFat(scaled))}g</span>
        </div>
      </div>

      <div className="food-log-controls">
        <div className="serving-inline">
          <button
            className="serving-btn"
            onClick={() => updateServings(food.id, Math.max(0.25, food.servings - 0.25))}
          >−</button>
          <span className="serving-count">{food.servings}×</span>
          <button
            className="serving-btn"
            onClick={() => updateServings(food.id, food.servings + 0.25)}
          >+</button>
        </div>
        <span className="food-log-serving-size">
          {food.servingSize}{food.servingSizeUnit}
        </span>
        <button className="remove-food-btn" onClick={() => removeFood(food.id)}>
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  )
}

function MealSection({
  mealType,
  foods,
}: {
  mealType: string
  foods: TrackedFood[]
}) {
  if (!foods.length) return null
  const totalKcal = foods.reduce((sum, food) => {
    const scaled = scaleNutrients(food.nutrients, food.servingSize, food.servings)
    return sum + getCalories(scaled)
  }, 0)

  return (
    <div className="meal-section">
      <div className="meal-section-header" style={{ borderColor: MEAL_COLORS[mealType] }}>
        <div className="meal-section-title">
          <i
            className={`fas ${MEAL_ICONS[mealType]}`}
            style={{ color: MEAL_COLORS[mealType] }}
          />
          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </div>
        <span className="meal-total-kcal">{Math.round(totalKcal)} kcal</span>
      </div>
      {foods.map(food => <FoodItem key={food.id} food={food} />)}
    </div>
  )
}

export default function FoodLog() {
  const { trackedFoods, clearAll, totals } = useDiet()

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const
  const grouped = mealTypes.reduce((acc, m) => {
    acc[m] = trackedFoods.filter(f => f.mealType === m)
    return acc
  }, {} as Record<string, TrackedFood[]>)

  if (!trackedFoods.length) {
    return (
      <div className="food-log-empty">
        <i className="fas fa-utensils" />
        <p>No foods logged today</p>
        <span>Search for a food above to start tracking</span>
      </div>
    )
  }

  return (
    <div className="food-log">
      <div className="food-log-header">
        <h3 className="diet-section-title">
          <i className="fas fa-clipboard-list" /> Today's Log
        </h3>
        <button className="clear-log-btn" onClick={clearAll}>
          <i className="fas fa-trash" /> Clear All
        </button>
      </div>

      {mealTypes.map(m => (
        <MealSection key={m} mealType={m} foods={grouped[m]} />
      ))}

      <div className="food-log-total">
        <span>Daily Total</span>
        <span>{Math.round(totals.calories)} kcal</span>
      </div>
    </div>
  )
}
