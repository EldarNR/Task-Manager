// libraries
import type { DragEvent } from 'react';
// types
import type { Task } from 'types/types';

export interface TaskItemProps {
  task: Task;
  editingTask: number | null;
  handleDragStart: (e: DragEvent<HTMLDivElement>, taskId: string) => void;
  handleDragEnd: () => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDropOnTask: (e: DragEvent<HTMLDivElement>, targetTaskId: Task) => void;
}
