import axios from 'axios';

export function checkImage(path) {
  axios
    .get(path)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
