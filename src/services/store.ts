import { configureStore } from "@reduxjs/toolkit";

import apiService from "services/api-service";
import { createWsOrdersFeedMiddleware } from "services/middlewares/ws-orders-feed-middleware";
import { rootReducer } from "services/reducers";
import {
  wsPrivateConnect,
  wsPrivateDisconnect,
  wsPrivateOnclose,
  wsPrivateOnerror,
  wsPrivateOnmessage,
  wsPrivateOnopen,
} from "services/slices/ws-orders-feed-private-slice";
import {
  wsAllOnclose,
  wsAllOneror,
  wsAllOnmessage,
  wsAllOnopen,
  wsConnect,
  wsDisconnect,
} from "services/slices/ws-orders-feed-slice";

const wsOrdersFeedMiddleware = createWsOrdersFeedMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  getSocketFn: apiService.getWSAllOrders,
  wsOpenFn: wsAllOnopen,
  wsCloseFn: wsAllOnclose,
  wsSuccessFn: wsAllOnmessage,
  wsErrorFn: wsAllOneror,
});

const wsOrdersPrivateFeedMiddleware = createWsOrdersFeedMiddleware({
  connect: wsPrivateConnect,
  disconnect: wsPrivateDisconnect,
  getSocketFn: apiService.getWSPrivateOrders,
  wsOpenFn: wsPrivateOnopen,
  wsCloseFn: wsPrivateOnclose,
  wsSuccessFn: wsPrivateOnmessage,
  wsErrorFn: wsPrivateOnerror,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsOrdersFeedMiddleware, wsOrdersPrivateFeedMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
