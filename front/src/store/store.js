import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import formReducer from './slices/form/formSlice';
import recipeSlice from './slices/recipe/recipeSlice';
import toastReducer from './slices/toast/toastSlice';

const rootReducer = combineReducers({
  form: formReducer,
  toast: toastReducer,
  recipe: recipeSlice,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['toast'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const getStoreWithState = (preloadedState) =>
  configureStore({ reducer: rootReducer, preloadedState });
