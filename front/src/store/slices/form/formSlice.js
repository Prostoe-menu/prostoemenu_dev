import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidV4 } from 'uuid';
import postRecipe from './formThunk';

const initialState = {
  currentFormStage: 1,
  recipeName: null,
  recipeComplexity: null,
  servings: 0,
  cookingTime: 0,
  ovenTime: 0,
  description: null,
  sourcePhoto: null,
  finishedPhoto: null,
  ingredients: [{ elementID: uuidV4(), name: '', volume: '', measure: 'г' }],
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
        ingredientID: action.payload.id,
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
        measure: action.payload.measureUnit,
      };

      state.ingredients = updatedIngredients;
    },

    saveAllIngredients: (state) => {
      // delete all inputs without names

      const filteredIngredients = state.ingredients.filter((item) => item.name);
      state.ingredients = filteredIngredients;
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
      state.sourcePhoto = null;
      state.finishedPhoto = null;
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
      state.sourcePhoto = null;
    },
    saveCroppedPhoto: (state, action) => {
      state.finishedPhoto = action.payload;
    },
    resetCroppedPhoto: (state) => {
      state.finishedPhoto = null;
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
  addEmptyIngredient,
  deleteIngredient,
  saveIngredient,
  resetState,
  changeIngredientVolume,
  changeIngredientMeasureUnits,
  saveAllIngredients,
  loadPhoto,
  saveCroppedPhoto,
  resetLoadPhoto,
  resetCroppedPhoto,
} = formSlice.actions;
export default formSlice.reducer;
