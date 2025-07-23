interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface ProjectsListProps {
  projects: Project[];
}
