import { createSlice } from "@reduxjs/toolkit";

import apiService from "services/api-service";

const initialState = {
  user: null,
  loading: false,
  error: false,
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
  },
});

export const auth = () => async (dispatch) => {
  dispatch(setRequest());
  try {
    const response = await apiService.getUser();

    dispatch(setSuccess(response));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const login = (userInfo) => async (dispatch) => {
  dispatch(setRequest());
  try {
    const response = await apiService.createAccessToken(userInfo);

    dispatch(setSuccess(response));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setRequest());
  try {
    await apiService.deleteAccessToken();

    dispatch(setSuccess({ user: null }));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const register = (userInfo) => async (dispatch) => {
  dispatch(setRequest());
  try {
    const response = await apiService.createUser(userInfo);

    dispatch(setSuccess(response));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const updateUser = (user) => async (dispatch) => {
  dispatch(setRequest());
  try {
    const response = await apiService.updateUser(user);

    dispatch(setSuccess(response));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const selectAuth = (state) => state.auth;

export const { request: setRequest, success: setSuccess, error: setError } = userGet.actions;
export default userGet.reducer;
