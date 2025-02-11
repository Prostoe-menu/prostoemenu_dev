import axios from 'axios';
import { TAddRecipe } from 'shared/types/addRecipe';
import { TIngredientsResponse, TMeasurementsResponse } from 'shared/types/api';
import { INGREDIENTS_URL, RECIPES_LIST_URL } from 'utils/urls';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getIngredients = (query: string) => {
  return instance.get<TIngredientsResponse>(
    `${INGREDIENTS_URL}/?name=${query}`
  );
};

const getMeasureOptions = () => {
  return instance.get<TMeasurementsResponse>(`/measurements`);
};

const getRecipes = (url?: string) => {
  return instance.get(url ?? `${RECIPES_LIST_URL}`);
};

const getRecipeByID = (id: string) => {
  return instance.get(`${RECIPES_LIST_URL}/${id}`);
};

const getRecipesByIngredients = (ingredientsArray: Array<string>) => {
  const searchParams = ingredientsArray.join('&ingr=');

  return instance.get(`${RECIPES_LIST_URL}/?ingr=${searchParams}`);
};

const postRecipe = (recipeData: TAddRecipe) => {
  return instance.post(`/recipes`, {
    data: recipeData,
    crossDomain: true,
  });
};

export const API = {
  getRecipes,
  getRecipeByID,
  getRecipesByIngredients,
  getIngredients,
  getMeasureOptions,
  postRecipe,
};
