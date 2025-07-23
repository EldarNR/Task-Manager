// libraries
import * as yup from 'yup';
// types
import type { PasswordForm } from 'components/pages/ProfilePage/types';
import { LocalStorage } from 'types/types';

export const INITIAL_FORM_VALUES = {
  name: '',
  email: '',
};

export const INITIAL_PASSWORD_FORM_VALUES: PasswordForm = {
  newPassword: '',
  newConfirmPassword: '',
};

const profileValidationConfig = {
  nameMinLength: 2,
  nameMaxLength: 10,
};

export const USER_ID = Number(localStorage.getItem(LocalStorage.USER_ID));

export const PROFILE_VALIDATION_SCHEMA = yup
  .object({
    name: yup
      .string()
      .required('ФИО обязательно')
      .min(profileValidationConfig.nameMinLength)
      .max(profileValidationConfig.nameMaxLength),

    email: yup
      .string()
      .required('Email обязателен')
      .email('Неверный email'),

    avatar: yup
      .mixed<File>()
      .test('fileType', 'Неверный формат файла', (value) => value === null || value instanceof File)
      .optional(),
  })
  .required();
