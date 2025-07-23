// types
import { TaskStatus } from 'types/types';

export type TasksParams = {
  id: number;
};

export interface User {
  id: number;
  name: string;
  email?: string;
  avatar: string;
  password?: string;
}

export interface Comment {
  id: number;
  author: User;
  text: string;
  createdAt: string;
}

export interface TaskFile {
  id: string;
  taskId: number;
  name: string;
  data: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface CreateTaskRequest {
  projectId: number;
  title: string;
  status: TaskStatus;
  description?: string;
}

export interface UpdateTaskRequest {
  id: number;
  title?: string;
  description?: string;
  comments?: Comment[];
  status?: TaskStatus;
  assignee?: number;
  deadline?: string;
}

export interface UpdateStatusResponse {
  id: number;
  status:TaskStatus;
}

export interface DeleteTaskResponse {
  id: number;
}

export interface AddCommentRequest {
  taskId: number;
  userId: number;
  text: string;
}
