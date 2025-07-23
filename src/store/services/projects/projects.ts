// libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// config
import { BASE_URL } from 'store/services/config';
// types
import type {
  CreateProjectParams,
  CreateProjectResponse, GetProjectByIdResponse,
  Project,
  ProjectsParams,
  ProjectResponse, SearchProjectResponse,
} from 'store/services/projects/types';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectResponse, ProjectsParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params?.page) {
          queryParams.append('_page', params.page.toString());
        }

        if (params?.limit) {
          queryParams.append('_limit', params.limit.toString());
        }

        if (params?.sort) {
          const match = params.sort.match(/^(\w+)-(asc|desc)$/);

          if (match) {
            const [
              , field,
              order,
            ] = match;
            const sortField = field === 'date' ? 'createdAt' : field;

            queryParams.append('_sort', sortField);
            queryParams.append('_order', order);
          }
        }

        return `projects?${queryParams.toString()}`;
      },
      transformResponse: (response: Project[], meta) => {
        const totalHeader = meta?.response?.headers?.get('X-Total-Count');
        const total = Number(totalHeader);

        return {
          data: Array.isArray(response) ? response : [],
          total,
        };
      },
      providesTags: ['Projects'],
    }),
    createProject: builder.mutation<CreateProjectResponse, CreateProjectParams>({
      query: (newProject) => ({
        url: 'projects',
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['Projects'],
    }),
    searchProjects: builder.query<ProjectResponse, SearchProjectResponse>({
      query: ({ searchProjectByName }) => {
        const queryParams = new URLSearchParams();

        if (searchProjectByName) {
          queryParams.append('name_like', searchProjectByName);
        }

        return `projects?${queryParams.toString()}`;
      },
      transformResponse: (response: Project[], meta) => {
        const totalHeader = meta?.response?.headers?.get('X-Total-Count');
        const total = totalHeader ? Number(totalHeader) : response.length;

        return {
          data: response,
          total,
        };
      },
    }),
    getProjectById: builder.query<Project, GetProjectByIdResponse>({
      query: ({ id }) => `projects/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'Projects', id }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useSearchProjectsQuery,
  useGetProjectByIdQuery,
} = projectsApi;
