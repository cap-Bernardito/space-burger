import { createSlice } from "@reduxjs/toolkit";

import apiService from "../api-service";

const initialState = {
  response: null,
  loading: false,
  error: false,
};

const userResetPassword = createSlice({
  name: "USER_RESET_PASSWORD",
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

export const resetPassword = (userInfo) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const response = await apiService.resetUserPassword(userInfo);

    dispatch(resetPasswordSuccess(response));
  } catch (e) {
    dispatch(resetPasswordError(e.message));
  }
};

export const {
  request: resetPasswordRequest,
  success: resetPasswordSuccess,
  error: resetPasswordError,
} = userResetPassword.actions;
export default userResetPassword.reducer;
