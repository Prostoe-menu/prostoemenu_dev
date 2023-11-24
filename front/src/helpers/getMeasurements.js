import axios from 'axios';

const URL = `${import.meta.env.VITE_API_URL}/measurements`;

const getMeasurements = async () => {
  const reponse = await axios({
    method: 'GET',
    url: URL,
    crossDomain: true,
  });

  const { data } = reponse;
  return data;
};

export default getMeasurements;
