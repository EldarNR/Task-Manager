// libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// config
import { BASE_URL } from 'store/services/config';
// types
import type { Task } from 'types/types';
import type { ProfileDetails } from 'store/services/user/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<ProfileDetails, number>({
      query: (id: number) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    getAllUsers: builder.query<ProfileDetails[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<ProfileDetails, Partial<ProfileDetails> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }, 'User'],
    }),
    changeUserPassword: builder.mutation<ProfileDetails, { id: number, password: string }>({
      query: ({ id, password }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: { password },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }, 'User'],
    }),
    getUserTasks: builder.query<Task[], number>({
      query: (userId) => `tasks?assignee=${userId}`,
    }),
  }),
});

export const {
  useGetUserQuery, useGetAllUsersQuery, useUpdateUserMutation, useChangeUserPasswordMutation, useGetUserTasksQuery,
} = userApi;
