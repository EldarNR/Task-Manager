// types
import { type Task, TaskStatus } from 'types/types';

export interface TaskForm {
  title: string;
  status: TaskStatus;
  description: string;
  deadline: string;
  assignee: number | null;
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[] | [];
}

export interface TypedColumn extends Omit<Column, 'tasks'> {
  tasks: Task[] | [];
}
