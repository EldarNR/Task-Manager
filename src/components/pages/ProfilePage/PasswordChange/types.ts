// types
import type { PasswordForm } from 'components/pages/ProfilePage/types';

export interface PasswordChangeSectionProps {
  onPasswordChange: (data: PasswordForm) => Promise<void>;
  isChangingPassword: boolean;
}
