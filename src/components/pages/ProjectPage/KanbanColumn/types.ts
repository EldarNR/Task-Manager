// libraries
import type { DragEvent, ReactElement } from 'react';
// types
import { type Column } from 'components/pages/ProjectPage/types';
import { type Task, TaskStatus } from 'types/types';

export interface KanbanColumnProps {
  column: Column;
  isDraggedOver: boolean;
  handleDragEnterColumn: (e: DragEvent<HTMLDivElement>, columnId: TaskStatus) => void;
  handleDragLeaveColumn: (e: DragEvent<HTMLDivElement>, columnId: TaskStatus) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDropOnColumn: (e: DragEvent<HTMLDivElement>, targetColumnId: TaskStatus) => Promise<void>;
  showModal: (isOpen: boolean, columnId?: TaskStatus) => void;
  renderTask: (task: Task) => ReactElement;
}
