import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/form/formSlice';
import recipeReducer from './slices/recipe/recipeSlice';
import searchReducer from './slices/search/searchSlice';
import toastReducer from './slices/toast/toastSlice';

const rootReducer = combineReducers({
  form: formReducer,
  toast: toastReducer,
  recipe: recipeReducer,
  search: searchReducer,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['toast', 'search'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'form/loadPhoto',
        ],
        ignoredPaths: ['form.sourcePhoto'],
      },
    }),
});

export const persistor = persistStore(store);

export const getStoreWithState = (preloadedState) =>
  configureStore({ reducer: rootReducer, preloadedState });
