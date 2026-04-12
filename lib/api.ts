import { Category, Ingredient, Meal, MealListItem } from './types'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/list.php?c=list`)
  const data = await res.json()
  const sorted = [...data.meals].sort((a: Category, b: Category) =>
    a.strCategory.localeCompare(b.strCategory)
  )
  return sorted
}

export async function fetchIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${BASE_URL}/list.php?i=list`)
  const data = await res.json()
  const sorted = [...data.meals].sort((a: Ingredient, b: Ingredient) =>
    a.strIngredient.localeCompare(b.strIngredient)
  )
  return sorted
}

export async function searchMeals(
  searchTerm: string,
  cuisine: string,
  category: string,
  ingredient: string
): Promise<MealListItem[] | null> {
  let url = `${BASE_URL}/`

  if (searchTerm) {
    url += `search.php?s=${encodeURIComponent(searchTerm)}`
  } else if (cuisine) {
    url += `filter.php?a=${encodeURIComponent(cuisine)}`
  } else if (category) {
    url += `filter.php?c=${encodeURIComponent(category)}`
  } else if (ingredient) {
    url += `filter.php?i=${encodeURIComponent(ingredient)}`
  } else {
    url += 'filter.php?c=Seafood'
  }

  const res = await fetch(url)
  const data = await res.json()
  return data.meals ?? null
}

export async function fetchMealById(id: string): Promise<Meal | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  const data = await res.json()
  return data.meals?.[0] ?? null
}
