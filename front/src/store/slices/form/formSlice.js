import { v4 as uuidV4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';
import postRecipe from './formThunk';

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
  ingredients: [
    { elementID: uuidV4(), ingredient: '', volume: '', measure: 'г' },
  ],
  steps: [],
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

    addEmptyIngredient: (state) => {
      const updatedIngredients = [...state.ingredients];
      const emptyIngredient = {
        elementID: uuidV4(),
        name: '',
        volume: '',
        measure: 'г',
      };
      updatedIngredients.push(emptyIngredient);
      state.ingredients = updatedIngredients;
    },
    deleteIngredient: (state, action) => {
      const updatedIngredients = state.ingredients.filter(
        (ingredient) => ingredient.elementID !== action.payload
      );
      state.ingredients = updatedIngredients;
    },
    saveIngredient: (state, action) => {
      const updatedIngredients = [...state.ingredients];
      const ingredientIndex = updatedIngredients.findIndex(
        (item) => item.elementID === action.payload.id
      );
      const storedIngredient = updatedIngredients[ingredientIndex];

      updatedIngredients[ingredientIndex] = {
        ...storedIngredient,
        name: action.payload.name,
        elementID: action.payload.id,
      };

      state.ingredients = updatedIngredients;
    },
    changeIngredientVolume: (state, action) => {
      const updatedIngredients = [...state.ingredients];
      const ingredientIndex = updatedIngredients.findIndex(
        (item) => item.elementID === action.payload.id
      );
      const storedIngredient = updatedIngredients[ingredientIndex];
      updatedIngredients[ingredientIndex] = {
        ...storedIngredient,
        volume: action.payload.volume,
      };

      state.ingredients = updatedIngredients;
    },

    changeIngredientMeasureUnits: (state, action) => {
      const updatedIngredients = [...state.ingredients];
      const ingredientIndex = updatedIngredients.findIndex(
        (item) => item.elementID === action.payload.id
      );
      const storedIngredient = updatedIngredients[ingredientIndex];
      updatedIngredients[ingredientIndex] = {
        ...storedIngredient,
        measure: action.payload.measureUnit.name,
      };

      state.ingredients = updatedIngredients;
    },

    saveAllIngredients: (state) => {
      // delete all inputs without names

      const filteredIngredients = state.ingredients.filter((item) => item.name);
      state.ingredients = filteredIngredients;
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
      .addCase(postRecipe.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
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
      })
      .addCase(postRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  nextStep,
  prevStep,
  goToStep,
  saveRecipeInfo,
  resetState,
  resetCoverPhoto,

  saveAdditionalInfo,
  addEmptyIngredient,
  deleteIngredient,
  saveIngredient,
  changeIngredientVolume,
  changeIngredientMeasureUnits,
  saveAllIngredients,
} = formSlice.actions;

export default formSlice.reducer;
