import axios from 'axios';

const API_ENDPOINT_URL = `${process.env.REACT_APP_API_URL}/recipes/?format=json`;

const postRecipe = async (recipeData) => {
  const response = await axios({
    method: 'POST',
    url: API_ENDPOINT_URL,
    data: recipeData,
    crossDomain: true,
  });

  return response.data;
};

const formService = { postRecipe };

export default formService;
