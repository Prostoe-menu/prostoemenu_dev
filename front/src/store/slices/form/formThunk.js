import { createAsyncThunk } from '@reduxjs/toolkit';
import formService from './formService';

const postRecipe = createAsyncThunk(
  'recipes/post',
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

export default postRecipe;
