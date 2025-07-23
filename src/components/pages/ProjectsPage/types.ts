export type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';

export interface CreateProject {
  nameProject?: string;
  descriptionProject?: string;
}
