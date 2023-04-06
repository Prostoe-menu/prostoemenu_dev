import axios from 'axios';

const API_ENDPOINT_URL = '';

const postRecipe = async (recipeData) => {
  const response = await axios({
    method: 'POST',
    URL: API_ENDPOINT_URL,
    data: recipeData,
  });

  return response.data;
};

const formService = { postRecipe };

export default formService;
