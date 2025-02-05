import { IIngredient } from "./ingredients";

export type TRecipeIngredient = Omit<IIngredient, 'category' | 'sort'> & {
  volume: number;
  measure: string;
}

export interface IStep {
  step_number: number;
  description: string;
  image: string;
}

export interface IRecipe {
  id: number;
  title: string;
  description: string;
  cover_path: string;
  complexity: number;
  cooking_time: number;
  oven_time: number;
  quantity: number;
  ingredients: Array<TRecipeIngredient>;
  steps: Array<IStep>;
}
