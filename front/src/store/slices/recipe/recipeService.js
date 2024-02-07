import axios from 'axios';
import RECIPES_LIST_URL from 'utils/urls';

const URL = `${import.meta.env.VITE_API_URL}${RECIPES_LIST_URL}`;

const getRecipes = async () => {
  const reponse = await axios({
    method: 'GET',
    url: URL,
    crossDomain: true,
  });

  const { results } = reponse.data;
  return results;
};
const recipeService = { getRecipes };

export default recipeService;
