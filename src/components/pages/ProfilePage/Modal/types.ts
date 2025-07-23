// libraries
import * as yup from 'yup';
// types
import type { PROFILE_VALIDATION_SCHEMA } from 'components/pages/ProfilePage/config';

export type EditForm = yup.InferType<typeof PROFILE_VALIDATION_SCHEMA>;

export interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: EditForm) => Promise<void>;
  initialValues: EditForm;
  isUpdating: boolean;
}
