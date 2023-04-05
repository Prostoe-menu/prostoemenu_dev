import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipeName: null,
  recipeDifficulty: null,
  servingsNumber: 0,
  cookingTime: 0,
  timeAtStove: 0,
  description: null,
  finishedPhoto: null,
};

const generalInfoSlice = createSlice({
  name: 'generalInfo',
  initialState,
  reducers: {
    saveGeneralRecipeInfo: (state, action) => {
      state.name = action.payload.recipeName;
      state.difficulty = action.payload;
      state.servingsNumber = action.payload.servingsNumber;
      state.cookingTime = action.payload.cookingTime;
      state.timeAtStove = action.payload.cookingTime;
      state.description = action.payload.description;
      state.finishedPhoto = action.payload.finishedDishPhoto;
    },
    resetData: (state) => {
      state.recipeName = null;
      state.recipeDifficulty = null;
      state.servingsNumber = 0;
      state.cookingTime = 0;
      state.timeAtStove = 0;
      state.description = null;
      state.finishedPhoto = null;
    },
  },
});

export default generalInfoSlice.reducer;
