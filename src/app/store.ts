import { configureStore } from "@reduxjs/toolkit";
import charReducer from "../features/char/char-slice";
import { apiSlice } from "../features/characters/characters-api-slice";

export const store = configureStore({
  reducer: {
    char: charReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
