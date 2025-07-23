// libraries
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import { Button } from '@blueprintjs/core';
import Header from 'components/layout/Header';
// static
import ArrowLeft from 'assets/icons/arrow-left.svg?react';
// types
import type { TaskHeaderProps } from 'components/pages/DetailTaskPage/TaskHeader/types';

const TaskHeader: FC<TaskHeaderProps> = ({
  task,
  onStatusChange,
  onEditClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="detail-task-page--header">
      <Header>
        <div className="detail-task-page--header-content">
          <div className="detail-task-page--header-left">
            <Button
              className="back-link"
              icon={<ArrowLeft />}
              onClick={() => navigate(-1)}
              type="button"
              variant="minimal"
            >
              Назад
            </Button>
            <div>
              <h2 className="detail-task-page--title">{task.title}</h2>
              <div className="detail-task-page--status-info">
                <span className="detail-task-page--status-text">
                  <strong>Статус:</strong>
                  {' '}
                  {task.status}
                </span>
                <Button
                  icon="menu-open"
                  onClick={onStatusChange}
                  size="small"
                  variant="minimal"
                >
                  Изменить
                </Button>
              </div>
            </div>
          </div>

          <div className="detail-task-page--actions">
            <Button
              icon="edit"
              intent="primary"
              onClick={onEditClick}
            >
              Редактировать задачу
            </Button>
            <Button
              icon="trash"
              intent="danger"
              onClick={onDeleteClick}
            >
              Удалить задачу
            </Button>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default TaskHeader;
