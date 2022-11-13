import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";

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
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
    resetStore(state) {
      state.buns = initialState.buns;
      state.ingredients = initialState.ingredients;
    },
  },
});

export const selectBuns = (state) => state.burgerConstructor.buns;
export const selectIngredients = (state) => state.burgerConstructor.ingredients;

export const selectTotalPrice = createSelector(selectBuns, selectIngredients, (buns, ingredients) =>
  [...buns, ...ingredients].reduce((acc, { price }) => (acc += price), 0)
);

export const selectCounters = createSelector(selectBuns, selectIngredients, (buns, ingredients) => {
  const counters = {};

  [...buns, ...ingredients].forEach((ingredient) => {
    if (!counters[ingredient._id]) {
      counters[ingredient._id] = 0;
    }

    counters[ingredient._id] += 1;
  });

  return counters;
});

export const {
  addBun: addBunInBurgerConstructor,
  addIngredient: addIngredientInBurgerConstructor,
  removeIngredient: removeIngredientInBurgerConstructor,
  setIngredients: setIngredientsInBurgerConstructor,
  resetStore: resetIngredientInBurgerConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
