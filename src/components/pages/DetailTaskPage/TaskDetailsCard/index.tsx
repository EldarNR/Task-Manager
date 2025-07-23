// libraries
import { type FC } from 'react';
// types
import type { TaskDetailsCardProps } from 'components/pages/DetailTaskPage/TaskDetailsCard/types';

const TaskDetailsCard: FC<TaskDetailsCardProps> = ({ task }) => (
  <div className="task-details-card">
    <h1 className="task-details-card--title">Детали задачи</h1>

    {task.description && (
    <div className="task-details-card--field">
      <div className="task-details-card--label">Описание:</div>
      <div className="task-details-card--value">{task.description}</div>
    </div>
    )}

    {task.assignee && (
    <div className="task-details-card--field">
      <div className="task-details-card--label">Исполнитель:</div>
      <div className="task-details-card--value">{ task.assignee?.name}</div>
    </div>
    )}

    {task.deadline && (
    <div className="task-details-card--field">
      <div className="task-details-card--label">Дедлайн до:</div>
      <div className="task-details-card--value">{task.deadline}</div>
    </div>
    )}
  </div>
);

export default TaskDetailsCard;
