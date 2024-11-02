import { createSlice } from '@reduxjs/toolkit';
import { getMeasureOptions, postRecipe } from './formThunk';

const initialState = {
  step: 1,
  mainInfo: {
    title: '',
    description: null,
    cover_path: null,
    complexity: null,
    allhours: null,
    allminutes: null,
    cookhours: null,
    cookminuts: null,
    quantity: 0,
  },
  ingredients: null,
  measureOptions: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    goToStep: (state, action) => {
      state.step = action.payload;
    },
    saveRecipeInfo: (state, action) => {
      state.mainInfo = { ...action.payload };
    },
    saveIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    resetState: () => {
      return { ...initialState };
    },
    resetCoverPhoto: (state) => {
      state.mainInfo.cover_path = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postRecipe.fulfilled, () => {
        return { ...initialState, isLoading: false, isSuccess: true };
      })
      .addCase(postRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getMeasureOptions.fulfilled, (state, action) => {
        state.measureOptions = action.payload;
      });
  },
});

export const {
  nextStep,
  prevStep,
  goToStep,
  saveRecipeInfo,
  saveIngredients,
  resetState,
  resetCoverPhoto,
} = formSlice.actions;

export default formSlice.reducer;
