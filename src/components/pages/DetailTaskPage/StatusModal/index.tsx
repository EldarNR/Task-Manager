// libraries
import { type FC } from 'react';
// components
import { Button } from '@blueprintjs/core';
import { Form } from 'components/shared/Form';
import { FormControl } from 'components/shared/Form/FormControl';
import Modal from 'components/shared/ui-kit/Modal';
// config
import { STATUS_CREATE_TASK } from 'components/pages/ProjectPage/config';
// types
import type { StatusModalProps } from 'components/pages/DetailTaskPage/StatusModal/types';
import type { TaskStatus } from 'types/types';

const StatusModal: FC<StatusModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isUpdating,
}) => {
  const handleSubmit = async (formData: { status: TaskStatus; }) => {
    await onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Изменить статус"
    >
      <div className="modal-form">
        <Form
          defaultValues={initialValues}
          onSubmit={handleSubmit}
        >
          <FormControl
            fieldType="select"
            label="Статус"
            name="status"
            options={STATUS_CREATE_TASK}
          />
          <div className="modal-form--actions">
            <Button
              disabled={isUpdating}
              intent="primary"
              loading={isUpdating}
              type="submit"
            >
              Обновить статус
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

export default StatusModal;
