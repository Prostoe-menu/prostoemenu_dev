import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_RECIPES_ERROR_MESSAGE } from 'utils/constants';
import { RECIPES_LIST_URL } from 'utils/urls';

const API_ENDPOINT = `${import.meta.env.VITE_API_URL}${RECIPES_LIST_URL}`;

const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    const originalRecipes = response.data.results;
    return [...Array(3)].map(() => originalRecipes).flat();
  } catch (error) {
    throw new Error(FETCH_RECIPES_ERROR_MESSAGE);
  }
});
export default fetchRecipes;
