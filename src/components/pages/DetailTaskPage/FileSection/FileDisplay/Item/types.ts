// types
import type { TaskFile } from 'store/services/tasks/types';

export interface FileDisplayItemProps {
  file: TaskFile;
  onDownload: (file: TaskFile) => void;
  onDelete?: (fileId: string) => void;
  isDeleting?: boolean;
  formatFileSize: (bytes: number) => string;
}
