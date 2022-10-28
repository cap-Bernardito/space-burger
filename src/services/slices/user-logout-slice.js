import { createSlice } from "@reduxjs/toolkit";

import apiService from "services/api-service";

const initialState = {
  response: null,
  loading: false,
  error: false,
};

const userLogout = createSlice({
  name: "USER_LOGOUT",
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success(state, action) {
      state.loading = false;
      state.response = action.payload;
    },
    error(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.response = null;
    },
  },
});

export const logout = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    const response = await apiService.deleteAccessToken();

    dispatch(logoutSuccess(response));
  } catch (e) {
    dispatch(logoutError(e.message));
  }
};

export const { request: logoutRequest, success: logoutSuccess, error: logoutError } = userLogout.actions;
export default userLogout.reducer;
