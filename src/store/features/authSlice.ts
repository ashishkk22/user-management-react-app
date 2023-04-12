import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
  reducers: {
    addAuth: state => {
      state.isAuth = true;
    },
    removeAuth: state => {
      state.isAuth = false;
    },
  },
});

export default AuthSlice.reducer;
export const { addAuth, removeAuth } = AuthSlice.actions;
