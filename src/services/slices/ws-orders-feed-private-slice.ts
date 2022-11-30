import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import apiService from "services/api-service";
import { selectIngredientsDict } from "services/slices/burger-ingredients-slice";
import { wsController } from "services/ws-driver";

import type { RootState } from "../../index";

const initialState: TFeedOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: false,
};

const wsOrdersFeedPrivateSlice = createSlice({
  name: "WS_ORDERS_FEED_PRIVATE",
  initialState,
  reducers: {
    open(state) {
      state.wsConnected = true;
      state.error = false;
    },
    close(state) {
      state.wsConnected = false;
    },
    success(state, action: PayloadAction<Omit<TWSResponseSuccessOrdersFeed, "success">>) {
      state.wsConnected = true;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    error(state, action: PayloadAction<TFeedOrderState["error"]>) {
      (state.wsConnected = false), (state.error = action.payload);
    },
  },
});

export const selectWsOrdersFeedPrivate = (state: RootState) => state.wsOrdersFeedPrivate;

export const selectOrders = createSelector(
  selectIngredientsDict,
  selectWsOrdersFeedPrivate,
  (ingredientsDict, wsData) => {
    if (!ingredientsDict || !wsData.orders) {
      return null;
    }

    const resultOrders: TFeed = {
      orders: [],
      total: wsData.total,
      totalToday: wsData.totalToday,
    };

    for (const order of wsData.orders) {
      const counter: TFeedItem["counter"] = {};

      const { selectedIngredients, selectedIngredientsPrice } = order.ingredients.reduce(
        (acc: { selectedIngredients: Set<TIngredient>; selectedIngredientsPrice: number }, id) => {
          const item = ingredientsDict.get(id);

          if (item) {
            item._id in counter ? (counter[item._id] += 1) : (counter[item._id] = 1);
            acc.selectedIngredients.add(item);
            acc.selectedIngredientsPrice += Number(item.price);
          }

          return acc;
        },
        // NOTE: Set использован для удаления дубликата булки
        { selectedIngredients: new Set<TIngredient>(), selectedIngredientsPrice: 0 }
      );

      resultOrders.orders.push({
        ...order,
        ingredients: [...selectedIngredients],
        total: selectedIngredientsPrice,
        counter,
      });
    }

    resultOrders.orders.reverse();

    return resultOrders;
  }
);

export const selectOrder = (id: TFeedItem["_id"]) =>
  createSelector(selectOrders, (orders): [TFeedItem | undefined, string | false] => {
    let result: TFeedItem | undefined;
    let statusMessage: string | false = "Получение данных заказа...";

    if (orders === null) {
      return [result, statusMessage];
    }

    if (orders.orders) {
      [result] = orders.orders.filter(({ _id }) => _id === id);
      statusMessage = !result && `Заказ с id "${id}" не найден`;
    }

    return [result, statusMessage];
  });

export const {
  open: wsPrivateOpen,
  close: wsPrivateClose,
  success: wsPrivateSuccess,
  error: wsPrivateError,
} = wsOrdersFeedPrivateSlice.actions;

export const wsOrdersFeedPrivate = wsController({
  getSocketFn: apiService.getWSUserOrders,
  wsOpenFn: wsPrivateOpen,
  wsCloseFn: wsPrivateClose,
  wsSuccessFn: wsPrivateSuccess,
  wsErrorFn: wsPrivateError,
});

export default wsOrdersFeedPrivateSlice.reducer;
