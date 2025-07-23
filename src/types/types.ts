// types
import type { User } from 'store/services/tasks/types';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export enum LocalStorage {
  TOKEN = 'token',
  USER_ID = 'userID',
}

export interface SelectOption<T> {
  value: T;
  label: string;
}

interface Assignee {
  id: number;
  name: string;
  avatar?: string;
}

interface Comment {
  id: number;
  author: User;
  text: string;
  createdAt: string;
}

export interface Task {
  id: number;
  title: string;
  text: string;
  projectId:number;
  description?: string;
  status: TaskStatus;
  comments:Comment[];
  assignee?: Assignee;
  deadline?: string;
  columnId: string | number;
}
