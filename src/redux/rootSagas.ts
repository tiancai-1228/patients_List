import { all, fork } from "redux-saga/effects";
import * as homeSaga from "./sagas/homeSaga";

export function* rootSaga() {
  yield all([...Object.values(homeSaga)].map(fork));
}
