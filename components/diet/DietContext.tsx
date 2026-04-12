'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { TrackedFood, DailyGoals, DEFAULT_GOALS } from '@/lib/diet-types'
import {
  getCalories, getCarbs, getFat, getProtein, getFiber, scaleNutrients,
} from '@/lib/diet-api'

interface DietContextValue {
  trackedFoods: TrackedFood[]
  goals: DailyGoals
  addFood: (food: TrackedFood) => void
  removeFood: (id: string) => void
  updateServings: (id: string, servings: number) => void
  updateGoals: (goals: DailyGoals) => void
  clearAll: () => void
  totals: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
}

const DietContext = createContext<DietContextValue | null>(null)

const STORAGE_KEY = 'flavorfindsnext_diet'

export function DietProvider({ children }: { children: ReactNode }) {
  const [trackedFoods, setTrackedFoods] = useState<TrackedFood[]>([])
  const [goals, setGoals] = useState<DailyGoals>(DEFAULT_GOALS)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.foods) setTrackedFoods(parsed.foods)
        if (parsed.goals) setGoals(parsed.goals)
      }
    } catch {}
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ foods: trackedFoods, goals }))
    } catch {}
  }, [trackedFoods, goals])

  const addFood = useCallback((food: TrackedFood) => {
    setTrackedFoods(prev => [...prev, food])
  }, [])

  const removeFood = useCallback((id: string) => {
    setTrackedFoods(prev => prev.filter(f => f.id !== id))
  }, [])

  const updateServings = useCallback((id: string, servings: number) => {
    setTrackedFoods(prev =>
      prev.map(f => f.id === id ? { ...f, servings } : f)
    )
  }, [])

  const updateGoals = useCallback((newGoals: DailyGoals) => {
    setGoals(newGoals)
  }, [])

  const clearAll = useCallback(() => {
    setTrackedFoods([])
  }, [])

  // Calculate totals with scaled nutrients
  const totals = trackedFoods.reduce(
    (acc, food) => {
      const scaled = scaleNutrients(food.nutrients, food.servingSize, food.servings)
      return {
        calories: acc.calories + getCalories(scaled),
        protein: acc.protein + getProtein(scaled),
        carbs: acc.carbs + getCarbs(scaled),
        fat: acc.fat + getFat(scaled),
        fiber: acc.fiber + getFiber(scaled),
      }
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  )

  return (
    <DietContext.Provider value={{
      trackedFoods, goals, addFood, removeFood,
      updateServings, updateGoals, clearAll, totals,
    }}>
      {children}
    </DietContext.Provider>
  )
}

export function useDiet() {
  const ctx = useContext(DietContext)
  if (!ctx) throw new Error('useDiet must be used within DietProvider')
  return ctx
}
