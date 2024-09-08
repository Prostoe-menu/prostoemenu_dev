import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipeByID, fetchRecipes } from './recipeThunk';

const initialState = {
  recipes: [],
  recipe: null,
  isLoading: false,
  isError: false,
  errorMessage: null,
};

const isPendingAction = (action) =>
  typeof action.type === 'string' &&
  action.type.startsWith('recipes') &&
  action.type.endsWith('/pending');

const isRejectedAction = (action) =>
  typeof action.type === 'string' &&
  action.type.startsWith('recipes') &&
  action.type.endsWith('/rejected');

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
      .addMatcher(isPendingAction, (state) => {
        return {
          ...state,
          isLoading: true,
          isError: false,
          errorMessage: null,
        };
      })
      .addMatcher(isRejectedAction, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      }));
  },
});

export const { resetRecipesState } = recipeSlice.actions;

export default recipeSlice.reducer;
