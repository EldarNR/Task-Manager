export interface EditTaskFormData {
  description?: string;
  deadline?: string;
  assignee?: string;
}

export interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: EditTaskFormData) => Promise<void>;
  initialValues: EditTaskFormData;
  usersOptions: { label: string; value: string }[];
  isUpdating: boolean;
}
