import { createSelector, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "services/store";

type TBurgerConstructorState = {
  buns: [TIngredient, TIngredient] | [];
  ingredients: TIngredientWithKey[];
};

const initialState: TBurgerConstructorState = {
  buns: [],
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "BURGER_CONSTRUCTOR",
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      state.buns = [
        { ...action.payload, name: `${action.payload.name} (верх)` },
        { ...action.payload, name: `${action.payload.name} (низ)` },
      ];
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredientWithKey>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (data: TIngredient) => {
        return { payload: { ...data, key: nanoid() } };
      },
    },
    removeIngredient(state, action: PayloadAction<TIngredientWithKey>) {
      state.ingredients = state.ingredients.filter((item) => item.key !== action.payload.key);
    },
    setIngredients(state, action: PayloadAction<TBurgerConstructorState["ingredients"]>) {
      state.ingredients = action.payload;
    },
    resetStore(state) {
      state.buns = initialState.buns;
      state.ingredients = initialState.ingredients;
    },
  },
});

export const selectBuns = (state: RootState) => state.burgerConstructor.buns;

export const selectIngredients = (state: RootState) => state.burgerConstructor.ingredients;

export const selectTotalPrice = createSelector(selectBuns, selectIngredients, (buns, ingredients) =>
  [...buns, ...ingredients].reduce((acc, { price }) => (acc += price), 0)
);

export const selectCounters = createSelector(selectBuns, selectIngredients, (buns, ingredients) => {
  const counters: Record<TIngredient["_id"], number> = {};

  [...buns, ...ingredients].forEach((ingredient) => {
    if (!(ingredient._id in counters)) {
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
