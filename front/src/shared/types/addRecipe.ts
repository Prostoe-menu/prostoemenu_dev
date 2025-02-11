import { IRecipe, TRecipeIngredient } from './recipe';

export type TAddRecipeMainInfo = {
  title: string;
  description: string | null;
  cover_path: string | null;
  complexity: 3 | null;
  allhours: null;
  allminutes: null;
  cookhours: null;
  cookminuts: null;
  quantity: 0;
};

export type TAddRecipeIngredient = Omit<TRecipeIngredient, 'id' | 'name'> & {
  ingredient: string | null;
};

export type TAddRecipeIngredients = {
  ingredients: Array<TAddRecipeIngredient>;
};

export type TAddRecipe = Omit<IRecipe, 'id' | 'ingredients'> & {
  category: number;
  ingredients: Array<TAddRecipeIngredient>;
};
