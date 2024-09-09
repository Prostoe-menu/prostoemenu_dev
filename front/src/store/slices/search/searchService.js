import axios from 'axios';
import { RECIPES_LIST_URL } from 'utils/urls';

const getRecipesByIngredients = async (ingredientsArray) => {
  const searchParams = ingredientsArray.join('&ingr=');

  return await axios.get(
    `${import.meta.env.VITE_API_URL}${RECIPES_LIST_URL}/?ingr=${searchParams}`
  );
};

export const searchService = {
  getRecipesByIngredients,
};
