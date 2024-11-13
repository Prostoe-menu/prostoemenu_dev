import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_RECIPES_BY_INGREDIENT_ERROR_MESSAGE } from 'utils/constants';

import { API } from 'api/api';

export const fetchRecipesByIngredients = createAsyncThunk(
  'search/fetchRecipesByIngredients',
  async (ingredientsArray, { rejectWithValue }) => {
    return await API.getRecipesByIngredients(ingredientsArray)
      .then((response) => {
        if (response.status !== 200)
          return rejectWithValue(FETCH_RECIPES_BY_INGREDIENT_ERROR_MESSAGE);

        return response.data;
      })
      .catch(() => {
        return rejectWithValue(FETCH_RECIPES_BY_INGREDIENT_ERROR_MESSAGE);
      });
  }
);
