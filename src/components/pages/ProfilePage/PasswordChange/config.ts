// libraries
import * as yup from 'yup';

const passwordChangeSchemaConfig = {
  newPasswordMinLength: 5,
  newPasswordMaxLength: 20,
};

export const PASSWORD_VALIDATION_SCHEMA = yup.object({
  newPassword: yup.string().required('Пароль обязателен').min(passwordChangeSchemaConfig.newPasswordMinLength).max(passwordChangeSchemaConfig.newPasswordMaxLength),
  newConfirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
});
