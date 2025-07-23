// libraries
import type { FC } from 'react';
// types
import type { HeaderProps } from 'components/layout/Header/types';

const Header: FC<HeaderProps> = ({ children }) => (
  <header className="header">
    {children}
  </header>
);

export default Header;
