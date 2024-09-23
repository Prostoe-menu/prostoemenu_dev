import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FETCH_RECIPE_BY_ID_ERROR_MESSAGE,
  FETCH_RECIPES_ERROR_MESSAGE,
} from 'utils/constants';
import { recipeService } from './recipeService';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      return await recipeService.getRecipes();
    } catch (error) {
      return rejectWithValue(FETCH_RECIPES_ERROR_MESSAGE);
    }
  }
);

export const fetchMoreRecipes = createAsyncThunk(
  'recipes/fetchMoreRecipes',
  async (url, { rejectWithValue }) => {
    try {
      return await recipeService.getRecipes(url);
    } catch (error) {
      return rejectWithValue(FETCH_RECIPES_ERROR_MESSAGE);
    }
  }
);

export const fetchRecipeByID = createAsyncThunk(
  'recipes/fetchRecipeByID',
  async (id, { rejectWithValue }) => {
    try {
      const response = await recipeService.getRecipeByID(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(FETCH_RECIPE_BY_ID_ERROR_MESSAGE);
    }
  }
);
