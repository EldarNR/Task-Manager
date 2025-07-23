// types
import { type SelectOption, TaskStatus } from 'types/types';

export interface CreateTaskFormData {
  title?: string;
  description?: string;
  deadline?: string;
  assignee?: number;
  status?: TaskStatus;
}

export interface BaseFieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  fieldType: 'input' | 'select' | 'checkbox' | 'textarea' | 'fileInput' | 'password' | 'datePicker';
  withOptions?: boolean;
}

export interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CreateTaskFormData) => void;
  isSubmitting: boolean;
  selectedStatus: TaskStatus;
  usersOption: SelectOption<string>[];
  statusOptions: SelectOption<TaskStatus>[];
}
