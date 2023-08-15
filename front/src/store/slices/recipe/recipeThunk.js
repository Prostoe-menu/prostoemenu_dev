import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace 'your_api_endpoint' with the actual API endpoint
const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/recipes/`;

const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    const originalRecipes = response.data.results; // Assuming the 'results' array contains the recipes
    const multipliedRecipes = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
      multipliedRecipes.push(...originalRecipes);
    }

    return multipliedRecipes;
  } catch (error) {
    throw new Error('Failed to fetch recipes.');
  }
});
export default fetchRecipes;
