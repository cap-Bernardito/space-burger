import { createSlice } from "@reduxjs/toolkit";

import apiService from "services/api-service";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const burgerIngredientsSlice = createSlice({
  name: "BURGER_INGREDIENTS",
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    error(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const getBurgerIngredients = () => async (dispatch) => {
  dispatch(getBurgerIngredientsRequest());
  try {
    const response = await apiService.getBurgerIngredients();

    dispatch(getBurgerIngredientsSuccess(response));
  } catch (e) {
    dispatch(getBurgerIngredientsError(e));
  }
};

export const {
  request: getBurgerIngredientsRequest,
  success: getBurgerIngredientsSuccess,
  error: getBurgerIngredientsError,
} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
