import axios from 'axios';
import { INGREDIENTS_URL, RECIPES_LIST_URL } from 'utils/urls';

const API_URL = import.meta.env.VITE_API_URL;

const getIngredients = async (query) => {
  return await axios({
    method: 'GET',
    url: `${API_URL}${INGREDIENTS_URL}/?name=${query}`,
    crossDomain: true,
  });
};

const getMeasureOptions = async () => {
  return await axios({
    method: 'GET',
    url: `${API_URL}/measurements`,
    crossDomain: true,
  });
};

const getRecipes = async (url) => {
  return await axios({
    method: 'GET',
    url: url ?? `${API_URL}${RECIPES_LIST_URL}`,
    crossDomain: true,
  });
};

const getRecipeByID = async (id) => {
  return await axios({
    method: 'GET',
    url: `${API_URL}${RECIPES_LIST_URL}/${id}`,
  });
};

const getRecipesByIngredients = async (ingredientsArray) => {
  const searchParams = ingredientsArray.join('&ingr=');

  return await axios({
    method: 'GET',
    url: `${API_URL}${RECIPES_LIST_URL}/?ingr=${searchParams}`,
  });
};

const postRecipe = async (recipeData) => {
  return await axios({
    method: 'POST',
    url: `${API_URL}/recipes`,
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
