// libraries
import type { ReactElement } from 'react';
// constants
import { AppRoutes } from 'constants/routes';

export interface AppRoute {
  path: AppRoutes;
  element: ReactElement;
}
