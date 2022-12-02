import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import apiService from "services/api-service";
import type { AppDispatch, RootState } from "services/store";
import { EAuthStatus } from "utils/constants";
import { getErrorMessage } from "utils/utils";

type TAuthState = {
  user: Pick<TUser, "name" | "email"> | null;
  loading: TLoadingInState;
  error: TErrorInState;
  status: EAuthStatus;
};

const initialState: TAuthState = {
  user: null,
  loading: false,
  error: false,
  status: EAuthStatus.pending,
};

const userGet = createSlice({
  name: "AUTH",
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
      state.error = false;
    },
    success(state, action: PayloadAction<TResponseSuccessUser | { user: null }>) {
      state.loading = false;
      state.user = action.payload.user;
    },
    error(state, action: PayloadAction<TAuthState["error"]>) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
    status(state, action: PayloadAction<TAuthState["status"]>) {
      state.status = action.payload;
    },
  },
});

export const auth = () => async (dispatch: AppDispatch) => {
  dispatch(setRequest());

  try {
    const response = await apiService.getUser();

    dispatch(setSuccess(response));
    dispatch(setStatus(EAuthStatus.ok));
  } catch (e) {
    dispatch(setError(getErrorMessage(e)));
    dispatch(setStatus(EAuthStatus.no));
  }
};

export const login = (userInfo: TRequestBodyATCreate) => async (dispatch: AppDispatch) => {
  dispatch(setRequest());

  try {
    const response = await apiService.createAccessToken(userInfo);

    dispatch(setSuccess(response));
    dispatch(setStatus(EAuthStatus.ok));
  } catch (e) {
    dispatch(setError(getErrorMessage(e)));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(setRequest());

  try {
    await apiService.deleteAccessToken();

    dispatch(setSuccess({ user: null }));
    dispatch(setStatus(EAuthStatus.no));
  } catch (e) {
    dispatch(setError(getErrorMessage(e)));
    dispatch(setStatus(EAuthStatus.no));
  }
};

export const register = (userInfo: TUser) => async (dispatch: AppDispatch) => {
  dispatch(setRequest());

  try {
    const response = await apiService.createUser(userInfo);

    dispatch(setSuccess(response));
    dispatch(setStatus(EAuthStatus.ok));
  } catch (e) {
    dispatch(setError(getErrorMessage(e)));
  }
};

export const updateUser = (user: TRequestBodyUserUpdate) => async (dispatch: AppDispatch) => {
  dispatch(setRequest());

  try {
    const response = await apiService.updateUser(user);

    dispatch(setSuccess(response));
  } catch (e) {
    dispatch(setError(getErrorMessage(e)));
  }
};

export const selectAuth = (state: RootState) => state.auth;

export const { request: setRequest, success: setSuccess, error: setError, status: setStatus } = userGet.actions;
export default userGet.reducer;
