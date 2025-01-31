import axios from 'axios';
import { INGREDIENTS_URL, RECIPES_LIST_URL } from 'utils/urls';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getIngredients = (query: string) => {
  return instance.get(`${INGREDIENTS_URL}/?name=${query}`, {
    withCredentials: true,
  });
};

const getMeasureOptions = () => {
  return instance.get(`/measurements`, {
    withCredentials: true,
  });
};

const getRecipes = (url: string) => {
  return instance.get(url ?? `${RECIPES_LIST_URL}`, {
    withCredentials: true,
  });
};

const getRecipeByID = (id: string) => {
  return instance.get(`${RECIPES_LIST_URL}/${id}`);
};

const getRecipesByIngredients = (ingredientsArray: Array<string>) => {
  const searchParams = ingredientsArray.join('&ingr=');

  return instance.get(`${RECIPES_LIST_URL}/?ingr=${searchParams}`);
};

const postRecipe = (recipeData: any) => {
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
