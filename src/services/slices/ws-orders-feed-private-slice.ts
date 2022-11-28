import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import apiService from "services/api-service";
import { WS_INVALID_TOKEN_MESSAGE } from "utils/constants";
import { getErrorMessage, isSuccessResponseData } from "utils/utils";

import type { AppDispatch, RootState } from "../../index";

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

export const wsOrdersFeedPrivate = () => async (dispatch: AppDispatch) => {
  try {
    const socket = apiService.getWSUserOrders();

    socket.onopen = () => {
      dispatch(wsPrivateOpen());
    };

    socket.onmessage = async (event: MessageEvent<string>) => {
      const { data } = event;

      if (data === "ping") {
        socket.send("pong");

        return;
      }

      const parsedData: TWSResponseSuccessOrdersFeed | TResponseCommonFalsed = JSON.parse(data);

      if (isSuccessResponseData<TWSResponseSuccessOrdersFeed, TResponseCommonFalsed>(parsedData)) {
        dispatch(wsPrivateSuccess(parsedData));

        return;
      }

      if (parsedData.message.toLowerCase() === WS_INVALID_TOKEN_MESSAGE) {
        await apiService.updateAccessToken();
        socket.close(1000, WS_INVALID_TOKEN_MESSAGE);
      }
    };

    socket.onclose = (event: CloseEvent) => {
      dispatch(wsPrivateClose());

      if (event.wasClean && event.reason === WS_INVALID_TOKEN_MESSAGE) {
        dispatch(wsOrdersFeedPrivate());
      }
    };

    socket.onerror = (event: Event & { message?: string }) => {
      const errorMessage = typeof event.message === "string" ? event.message : "Ошибка websocket";

      dispatch(wsPrivateError(errorMessage));
    };
  } catch (e) {
    dispatch(wsPrivateError(getErrorMessage(e)));
  }
};

export const selectWsOrdersFeedPrivate = (state: RootState) => state.wsOrdersFeedPrivate;

export const {
  open: wsPrivateOpen,
  close: wsPrivateClose,
  success: wsPrivateSuccess,
  error: wsPrivateError,
} = wsOrdersFeedPrivateSlice.actions;

export default wsOrdersFeedPrivateSlice.reducer;
