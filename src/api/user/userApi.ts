import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const environment = import.meta.env;

export const USER_API_REDUCER_KEY = "userApi";

export const userApi = createApi({
  reducerPath: USER_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: environment.VITE_APP_BASE_URL,
    credentials: "include",
    prepareHeaders: headers => {
      headers.set("Content-type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: builder => ({
    signupUser: builder.mutation({
      query: (body: {
        email: string;
        name: string;
        password: string;
        phone: string;
      }) => {
        return {
          url: "user/signup",
          method: "post",
          body,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "user/signin",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useSignupUserMutation, useLoginUserMutation } = userApi;
