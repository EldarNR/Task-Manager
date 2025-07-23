// libraries
import type { ChangeEvent } from 'react';
// types
import type { SortOption } from 'components/pages/ProjectsPage/types';

export interface ProjectsControlsProps {
  sortOption: SortOption;
  projectsPerPage: number;
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
