// libraries
import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
// components
import LoginPage from 'components/pages/LoginPage';
import { ROUTER_ELEMENTS } from 'components/routes/routes';
// constants
import { AppRoutes } from 'constants/routes';
// context
import { AppProviders } from 'contexts/AppProvider/AppProvider';
// hooks
import useAuth from 'hooks/useAuth';

const App: FC = () => {
  const isAuthenticated = useAuth();

  return (
    <AppProviders>
      <Routes>
        {isAuthenticated ? (
          ROUTER_ELEMENTS.map(({ path, element }) => (
            <Route key={path} element={element} path={path} />
          ))
        ) : (
          <Route key={AppRoutes.LOGIN} element={<LoginPage />} path={AppRoutes.LOGIN} />
        )}
      </Routes>
    </AppProviders>
  );
};

export default App;
