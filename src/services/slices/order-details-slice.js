import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: null,
};

const orderDetails = createSlice({
  name: "ORDER_DETAILS",
  initialState,
  reducers: {
    addDetails(state, action) {
      state.number = action.payload;
    },
    removeDetails(state) {
      state.number = null;
    },
  },
});

export const { addDetails, removeDetails } = orderDetails.actions;
export default orderDetails.reducer;
