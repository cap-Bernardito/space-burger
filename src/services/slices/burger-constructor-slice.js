import { createSlice, nanoid } from "@reduxjs/toolkit";

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
    addIngredient: {
      reducer: (state, action) => {
        state.ingredients.push(action.payload);
        state.total = calculate(state);
      },
      prepare: (data) => {
        return { payload: { ...data, key: nanoid() } };
      },
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter((item) => item.key !== action.payload.key);
      state.total = calculate(state);
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

function calculate(state) {
  return [...state.buns, ...state.ingredients].reduce((acc, { price }) => (acc += price), 0);
}

export const { addBun, addIngredient, removeIngredient, moveIngredient } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
