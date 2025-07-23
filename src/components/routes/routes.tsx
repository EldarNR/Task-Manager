// components
import DetailTaskPage from 'components/pages/DetailTaskPage';
import NotFoundPage from 'components/pages/NotFoundPage';
import ProfilePage from 'components/pages/ProfilePage';
import ProjectPage from 'components/pages/ProjectPage';
import ProjectsPage from 'components/pages/ProjectsPage';
// constants
import { AppRoutes } from 'constants/routes';
// types
import type { AppRoute } from 'components/routes/types';

export const ROUTER_ELEMENTS: AppRoute[] = [
  { path: AppRoutes.HOME, element: <ProjectsPage /> },
  { path: AppRoutes.PROFILE, element: <ProfilePage /> },
  { path: AppRoutes.PROJECT, element: <ProjectPage /> },
  { path: AppRoutes.TASK_DETAIL, element: <DetailTaskPage /> },
  { path: AppRoutes.NOT_FOUND, element: <NotFoundPage /> },
];
