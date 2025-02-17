import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { API } from 'api/api';
import { TAddRecipe } from 'shared/types/addRecipe';
import { TMeasurementsResponse } from 'shared/types/api';

export const postRecipe = createAsyncThunk(
  'form/postRecipe',
  async (recipeData: TAddRecipe, { rejectWithValue }) => {
    try {
      return await API.postRecipe(recipeData);
    } catch (error) {
      console.log('ERROR: ', error);
      const message = 'Error postRecipe';
      // (error &&
      //   error.response &&
      //   error.response.data &&
      //   error.response.data.message) ||
      // error.message ||
      // error.toString();

      return rejectWithValue(message);
    }
  }
);

export const getMeasureOptions = createAsyncThunk(
  'form/getMeasureOptions',
  async (_, { rejectWithValue }) => {
    return API.getMeasureOptions()
      .then(
        (
          response: AxiosResponse<TMeasurementsResponse, { message: string }>
        ) => {
          if (response.status !== 200)
            return rejectWithValue("Error: can't load measure options");

          return response.data?.results?.map((item) => ({
            value: item.id,
            label: item.abbreviation,
          }));
        }
      )
      .catch((error) => {
        return rejectWithValue(
          error.message ?? "Error: can't load measure options"
        );
      });
  }
);
