// libraries
import * as yup from 'yup';
// types
import type { BaseFieldConfig, CreateTaskFormData } from 'components/pages/ProjectPage/CreateTaskModal/types';
import { TaskStatus } from 'types/types';

export const BASE_TASK_FIELDS: BaseFieldConfig[] = [
  {
    name: 'title',
    label: 'Название задачи',
    placeholder: 'Введите название задачи',
    fieldType: 'input',
  },
  {
    name: 'description',
    label: 'Описание',
    placeholder: 'Введите описание задачи',
    fieldType: 'textarea',
  },
  {
    name: 'deadline',
    label: 'Дедлайн',
    fieldType: 'datePicker',
  },
  {
    name: 'assignee',
    label: 'Исполнитель',
    fieldType: 'select',
    placeholder: 'Выберите исполнителя',
  },
  {
    name: 'status',
    label: 'Статус',
    fieldType: 'select',
  },
] as const;

const createTaskConfig = {
  titleMinLength: 1,
  titleMaxLength: 25,
  descriptionMinLength: 1,
  descriptionMaxLength: 70,
};

export const CREATE_TASK_SCHEMA = yup.object({
  title: yup
    .string()
    .required('Название задачи обязательно')
    .min(createTaskConfig.titleMinLength, 'Название задачи не может быть пустым')
    .max(createTaskConfig.titleMaxLength, 'Название задачи не должно превышать 25 символов'),

  description: yup
    .string()
    .required('Описание обязательно')
    .min(createTaskConfig.descriptionMinLength, 'Описание не может быть пустым')
    .max(createTaskConfig.descriptionMaxLength, 'Описание не должно превышать 70 символов'),

  deadline: yup
    .string()
    .required('Дедлайн обязателен')
    .test('is-future-date', 'Дедлайн не может быть в прошлом', (value) => {
      if (!value) {
        return false;
      }
      const selectedDate = new Date(value);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return selectedDate >= today;
    }),

  assignee: yup.number()
    .typeError('Исполнитель должен быть числом')
    .required('Исполнитель обязателен')
    .notOneOf([0], 'Необходимо выбрать исполнителя'),

  status: yup
    .string()
    .required('Статус обязателен')
    .oneOf(
      [
        TaskStatus.TODO,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
      ],
      'Выберите корректный статус',
    ),
}) satisfies yup.ObjectSchema<CreateTaskFormData>;
