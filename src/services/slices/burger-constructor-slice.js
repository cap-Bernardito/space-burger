import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  buns: [],
  ingredients: [],
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
    },
    addIngredient: {
      reducer: (state, action) => {
        state.ingredients.push(action.payload);
      },
      prepare: (data) => {
        return { payload: { ...data, key: nanoid() } };
      },
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter((item) => item.key !== action.payload.key);
    },
    moveIngredient(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      const cloneIngredients = [...state.ingredients];

      [cloneIngredients[dragIndex], cloneIngredients[hoverIndex]] = [
        cloneIngredients[hoverIndex],
        cloneIngredients[dragIndex],
      ];

      state.ingredients = cloneIngredients;
    },
  },
});

export const { addBun, addIngredient, removeIngredient, moveIngredient } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
