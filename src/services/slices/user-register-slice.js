import { createSlice } from "@reduxjs/toolkit";

import apiService from "../api-service";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

const userRegister = createSlice({
  name: "USER_REGISTER",
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

export const register = (userInfo) => async (dispatch) => {
  dispatch(request());
  try {
    const response = await apiService.createUser(userInfo);

    dispatch(success(response));
  } catch (e) {
    dispatch(error(e.message));
  }
};

export const { request, success, error } = userRegister.actions;
export default userRegister.reducer;
