import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import apiService from "services/api-service";
import type { AppDispatch, RootState } from "services/store";
import { createIngredientsDict, getErrorMessage } from "utils/utils";

type TBurgerIngredientsState = {
  data: TIngredient[] | null;
  loading: TLoadingInState;
  error: TErrorInState;
};

const initialState: TBurgerIngredientsState = {
  data: null,
  loading: false,
  error: false,
};

const burgerIngredientsSlice = createSlice({
  name: "BURGER_INGREDIENTS",
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
      state.error = false;
    },
    success(state, action: PayloadAction<TBurgerIngredientsState["data"]>) {
      state.loading = false;
      state.data = action.payload;
    },
    error(state, action: PayloadAction<TBurgerIngredientsState["error"]>) {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const getBurgerIngredients = () => async (dispatch: AppDispatch) => {
  dispatch(getBurgerIngredientsRequest());
  try {
    const response = await apiService.getBurgerIngredients();

    dispatch(getBurgerIngredientsSuccess(response));
  } catch (e) {
    dispatch(getBurgerIngredientsError(getErrorMessage(e)));
  }
};

export const selectIngredients = (state: RootState) => state.burgerIngredients;

export const selectIngredientsDict = createSelector(selectIngredients, (items) => {
  if (!items.data) {
    return null;
  }

  return createIngredientsDict(items.data);
});

export const selectIngredient = (id: TIngredient["_id"]) =>
  createSelector(selectIngredients, (ingredients): [TIngredient | undefined, string | false] => {
    let result: TIngredient | undefined;
    let statusMessage: string | false = "Получение данных ингредиента...";

    if (ingredients.data) {
      [result] = ingredients.data.filter(({ _id }) => _id === id);
      statusMessage = !result && `Ингредиент с id "${id}" не найден`;
    }

    return [result, statusMessage];
  });

export const {
  request: getBurgerIngredientsRequest,
  success: getBurgerIngredientsSuccess,
  error: getBurgerIngredientsError,
} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
