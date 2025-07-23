// libraries
import type { FC } from 'react';
// components
import { Button, Icon } from '@blueprintjs/core';
// types
import type { PaginationNavButtonProps } from 'components/pages/ProjectsPage/Pagination/NavButton/types';

export const PaginationNavButton: FC<PaginationNavButtonProps> = ({
  icon,
  title,
  onClick,
  disabled,
}) => (
  <Button disabled={disabled} onClick={onClick} title={title}>
    <Icon icon={icon} />
  </Button>
);
