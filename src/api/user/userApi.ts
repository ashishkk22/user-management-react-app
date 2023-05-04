import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  img: string;
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  role: string;
  activated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Response = {
  message: string;
  user: User;
};

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
    signupUser: builder.mutation<
      Response,
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
    loginUser: builder.mutation<Response, { email: string; password: string }>({
      query: (body: { email: string; password: string }) => {
        return {
          url: "user/signin",
          method: "post",
          body,
        };
      },
    }),
    auth: builder.mutation<Response, void>({
      query: () => {
        return {
          url: "user/isAuth",
          method: "get",
        };
      },
    }),
    logout: builder.mutation<Response, void>({
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
