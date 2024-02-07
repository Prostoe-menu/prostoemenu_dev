//import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FETCH_RECIPES_ERROR_MESSAGE,
  FETCH_RECIPE_BY_ID_ERROR_MESSAGE,
} from 'utils/constants';
import { recipeService } from './recipeService';

const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const originalRecipes = await recipeService.getRecipes();

      return [...Array(10)]
        .map(() => originalRecipes)
        .flat()
        .map((item) => ({
          ...item,
          cooking_time: Math.round(200 * Math.random()),
        }));
    } catch (error) {
      return rejectWithValue(FETCH_RECIPES_ERROR_MESSAGE);
    }
  }
);

export default fetchRecipes;

export const fetchRecipeByID = createAsyncThunk(
  'recipes/fetchRecipeByID',
  async (id, { rejectWithValue }) => {
    try {
      const response = await recipeService.getRecipeByID(id);

      return response.data && response.data[0];
    } catch (error) {
      return rejectWithValue(FETCH_RECIPE_BY_ID_ERROR_MESSAGE);
    }
  }
);
