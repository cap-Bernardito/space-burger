import { createSlice } from "@reduxjs/toolkit";

import apiService from "../api-service";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

const userUpdate = createSlice({
  name: "USER_UPDATE",
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    success: {
      reducer: (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      },
      prepare: (data) => {
        return { payload: { ...data, user: { password: "", ...data.user } } };
      },
    },
    error(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
  },
});

export const updateUser = (user) => async (dispatch) => {
  dispatch(updateUserRequest());
  try {
    const response = await apiService.updateUser(user);

    dispatch(updateUserSuccess(response));
  } catch (e) {
    dispatch(updateUserError(e.message));
  }
};

export const { request: updateUserRequest, success: updateUserSuccess, error: updateUserError } = userUpdate.actions;
export default userUpdate.reducer;
