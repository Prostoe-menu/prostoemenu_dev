import axios from 'axios';

const URL = `${import.meta.env.VITE_API_URL}/recipes/`;

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
