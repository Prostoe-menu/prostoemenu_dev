import axios from 'axios';
import { RECIPES_LIST_URL } from 'utils/urls';

const getRecipes = async (url) => {
  const response = await axios({
    method: 'GET',
    url: url ?? `${import.meta.env.VITE_API_URL}${RECIPES_LIST_URL}`,
    crossDomain: true,
  });

  return response.data;
};

const getRecipeByID = async (id) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}${RECIPES_LIST_URL}/${id}`
  );
};

export const recipeService = {
  getRecipes,
  getRecipeByID,
};
