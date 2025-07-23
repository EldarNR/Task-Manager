// types
import { type FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileEditModal } from 'components/pages/ProfilePage/Modal';
import { PasswordChangeSection } from 'components/pages/ProfilePage/PasswordChange';
// components
import { ProfileHeader } from 'components/pages/ProfilePage/ProfileHeader';
import { TasksSection } from 'components/pages/ProfilePage/Tasks';
import Loader from 'components/shared/ui-kit/Loader';
// constants
import { AppRoutes } from 'constants/routes';
// config
import { INITIAL_FORM_VALUES, USER_ID } from 'components/pages/ProfilePage/config';
// helpers
import { convertFileToBase64 } from 'helpers/convertFileToBase64';
// context
import { useToasterContext } from 'contexts/Toaster/useToasterContext';
// static
import ArrowLeft from 'assets/icons/arrow-left.svg?react';
// types
import type { EditForm } from 'components/pages/ProfilePage/Modal/types';
import type { PasswordForm } from 'components/pages/ProfilePage/types';
import type { Task } from 'types/types';
import { LocalStorage } from 'types/types';

// actions
import {
  useChangeUserPasswordMutation,
  useGetUserQuery,
  useGetUserTasksQuery,
  useUpdateUserMutation,
} from 'store/services/user/user';

const ProfilePage: FC = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(INITIAL_FORM_VALUES);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { data: user, isLoading } = useGetUserQuery(USER_ID);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [changeUserPassword, { isLoading: isChangingPassword }] = useChangeUserPasswordMutation();
  const { data: userTask } = useGetUserTasksQuery(USER_ID);
  const { toaster } = useToasterContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setInitialFormValues(user);
    }
  }, [user]);

  useEffect(() => {
    if (userTask) {
      setTasks(userTask);
    }
  }, [userTask]);

  const handleProfileUpdate = async (formData:EditForm) => {
    try {
      let avatarUrl = user?.avatar;

      if (formData.avatar instanceof File) {
        avatarUrl = await convertFileToBase64(formData.avatar);
        setAvatarPreview(avatarUrl);
      }

      await updateUser({
        id: USER_ID,
        name: formData.name,
        email: formData.email,
        avatar: avatarUrl,
      }).unwrap();

      setIsOpenEditModal(false);
      toaster?.show({ message: 'Профиль успешно обновлен', intent: 'success' });
    } catch {
      toaster?.show({ message: 'Ошибка при обновлении профиля', intent: 'danger' });
    }
  };

  const handleChangePassword = async (formData: PasswordForm) => {
    try {
      if (formData.newPassword !== formData.newConfirmPassword) {
        toaster?.show({ message: 'Пароли не совпадают', intent: 'danger' });

        return;
      }

      await changeUserPassword({ id: USER_ID, password: formData.newPassword }).unwrap();
      toaster?.show({ message: 'Пароль успешно изменен', intent: 'success' });
    } catch {
      toaster?.show({ message: 'Ошибка при изменении пароля', intent: 'danger' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(LocalStorage.USER_ID);
    localStorage.removeItem(LocalStorage.TOKEN);
    navigate(AppRoutes.LOGIN);
  };

  const handleCloseModal = () => {
    setIsOpenEditModal(false);
    setAvatarPreview(null);
  };

  if (isLoading || isUpdating) {
    return <Loader />;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Link className="back-link" to={AppRoutes.HOME}>
          <ArrowLeft />
          Назад
        </Link>
      </div>

      <div className="profile-content">
        <div className="profile-left-column">
          <ProfileHeader
            avatarPreview={avatarPreview}
            onEditClick={() => setIsOpenEditModal(true)}
            onLogOutClick={handleLogout}
            user={user}
          />

          <ProfileEditModal
            initialValues={initialFormValues}
            isOpen={isOpenEditModal}
            isUpdating={isUpdating}
            onClose={handleCloseModal}
            onSubmit={handleProfileUpdate}
          />

          <PasswordChangeSection
            isChangingPassword={isChangingPassword}
            onPasswordChange={handleChangePassword}
          />
        </div>
        <div className="profile-right-column">
          <TasksSection tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
