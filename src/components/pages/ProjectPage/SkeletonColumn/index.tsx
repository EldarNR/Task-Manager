// config
import { KANBAN_COLUMNS_LENGTH } from 'components/pages/ProjectPage/SkeletonColumn/config';

export const renderSkeletonColumn = () => (
  <div className="kanban-column skeleton">
    <div className="kanban-column__header">
      <div className="skeleton-text skeleton-text--title" />
      <div className="skeleton-text skeleton-text--counter" />
    </div>
    <div className="kanban-column__content">
      { KANBAN_COLUMNS_LENGTH.map((i) => (
        <div key={i} className="task-item skeleton">
          <div className="skeleton-text skeleton-text--line" />
          <div className="skeleton-text skeleton-text--line skeleton-text--short" />
          <div className="skeleton-text skeleton-text--line skeleton-text--mini" />
        </div>
      ))}
    </div>
  </div>
);
