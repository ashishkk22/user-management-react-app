import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";
import { userResponse } from "../../types/userResponse.types";

export const USER_API_REDUCER_KEY = "userApi";

export const userApi = createApi({
  reducerPath: USER_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: headers => {
      headers.set("Content-type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: builder => ({
    signupUser: builder.mutation<
      userResponse,
      {
        email: string;
        name: string;
        password: string;
        phone: string;
        img: string;
      }
    >({
      query: (body: {
        email: string;
        name: string;
        password: string;
        phone: string;
        img: string;
      }) => {
        return {
          url: "user/signup",
          method: "post",
          body,
        };
      },
    }),
    loginUser: builder.mutation<
      userResponse,
      { email: string; password: string }
    >({
      query: (body: { email: string; password: string }) => {
        return {
          url: "user/signin",
          method: "post",
          body,
        };
      },
    }),
    auth: builder.mutation<userResponse, void>({
      query: () => {
        return {
          url: "user/isAuth",
          method: "get",
        };
      },
    }),
    logout: builder.mutation<userResponse, void>({
      query: () => {
        return {
          url: "user/logout",
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useAuthMutation,
  useLogoutMutation,
} = userApi;
