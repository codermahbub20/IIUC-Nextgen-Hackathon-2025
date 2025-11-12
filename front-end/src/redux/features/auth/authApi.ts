import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "auth/change-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useChangePasswordMutation } = authApi;