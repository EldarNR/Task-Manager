// libraries
import * as yup from 'yup';
// types
import type { EditTaskFormData } from 'components/pages/DetailTaskPage/EditTaskModal/types';
import type { SelectOption } from 'types/types';

export const EDIT_TASK_SCHEMA: yup.ObjectSchema<EditTaskFormData> = yup.object({
  description: yup.string().required('Описание обязательно'),
  deadline: yup.string().required('Дедлайн обязателен'),
  assignee: yup.string().required('Исполнитель обязателен'),
});

export const GET_FORM_CONFIG = (usersOptions: SelectOption<string>[]) => [
  {
    fieldType: 'textarea',
    label: 'Описание',
    name: 'description',
    placeholder: 'Введите описание задачи',
  },
  {
    fieldType: 'datePicker',
    label: 'Дедлайн',
    name: 'deadline',
  },
  {
    fieldType: 'select',
    label: 'Исполнитель',
    name: 'assignee',
    options: usersOptions,
    placeholder: 'Введите имя исполнителя',
  },
] as const;
