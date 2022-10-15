import apiService from "../api-service";
import { createSlice } from "@reduxjs/toolkit";

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
      (state.loading = false), (state.error = action.payload);
    },
    removeOrderDetails(state) {
      state.number = null;
    },
  },
});

export const createOrder = (ingredientIds) => async (dispatch) => {
  dispatch(request());
  try {
    const response = await apiService.createOrder(ingredientIds);

    dispatch(success(response));
  } catch (e) {
    dispatch(error(e));
  }
};

export const { removeOrderDetails, request, success, error } = orderDetails.actions;
export default orderDetails.reducer;
