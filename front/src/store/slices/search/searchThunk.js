import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_RECIPES_BY_INGREDIENT_ERROR_MESSAGE } from 'utils/constants';
import { searchService } from './searchService';

export const fetchRecipesByIngredients = createAsyncThunk(
  'search/fetchRecipesByIngredients',
  async (ingredientsArray, { rejectWithValue }) => {
    try {
      const response = await searchService.getRecipesByIngredients(
        ingredientsArray
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(FETCH_RECIPES_BY_INGREDIENT_ERROR_MESSAGE);
    }
  }
);
