// libraries
import { type FC } from 'react';
// components
import { Button } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'components/shared/Form';
import { FormControl } from 'components/shared/Form/FormControl';
import Modal from 'components/shared/ui-kit/Modal';
// config
import { PROFILE_VALIDATION_SCHEMA } from 'components/pages/ProfilePage/config';
import { FILE_FORM_VALUE } from 'components/pages/ProfilePage/Modal/config';
// types
import type { ProfileEditModalProps } from 'components/pages/ProfilePage/Modal/types';

export const ProfileEditModal: FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isUpdating,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Редактировать профиль"
  >
    <Form
      defaultValues={initialValues}
      onSubmit={onSubmit}
      resolver={yupResolver(PROFILE_VALIDATION_SCHEMA)}
    >
      <div>
        {FILE_FORM_VALUE.map(({
          fieldType, label, name, placeholder,
        }) => (
          <FormControl key={name} fieldType={fieldType} label={label} name={name} placeholder={placeholder} />
        ))}
      </div>

      <div>
        <Button
          disabled={isUpdating}
          intent="primary"
          loading={isUpdating}
          type="submit"
        >
          {isUpdating ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>

        <Button
          disabled={isUpdating}
          onClick={onClose}
        >
          Отмена
        </Button>
      </div>
    </Form>
  </Modal>
);
