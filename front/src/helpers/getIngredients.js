import axios from 'axios';
import { INGREDIENTS_URL } from 'utils/urls';

const URL = `${import.meta.env.VITE_API_URL}${INGREDIENTS_URL}/?name=`;

const getIngredients = async (query) => {
  const reponse = await axios({
    method: 'GET',
    url: URL + query,
    crossDomain: true,
  });

  return reponse.data;
};

export default getIngredients;
