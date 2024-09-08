import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipesByIngredients } from './searchThunk';

const initialState = {
  recipes: [],
  isSearch: false,
  isLoading: false,
  isError: false,
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
        state.isError = false;
        state.errorMessage = null;
        state.isSearch = true;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isSearch = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchRecipesByIngredients.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSearch = false;
        state.errorMessage = null;
      });
  },
});

export const { reset } = searchSlice.actions;

export default searchSlice.reducer;
