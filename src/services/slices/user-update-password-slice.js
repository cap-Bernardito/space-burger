import { createSlice } from "@reduxjs/toolkit";

import apiService from "../api-service";

const initialState = {
  response: null,
  loading: false,
  error: false,
};

const userUpdatePassword = createSlice({
  name: "USER_UPDATE_PASSWORD",
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

export const updatePassword = (userInfo) => async (dispatch) => {
  dispatch(request());
  try {
    const response = await apiService.updateUserPassword(userInfo);

    dispatch(success(response));
  } catch (e) {
    dispatch(error(e.message));
  }
};

export const { request, success, error } = userUpdatePassword.actions;
export default userUpdatePassword.reducer;
