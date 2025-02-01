import { createSlice } from '@reduxjs/toolkit';
import { fetchMoreRecipes, fetchRecipeByID, fetchRecipes } from './recipeThunk';

const initialState = {
  recipes: [],
  total: 0,
  next: null,
  prev: null,
  recipe: null,
  isLoading: false,
  isError: false,
  errorMessage: null,
};

const isPendingAction = (action) =>
  typeof action.type === 'string' &&
  action.type.startsWith('recipes') &&
  !action.type.startsWith('recipes/fetchMoreRecipes') &&
  action.type.endsWith('/pending');

const isRejectedAction = (action) =>
  typeof action.type === 'string' &&
  action.type.startsWith('recipes') &&
  action.type.endsWith('/rejected');

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    resetReceiptState: () => initialState,
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
        const { count, results, next, previous } = action.payload;

        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.recipes = results;
        state.total = count;
        state.next = next;
        state.prev = previous;
      })
      .addCase(fetchMoreRecipes.fulfilled, (state, action) => {
        const { count, results, next, previous } = action.payload;

        state.isLoading = false;
        state.isError = false;
        state.errorMessage = null;
        state.recipes.push(...results);
        state.total = count;
        state.next = next;
        state.prev = previous;
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
