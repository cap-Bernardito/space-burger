import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "services/reducers";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
