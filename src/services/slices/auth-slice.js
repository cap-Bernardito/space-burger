import { createSlice } from "@reduxjs/toolkit";

import apiService from "services/api-service";
import { AUTH_STATUS } from "utils/constants";

const initialState = {
  user: null,
  loading: false,
  error: false,
  status: AUTH_STATUS.pending,
};

const userGet = createSlice({
  name: "AUTH",
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    error(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
    status(state, action) {
      state.status = action.payload;
    },
  },
});

export const auth = () => async (dispatch) => {
  dispatch(setRequest());
  dispatch(setError(false));

  try {
    const response = await apiService.getUser();

    dispatch(setSuccess(response));
    dispatch(setStatus(AUTH_STATUS.ok));
  } catch (e) {
    dispatch(setError(e.message));
    dispatch(setStatus(AUTH_STATUS.no));
  }
};

export const login = (userInfo) => async (dispatch) => {
  dispatch(setRequest());
  dispatch(setError(false));

  try {
    const response = await apiService.createAccessToken(userInfo);

    dispatch(setSuccess(response));
    dispatch(setStatus(AUTH_STATUS.ok));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setRequest());
  dispatch(setError(false));

  try {
    await apiService.deleteAccessToken();

    dispatch(setSuccess({ user: null }));
    dispatch(setStatus(AUTH_STATUS.no));
  } catch (e) {
    dispatch(setError(e.message));
    dispatch(setStatus(AUTH_STATUS.no));
  }
};

export const register = (userInfo) => async (dispatch) => {
  dispatch(setRequest());
  dispatch(setError(false));

  try {
    const response = await apiService.createUser(userInfo);

    dispatch(setSuccess(response));
    dispatch(setStatus(AUTH_STATUS.ok));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const updateUser = (user) => async (dispatch) => {
  dispatch(setRequest());
  dispatch(setError(false));

  try {
    const response = await apiService.updateUser(user);

    dispatch(setSuccess(response));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const selectAuth = (state) => state.auth;

export const { request: setRequest, success: setSuccess, error: setError, status: setStatus } = userGet.actions;
export default userGet.reducer;
