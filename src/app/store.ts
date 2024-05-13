import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";
import charReducer from "../features/counter/char-slice";
import { apiSlice } from "../features/characters/characters-api-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    char: charReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
