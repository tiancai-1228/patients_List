import { call, put, takeLatest } from "@redux-saga/core/effects";
import { getUserList, getOrder } from "../../axios/page/home";
import { getdate, setdate } from "../slices/homeSlice";

function* handelGetUserList() {
  try {
    const data: { data: { result: { orderId: string }[] } } = yield call(
      getUserList
    );
    let orderIds = new Set();
    data.data.result.forEach((el) => {
      el.orderId.split(",").forEach((id) => {
        orderIds.has(id) ? false : orderIds.add(id);
      });
    });

    yield put(setdate({ listData: data.data.result }));
  } catch (error) {
    console.log(error);
  }
}

// watcher
export function* watchHandelTest() {
  yield takeLatest(getdate, handelGetUserList);
}
