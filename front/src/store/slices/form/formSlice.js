import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentFormStage: 1,
  recipeName: null,
  recipeDifficulty: null,
  servingsNumber: 0,
  cookingTime: 0,
  timeAtStove: 0,
  description: null,
  finishedPhoto: null,
  ingredients: [],
  cookingSteps: [],
  comment: null,
  author: null,
  email: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    changeCurrentStage: (state, action) => {
      state.currentFormStage = action.payload;
    },
    resetCurrentStage: (state) => {
      state.currentFormStage = 1;
    },
    saveGeneralRecipeInfo: (state, action) => {
      state.name = action.payload.recipeName;
      state.difficulty = action.payload;
      state.servingsNumber = action.payload.servingsNumber;
      state.cookingTime = action.payload.cookingTime;
      state.timeAtStove = action.payload.cookingTime;
      state.description = action.payload.description;
      state.finishedPhoto = action.payload.finishedDishPhoto;
    },
    saveCookingSteps: (state, action) => {
      state.cookingSteps = action.payload;
    },
    saveIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    saveAdditionalInfo: (state, action) => {
      state.comment = action.payload.comment;
      state.author = action.payload.author;
      state.email = action.payload.email;
    },
    resetState: (state) => {
      state.recipeName = null;
      state.recipeDifficulty = null;
      state.servingsNumber = 0;
      state.cookingTime = 0;
      state.timeAtStove = 0;
      state.description = null;
      state.finishedPhoto = null;
      state.cookingSteps = [];
      state.ingredients = [];
      state.comment = null;
      state.author = null;
      state.email = null;
    },
  },
});

export default formSlice.reducer;
