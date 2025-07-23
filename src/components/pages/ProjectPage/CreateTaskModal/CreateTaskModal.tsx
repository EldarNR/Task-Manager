// libraries
import { type FC, useMemo } from 'react';
// components
import { Button } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'components/shared/Form';
import { FormControl } from 'components/shared/Form/FormControl';
import Modal from 'components/shared/ui-kit/Modal';
// config
import { BASE_TASK_FIELDS, CREATE_TASK_SCHEMA } from 'components/pages/ProjectPage/CreateTaskModal/config';
// types
import type { CreateTaskFormData, CreateTaskModalProps } from 'components/pages/ProjectPage/CreateTaskModal/types';

export const CreateTaskModal: FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  selectedStatus,
  usersOption,
  statusOptions,
}) => {
  const defaultValues = useMemo<CreateTaskFormData>(() => ({
    title: '',
    description: '',
    deadline: '',
    assignee: null,
    status: selectedStatus,
  }), [selectedStatus]);

  const formFields = BASE_TASK_FIELDS.map((field) => {
    if (field.name === 'assignee') {
      return { ...field, options: usersOption };
    }

    if (field.name === 'status') {
      return { ...field, options: statusOptions };
    }

    return field;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создание новой задачи"
    >
      <Form
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        resolver={yupResolver(CREATE_TASK_SCHEMA)}
      >
        {formFields.map((field) => (
          <FormControl
            key={field.name}
            fieldType={field.fieldType}
            label={field.label}
            name={field.name}
            options={'options' in field ? field.options : null}
            placeholder={field.placeholder}
          />
        ))}
        <Button
          disabled={isSubmitting}
          intent="primary"
          loading={isSubmitting}
          type="submit"
        >
          Создать задачу
        </Button>
      </Form>
    </Modal>
  );
};
