import axios from 'axios';
import { RECIPES_LIST_URL } from 'utils/urls';

const getRecipes = async () => {
  const response = await axios({
    method: 'GET',
    url: `${import.meta.env.VITE_API_URL}${RECIPES_LIST_URL}`,
    crossDomain: true,
  });

  const { results } = response.data;
  return results;
};

const getRecipeByID = async (id) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}${RECIPES_LIST_URL}/${id}`
  );
};

export const recipeService = { getRecipes, getRecipeByID };
