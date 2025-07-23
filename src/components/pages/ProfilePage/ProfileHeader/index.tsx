// libraries
import type { FC, SyntheticEvent } from 'react';
// components
import { Button, Card } from '@blueprintjs/core';
// static
import GuestAvatarImg from 'assets/images/guest.png';
// types
import type { ProfileHeaderProps } from 'components/pages/ProfilePage/ProfileHeader/types';

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  user,
  avatarPreview,
  onEditClick,
  onLogOutClick,
}) => (
  <Card className="profile-card">
    <div className="avatar-container">
      <img
        alt="avatar"
        className="avatar"
        onError={(e:SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = GuestAvatarImg;
        }}
        src={avatarPreview || user.avatar}
      />
      <div className="avatar-overlay">
        <Button
          className="edit-avatar-button"
          icon="edit"
          onClick={onEditClick}
          size="small"
          variant="minimal"
        />
      </div>
    </div>

    <div className="user-info">
      <h1 className="user-name">{user.name}</h1>
      <p className="user-email">{user.email}</p>
    </div>

    <Button
      className="edit-button"
      icon="edit"
      intent="primary"
      onClick={onEditClick}
    >
      Редактировать профиль
    </Button>
    <Button
      className="logout-button"
      icon="key-escape"
      intent="danger"
      onClick={onLogOutClick}
    >
      Выйти из аккаунта
    </Button>
  </Card>
);
