// USDA FoodData Central API Types

export interface FoodNutrient {
  nutrientId: number
  nutrientName: string
  nutrientNumber: string
  unitName: string
  value: number
}

export interface FoodSearchItem {
  fdcId: number
  description: string
  brandOwner?: string
  brandName?: string
  foodCategory?: string
  servingSize?: number
  servingSizeUnit?: string
  foodNutrients: FoodNutrient[]
}

export interface FoodSearchResponse {
  foods: FoodSearchItem[]
  totalHits: number
  currentPage: number
  totalPages: number
}

export interface FoodDetailResponse {
  fdcId: number
  description: string
  brandOwner?: string
  foodCategory?: string
  servingSize?: number
  servingSizeUnit?: string
  foodNutrients: FoodNutrient[]
}

export interface TrackedFood {
  id: string // unique entry id
  fdcId: number
  description: string
  brandOwner?: string
  servingSize: number
  servingSizeUnit: string
  servings: number
  nutrients: FoodNutrient[]
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  addedAt: string
}

export interface DailyGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

export const DEFAULT_GOALS: DailyGoals = {
  calories: 2000,
  protein: 50,
  carbs: 275,
  fat: 78,
  fiber: 28,
}

// Key USDA nutrient IDs
export const NUTRIENT_IDS = {
  CALORIES: 1008,
  PROTEIN: 1003,
  FAT: 1004,
  CARBS: 1005,
  FIBER: 1079,
  SUGAR: 2000,
  SODIUM: 1093,
  CALCIUM: 1087,
  IRON: 1089,
  VITAMIN_C: 1162,
}
