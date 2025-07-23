// types
import type { TaskFile } from 'store/services/tasks/types';

export interface FileSectionProps {
  files: TaskFile[];
  isLoading: boolean;
  onFileUpload: (formData: { file: File | null }) => Promise<void>;
  onFileDelete: (fileId: string) => Promise<void>;
  isUploadingFile: boolean;
  isDeletingFile: boolean;
}
