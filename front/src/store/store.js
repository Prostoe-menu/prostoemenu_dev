import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import formReducer from './slices/form/formSlice';
import toastReducer from './slices/toast/toastSlice';

const rootReducer = combineReducers({
  form: formReducer,
  toast: toastReducer,
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['toast'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
