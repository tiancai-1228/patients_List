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
  setSuccess,
  getOrderList,
  postCreatOrder,
  postUpdateOrder,
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

    yield put(setSuccess({ listData: data.data.result }));
  } catch (error) {
    console.log(error);
  }
}

function* handelGetOrderList(prop: any) {
  const { orderId } = prop.payload;
  try {
    const data: { data: { result: {} } } = yield call(getOrder, { orderId });
    yield put(setSuccess({ orderData: data.data.result }));
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

    const updateState: { data: { result: string }; status: number } =
      yield call(UserUpdate, {
        userId: user.id.toString(),
        orderId: user.orderId + "," + orderdata.data.result.toString(),
      });

    if (updateState.status == 200) {
      const orderList: { data: { result: {} } } = yield call(getOrder, {
        orderId: user.orderId + "," + orderdata.data.result.toString(),
      });
      yield put(setSuccess({ orderData: orderList.data.result }));

      const userlist: { data: { result: { orderId: string }[] } } = yield call(
        getUserList
      );
      yield put(setSuccess({ listData: userlist.data.result }));
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
      yield put(setSuccess({ orderData: orderList.data.result }));
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
