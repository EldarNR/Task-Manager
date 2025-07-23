// libraries
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
// config
import {
  TASK_FORM_INITIAL_VALUES,
} from 'components/pages/ProjectPage/config';
// types
import type { CreateTaskFormData } from 'components/pages/ProjectPage/CreateTaskModal/types';
import type { User } from 'store/services/tasks/types';
import { type SelectOption, type Task, TaskStatus } from 'types/types';

interface EditTaskFormData {
  description?: string;
  deadline?: string;
  assignee?: string;
}

export const useTaskData = (task: Task | undefined, allUsersData: User[] | undefined) => {
  const [selectedColumnId, setSelectedColumnId] = useState<TaskStatus>(TaskStatus.TODO);
  const [usersOptions, setUsersOptions] = useState<SelectOption<string>[]>([]);

  const assigneeName = useMemo(() => {
    if (!allUsersData || !task?.assignee.id) {
      return 'Неизвестно';
    }

    const user = allUsersData.find((u) => u.id === task.assignee.id);

    return user?.name || 'Неизвестно';
  }, [allUsersData, task?.assignee]);

  useEffect(() => {
    if (!allUsersData) {
      return;
    }

    const userOptions = allUsersData.map((user) => ({
      label: user.name,
      value: user.id.toString(),
    }));

    setUsersOptions(userOptions);
  }, [allUsersData]);

  useEffect(() => {
    if (task?.status) {
      setSelectedColumnId(task.status);
    }
  }, [task?.status]);

  const getFormInitialValues = useCallback((): CreateTaskFormData => ({
    ...TASK_FORM_INITIAL_VALUES,
    title: task?.title || null,
    status: task?.status || selectedColumnId,
  }), [task, selectedColumnId]);

  const getEditFormInitialValues = useCallback((): EditTaskFormData => ({
    description: task?.description || null,
    deadline: task?.deadline || null,
    assignee: task?.assignee.toString() || null,
  }), [task]);

  return {
    assigneeName,
    usersOptions,
    selectedColumnId,
    getFormInitialValues,
    getEditFormInitialValues,
  };
};
