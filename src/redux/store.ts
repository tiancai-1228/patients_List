// app/store.ts
import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { Action } from "redux";
import { rootReducer } from "./rootSlices";
import { rootSaga } from "./rootSagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

sagaMiddleware.run(rootSaga);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
