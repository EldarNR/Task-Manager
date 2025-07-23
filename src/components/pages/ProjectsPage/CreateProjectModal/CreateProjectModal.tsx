// libraries
import { type FC } from 'react';
// components
import { Button } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'components/shared/Form/Form';
import { FormControl } from 'components/shared/Form/FormControl';
import Modal from 'components/shared/ui-kit/Modal';
// config
import { CREATE_PROJECT_FORM_INITIAL_VALUES, CREATE_PROJECT_VALIDATION_SCHEMA } from 'components/pages/ProjectsPage/config';
// types
import type { CreateProjectModalProps } from 'components/pages/ProjectsPage/CreateProjectModal/types';

export const CreateProjectModal: FC<CreateProjectModalProps> = ({
  isOpen,
  isCreating,
  onClose,
  onSubmit,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Создание нового проекта"
  >
    <Form
      defaultValues={CREATE_PROJECT_FORM_INITIAL_VALUES}
      onSubmit={onSubmit}
      resolver={yupResolver(CREATE_PROJECT_VALIDATION_SCHEMA)}
    >
      <FormControl fieldType="input" label="Название проекта" name="nameProject" />
      <FormControl fieldType="textarea" label="Описание проекта" name="descriptionProject" />
      <Button intent="primary" loading={isCreating} type="submit">
        Отправить
      </Button>
    </Form>
  </Modal>
);
