// libraries
import { configureStore } from '@reduxjs/toolkit';

// store
import { projectsApi } from 'store/services/projects/projects';
import { tasksApi } from 'store/services/tasks/tasks';
import { userApi } from 'store/services/user/user';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, projectsApi.middleware, tasksApi.middleware),
});
