export interface IIngredient {
  id: number;
  name: string;
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
  ingredients: Array<IIngredient>;
  steps: Array<IStep>;
}
