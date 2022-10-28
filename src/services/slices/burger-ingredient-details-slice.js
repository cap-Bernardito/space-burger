import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: null,
};

const burgerIngredientDetails = createSlice({
  name: "BURGER_INGREDIENT_DETAILS",
  initialState,
  reducers: {
    add(state, action) {
      state.ingredient = action.payload;
    },
    remove(state) {
      state.ingredient = null;
    },
  },
});

export const { add: addIngredientDetails, remove: removeIngredientDetails } = burgerIngredientDetails.actions;
export default burgerIngredientDetails.reducer;
