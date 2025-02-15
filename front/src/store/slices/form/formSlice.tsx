import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TAddRecipeIngredients,
  TAddRecipeMainInfo,
} from 'shared/types/addRecipe';
import { IOption } from 'shared/types/measurements';
import { getMeasureOptions, postRecipe } from './formThunk';

type TInitialState = {
  step: number;
  mainInfo: TAddRecipeMainInfo;
  ingredients: TAddRecipeIngredients | null;
  measureOptions: Array<IOption> | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
};

const initialState: TInitialState = {
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
    goToStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    saveRecipeInfo: (state, action: PayloadAction<TAddRecipeMainInfo>) => {
      state.mainInfo = { ...action.payload };
    },
    saveIngredients: (state, action: PayloadAction<TAddRecipeIngredients>) => {
      state.ingredients = action.payload;
    },
    resetState: () => {
      return initialState;
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
      .addCase(postRecipe.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(postRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
      })
      .addCase(
        getMeasureOptions.fulfilled,
        (state, action: PayloadAction<Array<IOption>>) => {
          state.measureOptions = action.payload;
        }
      )
      .addCase(getMeasureOptions.rejected, (_, action) => {
        console.log(action.payload);
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
