import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/recipes/`;

const getRecipes = async () => {
  const reponse = await axios({
    method: 'GET',
    url: URL,
    crossDomain: true,
  });

  const { results } = reponse.data;
  return results;
};

export default getRecipes;
