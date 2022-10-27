import { createSlice } from "@reduxjs/toolkit";

import apiService from "../api-service";

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
  dispatch(request());
  try {
    const response = await apiService.getBurgerIngredients();

    dispatch(success(response));
  } catch (e) {
    dispatch(error(e));
  }
};

export const { request, success, error, increaseIngredientCount, decreaseIngredientCount, increaseBunCount } =
  burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
