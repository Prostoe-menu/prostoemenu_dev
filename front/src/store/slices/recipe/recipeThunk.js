import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace 'your_api_endpoint' with the actual API endpoint
const API_ENDPOINT = 'http://109.172.82.25/api/recipes/';

const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data; // Assuming the API returns an array of recipes
  } catch (error) {
    throw new Error('Failed to fetch recipes.');
  }
});
export default fetchRecipes;
