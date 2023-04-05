import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/form/formSlice';

const rootReducer = combineReducers({
  form: formReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
