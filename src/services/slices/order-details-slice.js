import { createSlice } from "@reduxjs/toolkit";

import apiService from "../api-service";

const initialState = {
  number: null,
  loading: false,
  error: false,
};

const orderDetails = createSlice({
  name: "ORDER_DETAILS",
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.number = action.payload;
    },
    error(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.number = null;
    },
    remove(state) {
      state.number = null;
    },
  },
});

export const createOrder = (ingredientIds) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const response = await apiService.createOrder(ingredientIds);

    dispatch(createOrderSuccess(response));
  } catch (e) {
    dispatch(createOrderError(e));
  }
};

export const {
  request: createOrderRequest,
  success: createOrderSuccess,
  error: createOrderError,
  remove: removeOrderDetails,
} = orderDetails.actions;
export default orderDetails.reducer;
