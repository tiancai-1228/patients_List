import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeSlice {
  listData?: [];
  orderData?: [];
}

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    isLoading: false,
    value: {
      listData: undefined,
      orderData: undefined,
    } as homeSlice,
  },

  reducers: {
    getdate: (state) => ({
      ...state,
      error: "",
    }),

    getOrderList: (state, _action: any) => ({
      ...state,
      error: "",
    }),

    postCreatOrder: (
      state,
      _action: {
        payload: { user: { id: string; orderId: string }; message: string };
      }
    ) => ({
      ...state,
      isLoading: true,
      error: "",
    }),

    postUpdateOrder: (
      state,
      _action: {
        payload: { orderId: string; orders: string; message: string };
      }
    ) => ({
      ...state,
      isLoading: true,
      error: "",
    }),

    setSuccess: (state, _action: any) => ({
      ...state,
      isLoading: false,
      value: { ...state.value, ..._action.payload },
      error: "",
    }),
  },
});

export const {
  getdate,
  setSuccess,
  getOrderList,
  postCreatOrder,
  postUpdateOrder,
} = homeSlice.actions;

export default homeSlice.reducer;
