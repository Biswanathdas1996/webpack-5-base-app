import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./slices/counter/counterSlice";
import apiReducer from "./slices/api/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: apiReducer,
  },
});
