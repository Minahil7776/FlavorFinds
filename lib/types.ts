import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

export interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strArea?: string
  strCategory?: string
  strTags?: string
  strInstructions?: string
  strYoutube?: string
  strSource?: string
  [key: string]: string | undefined
}

export interface MealListItem {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strArea?: string
  strCategory?: string
}

export interface Category {
  strCategory: string
}

export interface Ingredient {
  strIngredient: string
}
