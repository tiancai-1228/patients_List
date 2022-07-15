import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  getUserList,
  getOrder,
  UserUpdate,
  creatOrder,
  orderUpdate,
} from "../../axios/page/home";
import {
  getdate,
  successfulData,
  getOrderList,
  postCreatOrder,
  postUpdateOrder,
  loadingState,
} from "../slices/homeSlice";

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

    yield put(successfulData({ listData: data.data.result }));
  } catch (error) {
    console.log(error);
  }
}

function* handelGetOrderList(prop: any) {
  const { orderId } = prop.payload;
  try {
    const data: { data: { result: {} } } = yield call(getOrder, { orderId });
    yield put(successfulData({ orderData: data.data.result }));
  } catch (error) {
    console.log(error);
  }
}

function* handelCreateOrder(prop: {
  payload: { user: { id: string; orderId: string }; message: string };
}) {
  const { message, user } = prop.payload;
  try {
    const orderdata: { data: { result: string } } = yield call(creatOrder, {
      message,
    });
    yield put(loadingState({ lodaingState: true }));
    const updateState: { data: { result: string }; status: number } =
      yield call(UserUpdate, {
        userId: user.id.toString(),
        orderId: user.orderId + "," + orderdata.data.result.toString(),
      });

    if (updateState.status == 200) {
      const orderList: { data: { result: {} } } = yield call(getOrder, {
        orderId: user.orderId + "," + orderdata.data.result.toString(),
      });

      const userlist: { data: { result: { orderId: string }[] } } = yield call(
        getUserList
      );
      yield put(
        successfulData({
          listData: userlist.data.result,
          orderData: orderList.data.result,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* handelUpdateOrder(prop: {
  payload: { orderId: string; message: string; orders: string };
}) {
  const { message, orderId, orders } = prop.payload;
  try {
    yield put(loadingState({ lodaingState: true }));
    const data: { data: { result: {} }; status: number } = yield call(
      orderUpdate,
      {
        message,
        orderId,
      }
    );
    if (data.status == 200) {
      const orderList: { data: { result: {} } } = yield call(getOrder, {
        orderId: orders,
      });
      yield put(successfulData({ orderData: orderList.data.result }));
    }
  } catch (error) {
    console.log(error);
  }
}

// watcher
export function* watchHandelUserList() {
  yield takeLatest(getdate, handelGetUserList);
}

export function* watchHandelOrderList() {
  yield takeLatest(getOrderList, handelGetOrderList);
}

export function* watchHandelCreateOrder() {
  yield takeLatest(postCreatOrder, handelCreateOrder);
}

export function* watchHandelUpdateOrder() {
  yield takeLatest(postUpdateOrder, handelUpdateOrder);
}
