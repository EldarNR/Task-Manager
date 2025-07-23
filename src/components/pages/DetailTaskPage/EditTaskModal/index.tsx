// libraries
import { type FC } from 'react';
// components
import { Button } from '@blueprintjs/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'components/shared/Form';
import { FormControl } from 'components/shared/Form/FormControl';
import Modal from 'components/shared/ui-kit/Modal';
// config
import { EDIT_TASK_SCHEMA, GET_FORM_CONFIG } from 'components/pages/DetailTaskPage/EditTaskModal/config';
// types
import type { EditTaskModalProps } from 'components/pages/DetailTaskPage/EditTaskModal/types';

const EditTaskModal: FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  usersOptions,
  isUpdating,
}) => {
  const formConfig = GET_FORM_CONFIG(usersOptions);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать задачу"
    >
      <div className="modal-form">
        <Form
          defaultValues={initialValues}
          onSubmit={onSubmit}
          resolver={yupResolver(EDIT_TASK_SCHEMA)}
        >
          {formConfig.map((field) => (
            <FormControl key={field.name} {...field} />
          ))}
          <div className="modal-form--actions">
            <Button
              intent="primary"
              loading={isUpdating}
              type="submit"
            >
              Сохранить изменения
            </Button>
            <Button onClick={onClose}>
              Отмена
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default EditTaskModal;
