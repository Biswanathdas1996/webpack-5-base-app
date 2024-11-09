import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./slices/counter/counterSlice";
import apiReducer from "./slices/api/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: apiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
