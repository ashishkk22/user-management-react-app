import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/user/userApi";

type Auth = {
  isAuth: boolean;
};

//initialValue of the auth slice
const initialState: Auth = {
  isAuth: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.auth.matchFulfilled, state => {
        state.isAuth = true;
      })
      .addMatcher(userApi.endpoints.loginUser.matchFulfilled, state => {
        state.isAuth = true;
      })
      .addMatcher(userApi.endpoints.signupUser.matchFulfilled, state => {
        state.isAuth = true;
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, state => {
        state.isAuth = false;
      });
  },
});

export default AuthSlice.reducer;
