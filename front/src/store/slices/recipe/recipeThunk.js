import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_RECIPES_ERROR_MESSAGE } from 'utils/constants';

// Replace 'your_api_endpoint' with the actual API endpoint
const API_ENDPOINT = `${import.meta.env.VITE_API_URL}/recipes/`;

const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    const originalRecipes = response.data.results; // Assuming the 'results' array contains the recipes
    return [...Array(3)].map(() => originalRecipes).flat();
  } catch (error) {
    throw new Error(FETCH_RECIPES_ERROR_MESSAGE);
  }
});
export default fetchRecipes;
