import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/user/userApi";

type UserInfo = {
  name: string;
  email: string;
  phoneNo: string;
  img: string;
};

//initialValue of the user slice
const initialState: UserInfo = {
  name: "",
  email: "",
  phoneNo: "",
  img: "",
};

export const PersonSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        userApi.endpoints.signupUser.matchFulfilled,
        (state, { payload }) => {
          state.name = payload.user.name;
          state.email = payload.user.email;
          state.phoneNo = payload.user.phoneNo;
          state.img = payload.user.img;
        }
      )
      .addMatcher(
        userApi.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          state.name = payload.user.name;
          state.email = payload.user.email;
          state.phoneNo = payload.user.phoneNo;
          state.img = payload.user.img;
        }
      )
      .addMatcher(
        userApi.endpoints.auth.matchFulfilled,
        (state, { payload }) => {
          state.name = payload.user.name;
          state.email = payload.user.email;
          state.phoneNo = payload.user.phoneNo;
          state.img = payload.user.img;
        }
      )
      .addMatcher(userApi.endpoints.logout.matchFulfilled, state => {
        state.name = "";
        state.email = "";
        state.phoneNo = "";
        state.img = "";
      });
  },
});

export default PersonSlice.reducer;
