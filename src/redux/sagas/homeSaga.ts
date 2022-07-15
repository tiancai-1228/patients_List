import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  getUserList,
  getOrder,
  UserUpdate,
  creatOrder,
  orderUpdate,
} from "../../axios/page/home";
import { getdate, setdate } from "../slices/homeSlice";

function* handelGetUserList() {
  try {
    const data: { data: { result: { orderId: string }[] } } = yield call(
      getUserList
    );
    const orderIds = new Set();
    data.data.result.forEach((el) => {
      el.orderId.split(",").forEach((id) => {
        orderIds.has(id) ? false : orderIds.add(id);
      });
    });

    // const test: [] = yield call(orderUpdate, { orderId: "114", message: "ya" });

    yield put(setdate({ listData: data.data.result }));
  } catch (error) {
    console.log(error);
  }
}

// watcher
export function* watchHandelTest() {
  yield takeLatest(getdate, handelGetUserList);
}
