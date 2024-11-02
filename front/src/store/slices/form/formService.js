import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const postRecipe = async (recipeData) => {
  const response = await axios({
    method: 'POST',
    url: `${API_URL}/recipes/?format=json`,
    data: recipeData,
    crossDomain: true,
  });

  return response.data;
};

const getMeasureOptions = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_URL}/measurements`,
      crossDomain: true,
    });

    if (response.status === 200) return response.data?.results;

    return null;
  } catch (error) {
    console.log('getMeasurements ERROR: ', error);
    return error;
  }
};

export const formService = { postRecipe, getMeasureOptions };
