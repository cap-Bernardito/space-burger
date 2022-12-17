import { createAction, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import apiService from "services/api-service";
import { selectIngredientsDict } from "services/slices/burger-ingredients-slice";
import type { RootState } from "services/store";

export type TWSAllOrdersActions = {
  connect: typeof wsConnect;
  disconnect: typeof wsDisconnect;
  getSocketFn: typeof apiService.getWSAllOrders;
  wsOpenFn: typeof wsAllOnopen;
  wsCloseFn: typeof wsAllOnclose;
  wsSuccessFn: typeof wsAllOnmessage;
  wsErrorFn: typeof wsAllOneror;
};

export const initialState: TFeedOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: false,
};

const actionsBaseName = "WS_ORDERS_FEED";

const wsOrdersFeedSlice = createSlice({
  name: actionsBaseName,
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
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    error(state, action: PayloadAction<TFeedOrderState["error"]>) {
      (state.wsConnected = false), (state.error = action.payload);
    },
  },
});

export const wsConnect = createAction(`${actionsBaseName}/connect`);

export const wsDisconnect = createAction(`${actionsBaseName}/disconnect`);

export const selectWsOrdersFeed = (state: RootState) => state.wsOrdersFeed;

export const selectOrders = createSelector(selectIngredientsDict, selectWsOrdersFeed, (ingredientsDict, wsData) => {
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
      // NOTE: Set использован для удаления дубликатов
      { selectedIngredients: new Set<TIngredient>(), selectedIngredientsPrice: 0 }
    );

    resultOrders.orders.push({
      ...order,
      ingredients: [...selectedIngredients],
      total: selectedIngredientsPrice,
      counter,
    });
  }

  resultOrders.orders;

  return resultOrders;
});

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
  open: wsAllOnopen,
  close: wsAllOnclose,
  success: wsAllOnmessage,
  error: wsAllOneror,
} = wsOrdersFeedSlice.actions;

export default wsOrdersFeedSlice.reducer;
