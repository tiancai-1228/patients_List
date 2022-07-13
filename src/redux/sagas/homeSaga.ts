import { call, put, takeLatest } from "@redux-saga/core/effects";
import { getUserList } from "../../axios/page/home";
import { getdate } from "../slices/homeSlice";

function* handelGetUserList() {
  try {
    const data: [] = yield call(getUserList);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// watcher
export function* watchHandelTest() {
  yield takeLatest(getdate, handelGetUserList);
}
