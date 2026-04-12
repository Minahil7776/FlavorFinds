import {
  FoodDetailResponse,
  FoodSearchResponse,
  NUTRIENT_IDS,
  FoodNutrient,
} from './diet-types'

// Get your free API key at https://fdc.nal.usda.gov/api-key-signup.html
// Replace the value below OR set NEXT_PUBLIC_USDA_API_KEY in your .env.local
const USDA_API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY || 'DEMO_KEY'
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1'

/**
 * Search for foods by keyword using USDA FoodData Central
 */
export async function searchFoods(
  query: string,
  pageSize = 10,
  pageNumber = 1
): Promise<FoodSearchResponse> {
  const params = new URLSearchParams({
    api_key: USDA_API_KEY,
    query,
    pageSize: String(pageSize),
    pageNumber: String(pageNumber),
    dataType: 'Survey (FNDDS),SR Legacy,Branded',
    sortBy: 'dataType.keyword',
    sortOrder: 'asc',
  })

  const res = await fetch(`${BASE_URL}/foods/search?${params}`)
  if (!res.ok) throw new Error(`USDA API error: ${res.status}`)
  return res.json()
}

/**
 * Get full nutrient details for a specific food by FDC ID
 */
export async function getFoodById(fdcId: number): Promise<FoodDetailResponse> {
  const params = new URLSearchParams({ api_key: USDA_API_KEY })
  const res = await fetch(`${BASE_URL}/food/${fdcId}?${params}`)
  if (!res.ok) throw new Error(`USDA API error: ${res.status}`)
  return res.json()
}

/**
 * Get a specific nutrient value from a nutrient list
 */
export function getNutrientValue(
  nutrients: FoodNutrient[],
  nutrientId: number
): number {
  const found = nutrients.find(n => n.nutrientId === nutrientId)
  return found ? Math.round(found.value * 10) / 10 : 0
}

/**
 * Get calories per 100g (or per serving if servingSize is provided)
 */
export function getCalories(nutrients: FoodNutrient[]): number {
  return getNutrientValue(nutrients, NUTRIENT_IDS.CALORIES)
}

export function getProtein(nutrients: FoodNutrient[]): number {
  return getNutrientValue(nutrients, NUTRIENT_IDS.PROTEIN)
}

export function getCarbs(nutrients: FoodNutrient[]): number {
  return getNutrientValue(nutrients, NUTRIENT_IDS.CARBS)
}

export function getFat(nutrients: FoodNutrient[]): number {
  return getNutrientValue(nutrients, NUTRIENT_IDS.FAT)
}

export function getFiber(nutrients: FoodNutrient[]): number {
  return getNutrientValue(nutrients, NUTRIENT_IDS.FIBER)
}

/**
 * Scale nutrient values based on servings and serving size
 * USDA values are per 100g by default for most foods
 */
export function scaleNutrients(
  nutrients: FoodNutrient[],
  servingSize: number,
  servings: number
): FoodNutrient[] {
  const scale = (servingSize / 100) * servings
  return nutrients.map(n => ({
    ...n,
    value: Math.round(n.value * scale * 10) / 10,
  }))
}
