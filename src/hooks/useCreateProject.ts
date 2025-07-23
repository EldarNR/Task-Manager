import { useEffect } from 'react';
import { useToasterContext } from 'contexts/Toaster/useToasterContext';
import type { CreateProject } from 'components/pages/ProjectsPage/types';

import { useCreateProjectMutation } from 'store/services/projects/projects';

export const useCreateProject = (onSuccess: () => void) => {
  const { toaster } = useToasterContext();
  const [createProject, { isLoading: isCreatingProject, isError: isCreateError, isSuccess: isCreateSuccess }] = useCreateProjectMutation();

  useEffect(() => {
    if (isCreateSuccess) {
      toaster?.show({ message: 'Проект успешно создан', intent: 'success' });
      onSuccess();
    }
    if (isCreateError) {
      toaster?.show({ message: 'Ошибка при создании проекта', intent: 'danger' });
    }
  }, [
    isCreateSuccess,
    isCreateError,
    toaster,
    onSuccess,
  ]);

  const handleCreateProject = async (event: CreateProject) => {
    try {
      const projectData = {
        name: event.nameProject,
        description: event.descriptionProject,
        createdAt: new Date().toISOString(),
      };

      await createProject(projectData).unwrap();
    } catch {
      toaster?.show({ message: 'Ошибка при создании проекта', intent: 'danger' });
    }
  };

  return {
    handleCreateProject,
    isCreatingProject,
  };
};
