import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import userReducer from "./features/userSlice";
import { userApi } from "../api/user/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "./features/authSlice";

const environment = import.meta.env;

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: environment.VITE_APP_MODE === "development",
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
