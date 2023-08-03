import { createSlice } from '@reduxjs/toolkit';
import fetchRecipes from './recipeThunk';


const initialState = {
  recipes: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    resetReceiptState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
      state.recipes = [];
    },
    updateReceiptStore: (state, action) => {
      state.isLoading = action.payload;
      state.isError = false;
      state.errorMessage = null;
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});
export const { resetRecipesState } = recipeSlice.actions;
export default recipeSlice.reducer;
