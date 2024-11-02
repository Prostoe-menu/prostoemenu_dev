import { createAsyncThunk } from '@reduxjs/toolkit';
import { formService } from './formService';

export const postRecipe = createAsyncThunk(
  'form/postRecipe',
  async (recipeData, thunkAPI) => {
    try {
      return await formService.postRecipe(recipeData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMeasureOptions = createAsyncThunk(
  'form/getMeasureOptions',
  async (_, { rejectWithValue }) => {
    return await formService
      .getMeasureOptions()
      .then((data) => {
        if (data?.message)
          return rejectWithValue("Error: can't load measure options");

        return data?.map((item) => ({
          value: item.id,
          label: item.abbreviation,
        }));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error?.toString();

        console.log('getMeasureOptions ERROR: ', message);
        return rejectWithValue("Error: can't load measure options");
      });
  }
);
