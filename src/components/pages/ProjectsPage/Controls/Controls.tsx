// libraries
import type { FC } from 'react';
// components
import { HTMLSelect } from '@blueprintjs/core';
// config
import { MAX_PROJECTS_PER_PAGE_OPTIONS, PROJECT_SORT_OPTIONS } from 'components/pages/ProjectsPage/config';
// types
import type { ProjectsControlsProps } from 'components/pages/ProjectsPage/Controls/types';

export const Controls: FC<ProjectsControlsProps> = ({
  sortOption,
  projectsPerPage,
  onSortChange,
  onPerPageChange,
}) => (
  <div className="projects-controls">
    <label htmlFor="selectedProject">
      Сортировка:
      <HTMLSelect
        id="selectedProject"
        minimal
        onChange={onSortChange}
        options={PROJECT_SORT_OPTIONS}
        value={sortOption}
      />
    </label>

    <label htmlFor="maxProject">
      Количество проектов:
      <HTMLSelect
        id="maxProject"
        minimal
        onChange={onPerPageChange}
        options={MAX_PROJECTS_PER_PAGE_OPTIONS}
        value={projectsPerPage}
      />
    </label>
  </div>
);
