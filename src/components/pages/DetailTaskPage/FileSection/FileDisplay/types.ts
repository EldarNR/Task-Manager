// types
import type { TaskFile } from 'store/services/tasks/types';

export interface FileDisplayProps {
  files?: TaskFile[];
  onDelete?: (fileId: string) => Promise<void>;
  isDeleting?: boolean;
}
