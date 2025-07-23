// libraries
import type { FC } from 'react';
// types
import type { KanbanColumnProps } from 'components/pages/ProjectPage/KanbanColumn/types';

const KanbanColumn: FC<KanbanColumnProps> = ({
  column,
  isDraggedOver,
  handleDragEnterColumn,
  handleDragLeaveColumn,
  handleDragOver,
  handleDropOnColumn,
  renderTask,
}) => (
  <div
    className={`column column--${column.color} ${isDraggedOver ? 'column--drag-over' : ''}`}
    onDragEnter={(e) => handleDragEnterColumn(e, column.id)}
    onDragLeave={(e) => handleDragLeaveColumn(e, column.id)}
    onDragOver={handleDragOver}
    onDrop={(e) => handleDropOnColumn(e, column.id)}
  >
    <div className="column-header">
      <h2 className="column-title">
        {column.title}
        <span className="column-count">
          {column.tasks.length}
        </span>
      </h2>
    </div>

    <div className="column-tasks">
      {column.tasks.map(renderTask)}
      {column.tasks.length === 0 && (
      <div className="column-empty">
        Перетащите задачи сюда или создайте новую
      </div>
      )}
    </div>
  </div>
);

export default KanbanColumn;
