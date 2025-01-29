import { createSlice } from '@reduxjs/toolkit';

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
  },
  reducers: {
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
    resetiIngredients(state) {
      state.ingredients = [];
    },
  },
});

export const { setIngredients, resetIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
