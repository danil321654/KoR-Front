import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthResponse } from '~/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
    credentials: 'include',
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    checkAuth: builder.query<AuthResponse, void>({
      query: () => ({
        url: '/checkAuth',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),
    login: builder.mutation<AuthResponse, string>({
      query: (token) => ({
        url: token ? '/login' : '/checkAuth',
        method: 'GET',
        headers: { authorization: token },
      }),
      invalidatesTags: ['auth'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'DELETE',
      }),
      invalidatesTags: ['auth'],
    }),
  }),
})

export const { useCheckAuthQuery, useLoginMutation, useLogoutMutation } =
  authApi
