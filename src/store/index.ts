import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./covid.slice";

export const store = configureStore({
  reducer: {
    countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
