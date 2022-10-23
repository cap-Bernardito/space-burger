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
    increaseIngredientCount(state, action) {
      state.data = state.data.map((item) =>
        item._id === action.payload._id ? { ...item, count: item.count + 1 } : item
      );
    },
    decreaseIngredientCount(state, action) {
      state.data = state.data.map((item) =>
        item._id === action.payload._id ? { ...item, count: Math.max(item.count - 1, 0) } : item
      );
    },
    increaseBunCount(state, action) {
      state.data = state.data.map((item) => {
        if (item.type !== "bun") {
          return item;
        }

        return item._id === action.payload._id ? { ...item, count: 2 } : { ...item, count: 0 };
      });
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
