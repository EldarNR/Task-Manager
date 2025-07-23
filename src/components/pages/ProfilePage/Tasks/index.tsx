// libraries
import { type FC } from 'react';
import { Link } from 'react-router-dom';
// components
import { Card, Icon, Tag } from '@blueprintjs/core';
// config
import { DATE_CONFIG } from 'components/pages/ProfilePage/Tasks/config';
// helpers
import { formatDate } from 'helpers/formatDate';
// types
import type { TasksSectionProps } from 'components/pages/ProfilePage/Tasks/types';

export const TasksSection: FC<TasksSectionProps> = ({ tasks }) => {
  const hasTasks = tasks && tasks.length > 0;

  return (
    <Card className="tasks-card">
      <div className="card-header">
        <h3 className="card-title">Мои задачи</h3>
        {hasTasks && (
        <span className="tasks-count">
          {tasks.length}
          {' '}
          задач
        </span>
        )}
      </div>

      {hasTasks ? (
        <div className="tasks-list">
          {tasks.map((task) => (
            <Link
              key={task.id}
              className="task-link"
              to={`/project/${task.projectId}/task/${task.id}`}
            >
              <Card className="task-card" interactive>
                <div className="task-content">
                  <div className="task-header">
                    <h4 className="task-title">{task.title}</h4>
                    {task.status && <Tag className="status-tag">{task.status}</Tag>}
                  </div>

                  <div className="task-meta">
                    <div className="task-tags">
                      {task.deadline && (
                        <Tag className="deadline-tag" icon="calendar">
                          До:
                            {' '}
                            {formatDate(task.deadline).toLocaleDateString(DATE_CONFIG.locale, DATE_CONFIG.format)}
                        </Tag>
                      )}
                    </div>

                    {task.comments?.length > 0 && (
                    <div className="comments-count">
                      <Icon icon="comment" size={12} />
                      <span>{task.comments.length}</span>
                    </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon className="empty-icon" icon="clipboard" size={48} />
          <p className="empty-text">У вас пока нет задач</p>
        </div>
      )}
    </Card>
  );
};
