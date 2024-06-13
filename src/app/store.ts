import { configureStore } from "@reduxjs/toolkit";
import charReducer from "../features/char/char-slice";
import { apiSlice } from "../features/characters/characters-api-slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Persist configuration for the char slice
const persistConfig = {
  key: "char",
  storage,
};

// Persisted reducer
const persistedCharReducer = persistReducer(persistConfig, charReducer);

export const store = configureStore({
  reducer: {
    char: persistedCharReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
