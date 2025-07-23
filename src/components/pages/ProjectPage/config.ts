// types
import {
  type Column, type TaskForm,
} from 'components/pages/ProjectPage/types';
import { TaskStatus } from 'types/types';

export const TASKS_INITIAL_COLUMNS: Column[] = [
  {
    id: TaskStatus.TODO,
    title: 'To Do',
    color: 'todo',
    tasks: [],
  },
  {
    id: TaskStatus.IN_PROGRESS,
    title: 'In Progress',
    color: 'progress',
    tasks: [],
  },
  {
    id: TaskStatus.DONE,
    title: 'Done',
    color: 'done',
    tasks: [],
  },
];

export const STATUS_CREATE_TASK = [
  {
    label: 'To Do',
    value: TaskStatus.TODO,
  },
  {
    label: 'In Progress',
    value: TaskStatus.IN_PROGRESS,
  },
  {
    label: 'Done',
    value: TaskStatus.DONE,
  },
];

export const TASK_FORM_INITIAL_VALUES: TaskForm = {
  title: '',
  description: '',
  deadline: '',
  assignee: 0,
  status: TaskStatus.TODO,
};
