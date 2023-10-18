import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/ingredients/?format=json&ingredient_suffix=`;

const getIngredients = async (query) => {
  const reponse = await axios({
    method: 'GET',
    url: URL + query,
    crossDomain: true,
  });

  const { results } = reponse.data;
  return results;
};

export default getIngredients;