import { createAction, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import apiService from "services/api-service";
import { selectIngredientsDict } from "services/slices/burger-ingredients-slice";
import type { RootState } from "services/store";

export type TWSPrivateOrdersActions = {
  connect: typeof wsPrivateConnect;
  disconnect: typeof wsPrivateDisconnect;
  getSocketFn: typeof apiService.getWSAllOrders;
  wsOpenFn: typeof wsPrivateOnopen;
  wsCloseFn: typeof wsPrivateOnclose;
  wsSuccessFn: typeof wsPrivateOnmessage;
  wsErrorFn: typeof wsPrivateOnerror;
};

export const initialState: TFeedOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: false,
};

const actionsBaseName = "WS_ORDERS_FEED_PRIVATE";

const wsOrdersFeedPrivateSlice = createSlice({
  name: actionsBaseName,
  initialState,
  reducers: {
    open(state) {
      state.wsConnected = true;
      state.error = false;
    },
    close(state) {
      state.wsConnected = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    success(state, action: PayloadAction<Omit<TWSResponseSuccessOrdersFeed, "success">>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    error(state, action: PayloadAction<TFeedOrderState["error"]>) {
      (state.wsConnected = false), (state.error = action.payload);
    },
  },
});

export const wsPrivateConnect = createAction(`${actionsBaseName}/connect`);

export const wsPrivateDisconnect = createAction(`${actionsBaseName}/disconnect`);

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

export const selectOrderPrivate = (id: TFeedItem["_id"]) =>
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
  open: wsPrivateOnopen,
  close: wsPrivateOnclose,
  success: wsPrivateOnmessage,
  error: wsPrivateOnerror,
} = wsOrdersFeedPrivateSlice.actions;

export default wsOrdersFeedPrivateSlice.reducer;
