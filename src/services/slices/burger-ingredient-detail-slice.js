import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: null,
};

const burgerIngredientDetail = createSlice({
  name: "INGREDIENT_DETAIL",
  initialState,
  reducers: {
    addIngredient(state, action) {
      state.ingredient = action.payload;
    },
    removeIngredient(state) {
      state.ingredient = null;
    },
  },
});

export const { addIngredient, removeIngredient } = burgerIngredientDetail.actions;
export default burgerIngredientDetail.reducer;
