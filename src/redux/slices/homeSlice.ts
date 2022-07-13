import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface homeSlice {
  data: any;
}

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    value: {
      data: "",
    } as homeSlice,
  },

  reducers: {
    getdate: (state, _action: any) => ({
      ...state,
      error: "",
    }),
  },
});

export const { getdate } = homeSlice.actions;

export default homeSlice.reducer;
