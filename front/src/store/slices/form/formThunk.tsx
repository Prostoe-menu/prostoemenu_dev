import { createAsyncThunk } from '@reduxjs/toolkit';

import { API } from 'api/api';

export const postRecipe = createAsyncThunk(
  'form/postRecipe',
  async (recipeData, { rejectWithValue }) => {
    try {
      return await API.postRecipe(recipeData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

export const getMeasureOptions = createAsyncThunk(
  'form/getMeasureOptions',
  async (_, { rejectWithValue }) => {
    return await API.getMeasureOptions()
      .then((response) => {
        if (response.status !== 200)
          return rejectWithValue("Error: can't load measure options");

        return response.data?.results?.map((item) => ({
          value: item.id,
          label: item.abbreviation,
        }));
      })
      .catch((error) => {
        return rejectWithValue(
          error.message ?? "Error: can't load measure options"
        );
      });
  }
);
