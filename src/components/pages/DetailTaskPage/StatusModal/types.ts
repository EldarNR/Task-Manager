import type { TaskStatus } from 'types/types';

export interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { status:TaskStatus }) => Promise<void>;
  initialValues: any;
  isUpdating: boolean;
}
