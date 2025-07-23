// libraries
import type { FC } from 'react';
// components
import { Button } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'components/shared/Form';
import { FormControl } from 'components/shared/Form/FormControl';
// config
import { INITIAL_LOGIN_VALUES, LOGIN_VALIDATION_SCHEMA } from 'components/pages/LoginPage/config';
// types
import type { LoginFormProps } from 'components/pages/LoginPage/LoginForm/types';

const LoginForm:FC<LoginFormProps> = ({ onSubmit }) => (
  <Form
    defaultValues={INITIAL_LOGIN_VALUES}
    onSubmit={onSubmit}
    resolver={yupResolver(LOGIN_VALIDATION_SCHEMA)}
  >
    <FormControl fieldType="input" label="Email" name="email" placeholder="email" />
    <FormControl fieldType="password" label="Пароль" name="password" placeholder="пароль" />
    <Button intent="primary" type="submit">Отправить</Button>
  </Form>
);

export default LoginForm;
