import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserInfo = {
  name: string;
  email: string;
  phoneNo: string;
};

//initialValue of the user slice
const initialState: UserInfo = {
  name: "",
  email: "",
  phoneNo: "",
};

export const PersonSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNo = action.payload.phoneNo;
    },
    removeUser: state => {
      // state = initialState;
      state.email = "";
      state.name = "";
      state.phoneNo = "";
    },
  },
});

export default PersonSlice.reducer;
export const { setUser, removeUser } = PersonSlice.actions;
