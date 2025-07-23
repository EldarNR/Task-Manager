// libraries
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import { Card } from '@blueprintjs/core';
import LoginForm from 'components/pages/LoginPage/LoginForm/LoginForm';
// constants
import { AppRoutes } from 'constants/routes';
// config
import {
  DELAY,
  JWT_TOKEN,
  USER,
} from 'components/pages/LoginPage/config';
// context
import { useToasterContext } from 'contexts/Toaster/useToasterContext';
// types
import type { LoginFormData } from 'components/pages/LoginPage/types';
import { LocalStorage } from 'types/types';

const Login:FC = () => {
  const navigate = useNavigate();
  const { toaster } = useToasterContext();

  const handleSubmit = async (data: LoginFormData):Promise<void> => {
    await new Promise((resolve) => {
      setTimeout(resolve, DELAY);
    });

    if (data.email === USER.email && data.password === USER.password) {
      localStorage.setItem(LocalStorage.TOKEN, JWT_TOKEN);
      localStorage.setItem(LocalStorage.USER_ID, USER.userId);
      navigate(AppRoutes.HOME);

      toaster?.show({ message: 'Успешно!', intent: 'success' });
    } else {
      toaster?.show({ message: 'Неверные данные для входа', intent: 'danger' });
    }
  };

  return (
    <div className="login-page">
      <Card className="login-page--card">
        <h2 className="login-page---title">Вход в систему</h2>
        <div className="login-page---hint">
          Тестовые учетные данные:
          <br />
          email:
          <span className="font-mono">{USER.email}</span>
          <br />
          password:
          <span className="font-mono">{USER.password}</span>
        </div>

        <LoginForm onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default Login;
