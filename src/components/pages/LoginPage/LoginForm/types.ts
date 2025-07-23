// types
import type { LoginFormData } from 'components/pages/LoginPage/types';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
}
