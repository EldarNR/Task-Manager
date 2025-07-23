// libraries
import { type FC } from 'react';
import { Link } from 'react-router-dom';
// types
import type { TaskItemProps } from 'components/pages/ProjectPage/TaskItems/types';

const TaskItem: FC<TaskItemProps> = ({
  task,
  editingTask,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDropOnTask,
}) => {
  const renderTaskActions = () => (
    <Link
      className="task-action"
      title="Перейти"
      to={`task/${task.id}`}
    >
      Перейти
    </Link>
  );

  const renderTaskContent = () => (
    <span className="task-text">
      ⋮⋮
      {task.title}
    </span>
  );

  return (
    <div
      className="task"
      draggable={!editingTask}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={(e) => handleDragStart(e, String(task.id))}
      onDrop={(e) => handleDropOnTask(e, task)}
    >
      <div className="task-content">
        <div className="task-body">
          {renderTaskContent()}
        </div>
        <div className="task-actions">
          {renderTaskActions()}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
