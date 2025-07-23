// libraries
import type { FC } from 'react';
// components
import { Button, Card } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'components/shared/Form';
import { FormControl } from 'components/shared/Form/FormControl';
// config
import { INITIAL_PASSWORD_FORM_VALUES } from 'components/pages/ProfilePage/config';
import { PASSWORD_VALIDATION_SCHEMA } from 'components/pages/ProfilePage/PasswordChange/config';
// types
import type { PasswordChangeSectionProps } from 'components/pages/ProfilePage/PasswordChange/types';

export const PasswordChangeSection: FC<PasswordChangeSectionProps> = ({
  onPasswordChange,
  isChangingPassword,
}) => (
  <Card className="password-card">
    <div className="card-header">
      <h3 className="card-title">Безопасность</h3>
      <p className="card-subtitle">Смена пароля</p>
    </div>

    <Form
      className="password-form"
      defaultValues={INITIAL_PASSWORD_FORM_VALUES}
      onSubmit={onPasswordChange}
      resolver={yupResolver(PASSWORD_VALIDATION_SCHEMA)}
    >
      <div className="form-fields">
        <FormControl
          fieldType="input"
          label="Новый пароль"
          name="newPassword"
          placeholder="Введите новый пароль"
        />

        <FormControl
          fieldType="input"
          label="Подтвердите пароль"
          name="newConfirmPassword"
          placeholder="Повторите новый пароль"
        />
      </div>

      <div className="form-actions">
        <Button
          className="submit-button"
          disabled={isChangingPassword}
          icon="lock"
          intent="primary"
          loading={isChangingPassword}
          type="submit"
        >
          {isChangingPassword ? 'Изменение...' : 'Изменить пароль'}
        </Button>
      </div>
    </Form>
  </Card>
);
