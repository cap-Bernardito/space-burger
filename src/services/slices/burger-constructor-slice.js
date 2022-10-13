import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buns: [],
  ingredients: [],
  total: 0,
};

const burgerConstructorSlice = createSlice({
  name: "BURGER_CONSTRUCTOR",
  initialState,
  reducers: {
    addBun(state, action) {
      state.buns = [
        { ...action.payload, name: `${action.payload.name} (верх)` },
        { ...action.payload, name: `${action.payload.name} (низ)` },
      ];
      state.total = calculate(state);
    },
    addIngredient(state, action) {
      state.ingredients.push({ ...action.payload, key: uuidv4() });
      state.total = calculate(state);
    },
  },
});

function calculate(state) {
  return [...state.buns, ...state.ingredients].reduce((acc, { price }) => (acc += price), 0);
}

export const { addBun, addIngredient } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
