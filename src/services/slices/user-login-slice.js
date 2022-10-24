import { createSlice } from "@reduxjs/toolkit";

import apiService from "../api-service";

const initialState = {
  response: null,
  loading: false,
  error: false,
};

const userLogin = createSlice({
  name: "USER_LOGIN",
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

export const login = (userInfo) => async (dispatch) => {
  dispatch(request());
  try {
    const response = await apiService.createAccessToken(userInfo);

    dispatch(success(response));
  } catch (e) {
    dispatch(error(e.message));
  }
};

export const { request, success, error } = userLogin.actions;
export default userLogin.reducer;