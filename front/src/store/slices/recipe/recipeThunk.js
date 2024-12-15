import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FETCH_RECIPE_BY_ID_ERROR_MESSAGE,
  FETCH_RECIPES_ERROR_MESSAGE,
} from 'utils/constants';

import { API } from 'api/api';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    return await API.getRecipes()
      .then((response) => {
        if (response.status !== 200)
          return rejectWithValue(FETCH_RECIPES_ERROR_MESSAGE);

        return response.data;
      })
      .catch(() => {
        return rejectWithValue(FETCH_RECIPES_ERROR_MESSAGE);
      });
  }
);

export const fetchMoreRecipes = createAsyncThunk(
  'recipes/fetchMoreRecipes',
  async (url, { rejectWithValue }) => {
    return await API.getRecipes(url)
      .then((response) => {
        if (response.status !== 200)
          return rejectWithValue(FETCH_RECIPES_ERROR_MESSAGE);

        return response.data;
      })
      .catch(() => {
        return rejectWithValue(FETCH_RECIPES_ERROR_MESSAGE);
      });
  }
);

export const fetchRecipeByID = createAsyncThunk(
  'recipes/fetchRecipeByID',
  async (id, { rejectWithValue }) => {
    return await API.getRecipeByID(id)
      .then((response) => {
        if (response.status !== 200)
          return rejectWithValue(FETCH_RECIPE_BY_ID_ERROR_MESSAGE);

        return response.data;
      })
      .catch(() => {
        return rejectWithValue(FETCH_RECIPE_BY_ID_ERROR_MESSAGE);
      });
  }
);
