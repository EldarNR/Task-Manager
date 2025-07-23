// types
import type { CreateProject } from 'components/pages/ProjectsPage/types';

export interface CreateProjectModalProps {
  isOpen: boolean;
  isCreating: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProject) => void;
}
