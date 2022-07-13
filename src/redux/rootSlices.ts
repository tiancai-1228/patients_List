import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice";

export const rootReducer = combineReducers({
  home: homeReducer,
});
