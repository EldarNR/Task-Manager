// libraries
import * as yup from 'yup';
// types
import type { CreateProject, SortOption } from 'components/pages/ProjectsPage/types';
import type { SelectOption } from 'types/types';

export const SERVER_LOADING_DELAY_MS = 500;

export const CREATE_PROJECT_FORM_INITIAL_VALUES = {
  nameProject: '',
  descriptionProject: '',
};

export const PROJECT_SORT_OPTIONS:SelectOption<string>[] = [
  { label: 'По имени (А-Я)', value: 'name-asc' },
  { label: 'По имени (Я-А)', value: 'name-desc' },
  { label: 'По дате (сначала старые)', value: 'date-asc' },
  { label: 'По дате (сначала новые)', value: 'date-desc' },
];

export const INITIAL_SORT_OPTIONS = PROJECT_SORT_OPTIONS[0].value as SortOption;

export const PROJECTS_PER_PAGE_COUNTS = {
  count_5: 5,
  count_10: 10,
  count_15: 15,
};

export const MAX_PROJECTS_PER_PAGE_OPTIONS:number[] = [
  PROJECTS_PER_PAGE_COUNTS.count_5,
  PROJECTS_PER_PAGE_COUNTS.count_10,
  PROJECTS_PER_PAGE_COUNTS.count_15,
];

const createProjectValidationConfig = {
  nameMinLength: 2,
  nameMaxLength: 25,
  descriptionMaxLength: 100,
};

export const CREATE_PROJECT_VALIDATION_SCHEMA: yup.ObjectSchema<CreateProject> = yup.object({
  nameProject: yup
    .string()
    .required('Название проекта обязательно')
    .min(createProjectValidationConfig.nameMinLength, 'Название должно быть не менее 2 символов')
    .max(createProjectValidationConfig.nameMaxLength, 'Название не должно превышать 25 символов'),
  descriptionProject: yup
    .string()
    .optional()
    .max(createProjectValidationConfig.descriptionMaxLength, 'Описание не должно превышать 100 символов'),
});
