import { createSlice } from '@reduxjs/toolkit';
import postRecipe from './formThunk';

const initialState = {
  currentFormStage: 1,
  recipeName: null,
  recipeDifficulty: null,
  servingsNumber: 0,
  cookingTime: 0,
  timeAtStove: 0,
  description: null,
  sourcePhoto: [],
  finishedPhoto: [],
  ingredients: [],
  cookingSteps: [],
  comment: null,
  author: null,
  email: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
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
      state.recipeName = action.payload.recipeName;
      state.difficulty = action.payload.difficulty;
      state.servingsNumber = action.payload.servingsNumber;
      state.cookingTime = action.payload.cookingTime;
      state.timeAtStove = action.payload.timeAtStove;
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
      state.sourcePhoto = [];
      state.finishedPhoto = [];
      state.cookingSteps = [];
      state.ingredients = [];
      state.comment = null;
      state.author = null;
      state.email = null;
    },
    loadPhoto: (state, action) => {
      state.sourcePhoto = action.payload;
    },
    resetLoadPhoto: (state) => {
      state.sourcePhoto = [];
    },
    saveCroppedPhoto: (state, action) => {
      state.finishedPhoto = action.payload;
    },
    resetCroppedPhoto: (state) => {
      state.finishedPhoto = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postRecipe.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(postRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  changeCurrentStage,
  resetCurrentStage,
  saveGeneralRecipeInfo,
  saveAdditionalInfo,
  saveCookingSteps,
  saveIngredients,
  resetState,
  loadPhoto,
  saveCroppedPhoto,
  resetLoadPhoto,
  resetCroppedPhoto,
} = formSlice.actions;
export default formSlice.reducer;
