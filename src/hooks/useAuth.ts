// libraries
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// constants
import { AppRoutes } from 'constants/routes';

const useAuth = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkAuth = useCallback(():void => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate(AppRoutes.LOGIN);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return isAuthenticated;
};

export default useAuth;
