export interface ProjectsParams {
  page?: number;
  limit?: number;
  sort?: 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface ProjectResponse {
  data: Project[];
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface CreateProjectParams {
  name: string;
  description: string;
}

export interface CreateProjectResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface SearchProjectResponse {
  searchProjectByName: string
}

export interface GetProjectByIdResponse {
  id: number;
}
