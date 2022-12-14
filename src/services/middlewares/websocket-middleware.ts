import { Middleware } from "redux";

import apiService from "services/api-service";
import { TWSPrivateOrdersActions } from "services/slices/ws-orders-feed-private-slice";
import { TWSAllOrdersActions } from "services/slices/ws-orders-feed-slice";
import { RootState } from "services/store";
import { WS_INVALID_TOKEN_MESSAGE } from "utils/constants";
import { getErrorMessage, isSuccessResponseData } from "utils/utils";

type TWSActions = TWSAllOrdersActions | TWSPrivateOrdersActions;

export const createWebsocketMiddleware =
  (wsActions: TWSActions): Middleware<unknown, RootState> =>
  (store) => {
    let socket: WebSocket | null = null;
    let isConnected = true;
    let reconnectTimer = 0;

    return (next) => async (action) => {
      const { dispatch } = store;
      const { connect, disconnect, getSocketFn, wsOpenFn, wsCloseFn, wsSuccessFn, wsErrorFn } = wsActions;

      if (connect.match(action)) {
        socket = getSocketFn();
        clearTimeout(reconnectTimer);
        isConnected = true;
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpenFn());
        };

        socket.onmessage = async (event: MessageEvent<string>) => {
          const { data } = event;

          if (socket && data === "ping") {
            socket.send("pong");

            return;
          }

          const parsedData: TWSResponseSuccessOrdersFeed | TResponseCommonFalsed = JSON.parse(data);

          if (isSuccessResponseData<TWSResponseSuccessOrdersFeed, TResponseCommonFalsed>(parsedData)) {
            dispatch(wsSuccessFn(parsedData));

            return;
          }

          if (socket && parsedData.message.toLowerCase() === WS_INVALID_TOKEN_MESSAGE) {
            try {
              await apiService.updateAccessToken();
            } catch (e) {
              dispatch(wsErrorFn(getErrorMessage(e)));
            }

            socket.close(1000, WS_INVALID_TOKEN_MESSAGE);
          }
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch(wsCloseFn());

          if (event.wasClean && event.reason === WS_INVALID_TOKEN_MESSAGE) {
            dispatch(connect());
          }

          if (isConnected) {
            reconnectTimer = window.setInterval(() => {
              dispatch(connect());
            }, 3000);
          }
        };

        socket.onerror = (event: Event & { message?: string }) => {
          const errorMessage = typeof event.message === "string" ? event.message : "???????????? websocket";

          dispatch(wsErrorFn(errorMessage));
        };

        if (disconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
        }
      }

      next(action);
    };
  };
