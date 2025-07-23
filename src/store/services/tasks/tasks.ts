// libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// config
import { BASE_URL } from 'store/services/config';
import { COMMENTS_LIST_TAG, FILES_LIST_TAG, TASKS_LIST_TAG } from 'store/services/tasks/config';
import type {
  AddCommentRequest,
  Comment,
  CreateTaskRequest, DeleteTaskResponse,
  TaskFile,
  TasksParams, UpdateStatusResponse,
  UpdateTaskRequest,
} from 'store/services/tasks/types';
// types
import type { Task } from 'types/types';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [
    'Tasks',
    'Comments',
    'Files',
  ],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], TasksParams>({
      query: ({ id }) => ({
        url: `/projects/${id}/tasks`,
        method: 'GET',
      }),
      providesTags: (result, error, { id }) => [{ type: 'Tasks', id: TASKS_LIST_TAG }, { type: 'Tasks', id }],
      transformResponse: (response: Task) => {
        if (!Array.isArray(response)) {
          return [];
        }

        return response;
      },
    }),

    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
      transformResponse: (response: Task) => response,
    }),

    updateStatusTask: builder.mutation<Task, UpdateStatusResponse>({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
      transformResponse: (response: Task) => response,
    }),

    updateTask: builder.mutation<Task, UpdateTaskRequest>({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
      transformResponse: (response: Task) => response,
    }),

    deleteTask: builder.mutation<void, DeleteTaskResponse>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    getTask: builder.query<Task, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        { type: 'Tasks', id: TASKS_LIST_TAG },
        { type: 'Tasks', id },
        { type: 'Comments', id: TASKS_LIST_TAG },
        { type: 'Files', id: TASKS_LIST_TAG },
      ],
    }),

    addComment: builder.mutation<Comment, AddCommentRequest>({
      query: ({ taskId, userId, text }) => ({
        url: '/comments',
        method: 'POST',
        body: {
          taskId,
          userId,
          text,
          createdAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: 'Comments', id: COMMENTS_LIST_TAG }, { type: 'Comments', id: taskId }],
    }),

    getTaskComments: builder.query<Comment[], number>({
      query: (taskId) => `/comments?taskId=${taskId}`,
      providesTags: (result, error, taskId) => [{ type: 'Comments', id: COMMENTS_LIST_TAG }, { type: 'Comments', id: taskId }],
    }),

    getTaskFiles: builder.query<TaskFile[], number>({
      query: (taskId) => ({
        url: `/files?taskId=${taskId}`,
        method: 'GET',
      }),
      providesTags: (result, error, taskId) => [{ type: 'Files', id: FILES_LIST_TAG }, { type: 'Files', id: taskId }],
    }),

    addFile: builder.mutation<TaskFile, Omit<TaskFile, 'id' | 'uploadedAt'>>({
      query: (fileData) => ({
        url: '/files',
        method: 'POST',
        body: {
          ...fileData,
          id: `file_${Date.now()}_${Math.random()}`,
          uploadedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: 'Files', id: FILES_LIST_TAG }, { type: 'Files', id: taskId }],
    }),

    deleteFile: builder.mutation<void, string>({
      query: (fileId) => ({
        url: `/files/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Files', id: FILES_LIST_TAG }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateStatusTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useAddFileMutation,
  useDeleteFileMutation,
  useGetTaskFilesQuery,
} = tasksApi;
