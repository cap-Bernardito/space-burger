import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: null,
};

const burgerIngredientDetails = createSlice({
  name: "BURGER_INGREDIENT_DETAILS",
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

export const { addIngredient, removeIngredient } = burgerIngredientDetails.actions;
export default burgerIngredientDetails.reducer;
