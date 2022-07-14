import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeSlice {
  listData?: [];
}

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    value: {
      listData: undefined,
    } as homeSlice,
  },

  reducers: {
    getdate: (state) => ({
      ...state,
      error: "",
    }),

    setdate: (state, _action: any) => ({
      ...state,
      value: { ...state.value, listData: _action.payload.listData },
      error: "",
    }),
  },
});

export const { getdate, setdate } = homeSlice.actions;

export default homeSlice.reducer;
