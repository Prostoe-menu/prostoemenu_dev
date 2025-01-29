import { createSlice } from '@reduxjs/toolkit';

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    selected: [],
  },
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
    resetSelected(state) {
      state.selected = [];
    },
  },
});

export const { setSelected, resetSelected } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
