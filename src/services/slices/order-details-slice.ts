import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import apiService from "services/api-service";
import type { AppDispatch } from "services/store";
import { getErrorMessage } from "utils/utils";

import { resetIngredientInBurgerConstructor } from "./burger-constructor-slice";

type TOrderState = {
  number: number | null;
  loading: TLoadingInState;
  error: TErrorInState;
};

const initialState: TOrderState = {
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
      state.error = false;
    },
    success(state, action: PayloadAction<TOrderState["number"]>) {
      state.loading = false;
      state.number = action.payload;
    },
    error(state, action: PayloadAction<TOrderState["error"]>) {
      state.loading = false;
      state.error = action.payload;
      state.number = null;
    },
    remove(state) {
      state.number = null;
    },
  },
});

export const createOrder = (ingredientIds: TOrderCreateIngredientsIds) => async (dispatch: AppDispatch) => {
  dispatch(setRequest());
  try {
    const response = await apiService.createOrder(ingredientIds);

    dispatch(setSuccess(response));
    dispatch(resetIngredientInBurgerConstructor());
  } catch (e) {
    dispatch(setError(getErrorMessage(e)));
  }
};

export const {
  request: setRequest,
  success: setSuccess,
  error: setError,
  remove: removeOrderDetails,
} = orderDetails.actions;

export default orderDetails.reducer;
