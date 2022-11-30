import apiService from "services/api-service";
import {
  wsPrivateClose,
  wsPrivateError,
  wsPrivateOpen,
  wsPrivateSuccess,
} from "services/slices/ws-orders-feed-private-slice";
import { WS_INVALID_TOKEN_MESSAGE } from "utils/constants";
import { getErrorMessage, isSuccessResponseData } from "utils/utils";

import type { AppDispatch } from "../index";

type WSDriverProps = {
  getSocketFn: typeof apiService.getWSUserOrders | typeof apiService.getWSAllOrders;
  wsOpenFn: typeof wsPrivateOpen;
  wsCloseFn: typeof wsPrivateClose;
  wsSuccessFn: typeof wsPrivateSuccess;
  wsErrorFn: typeof wsPrivateError;
};

type wsController = ({
  getSocketFn,
  wsOpenFn,
  wsCloseFn,
  wsSuccessFn,
  wsErrorFn,
}: WSDriverProps) => () => (dispatch: AppDispatch) => void;

export const wsController: wsController =
  ({ getSocketFn, wsOpenFn, wsCloseFn, wsSuccessFn, wsErrorFn }) =>
  () =>
  async (dispatch: AppDispatch) => {
    try {
      const socket = getSocketFn();

      socket.onopen = () => {
        dispatch(wsOpenFn());
      };

      socket.onmessage = async (event: MessageEvent<string>) => {
        const { data } = event;

        if (data === "ping") {
          socket.send("pong");

          return;
        }

        const parsedData: TWSResponseSuccessOrdersFeed | TResponseCommonFalsed = JSON.parse(data);

        if (isSuccessResponseData<TWSResponseSuccessOrdersFeed, TResponseCommonFalsed>(parsedData)) {
          dispatch(wsSuccessFn(parsedData));

          return;
        }

        if (parsedData.message.toLowerCase() === WS_INVALID_TOKEN_MESSAGE) {
          await apiService.updateAccessToken();
          socket.close(1000, WS_INVALID_TOKEN_MESSAGE);
        }
      };

      socket.onclose = (event: CloseEvent) => {
        dispatch(wsCloseFn());

        if (event.wasClean && event.reason === WS_INVALID_TOKEN_MESSAGE) {
          const wsRestart = wsController({ getSocketFn, wsOpenFn, wsCloseFn, wsSuccessFn, wsErrorFn });

          dispatch(wsRestart());
        }
      };

      socket.onerror = (event: Event & { message?: string }) => {
        const errorMessage = typeof event.message === "string" ? event.message : "Ошибка websocket";

        dispatch(wsErrorFn(errorMessage));
      };
    } catch (e) {
      dispatch(wsErrorFn(getErrorMessage(e)));
    }
  };
