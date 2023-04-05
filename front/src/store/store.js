import { combineReducers, configureStore } from '@reduxjs/toolkit';
import additionalInfoReducer from './slices/form/additionalInfoSlice';
import cookingStepsReducer from './slices/form/cookingStepsSlice';
import generalInfoReducer from './slices/form/generalInfoSlice';
import ingredientsReducer from './slices/form/ingredientsSlice';

const rootReducer = combineReducers({
  additionalInfo: additionalInfoReducer,
  cookingSteps: cookingStepsReducer,
  generalInfo: generalInfoReducer,
  ingredients: ingredientsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
