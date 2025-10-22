import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import { moviesApi } from "./api/moviesApi";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
