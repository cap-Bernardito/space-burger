import { createSlice } from "@reduxjs/toolkit";

import apiService from "../api-service";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

const userGet = createSlice({
  name: "USER_GET",
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

export const getUser = () => async (dispatch) => {
  dispatch(request());
  try {
    const response = await apiService.getUser();

    dispatch(success(response));
  } catch (e) {
    dispatch(error(e.message));
  }
};

export const { request, success, error } = userGet.actions;
export default userGet.reducer;
