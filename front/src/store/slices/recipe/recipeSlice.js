import { createSlice } from '@reduxjs/toolkit';
import fetchRecipes, { fetchRecipeByID } from './recipeThunk';

const initialState = {
  recipes: [],
  recipe: null,
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
      state.recipe = null;
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
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipeByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.recipe = action.payload;
      })
      .addMatcher(
        (action) =>
          typeof action.type === 'string' && action.type.endsWith('/pending'),
        (state) => ({
          ...state,
          isLoading: true,
          isError: false,
          errorMessage: null,
        })
      )
      .addMatcher(
        (action) => {
          return (
            typeof action.type === 'string' && action.type.endsWith('/rejected')
          );
        },
        (state, action) => ({
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        })
      );
  },
});

export const { resetRecipesState } = recipeSlice.actions;

export default recipeSlice.reducer;
