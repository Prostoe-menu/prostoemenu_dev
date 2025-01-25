import { createSlice } from '@reduxjs/toolkit';

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    selectedIngredients: [],
  },
  reducers: {
    setSelectedIngredients(state, action) {
      state.selectedIngredients = action.payload;
    },
    resetSelectedIngredients(state) {
      state.selectedIngredients = [];
    },
  },
});

export const { setSelectedIngredients, resetSelectedIngredients } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
