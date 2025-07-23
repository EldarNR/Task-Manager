// libraries
import * as yup from 'yup';

export const USER = {
  userId: '1',
  email: 'user@example.com',
  password: '123456',
};

export const INITIAL_LOGIN_VALUES = {
  email: '',
  password: '',
};

export const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikl2YW4gSXZhbm92IiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const DELAY = 500;

const loginFormConfig = {
  passwordMinLength: 5,
  passwordMaxLength: 20,
};

export const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email('Некорректный email').required('Email обязателен'),
  password: yup
    .string()
    .min(loginFormConfig.passwordMinLength, 'Минимум 5 символов')
    .max(loginFormConfig.passwordMaxLength, 'Максимум 20 символов')
    .required('Пароль обязателен'),
});
