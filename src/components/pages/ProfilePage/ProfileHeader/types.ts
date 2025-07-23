interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface ProfileHeaderProps {
  user: User;
  avatarPreview: string | null;
  onEditClick: () => void;
  onLogOutClick: () => void;
}
