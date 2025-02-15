import { createSlice } from '@reduxjs/toolkit';
import type { IRecipe } from 'shared/types/recipe';
import { fetchRecipesByIngredients } from './searchThunk';

type TInitialState = {
  recipes: {
    results: Array<IRecipe>;
    count: number;
  };
  isSearch: boolean;
  isLoading: boolean;
  errorMessage: string | null;
};

const initialState: TInitialState = {
  recipes: {
    results: [],
    count: 0,
  },
  isSearch: false,
  isLoading: false,
  errorMessage: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesByIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSearch = true;
        state.errorMessage = null;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isSearch = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(fetchRecipesByIngredients.pending, (state) => {
        state.isLoading = true;
        state.isSearch = false;
        state.errorMessage = null;
      });
  },
});

export const { reset } = searchSlice.actions;

export default searchSlice.reducer;
