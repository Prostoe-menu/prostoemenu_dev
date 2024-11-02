import axios from 'axios';
import { INGREDIENTS_URL } from 'utils/urls';

const API_URL = import.meta.env.VITE_API_URL;

const getIngredients = async (query) => {
  if (!query) return null;

  try {
    const response = await axios.get(
      `${API_URL}${INGREDIENTS_URL}/?name=${query}`,
      {
        crossDomain: true,
      }
    );

    if (response.status === 200) return response.data;

    return null;
  } catch (error) {
    console.log('getIngredients_ERROR: ', error);

    return null;
  }
};

export default getIngredients;
