// libraries
import type { Toaster } from '@blueprintjs/core';
// helpers
import { convertFileToBase64 } from 'helpers/convertFileToBase64';
import type { User } from 'store/services/tasks/types';
// types
import { type Task, TaskStatus } from 'types/types';

// store
import {
  useAddFileMutation,
  useDeleteFileMutation,
  useDeleteTaskMutation,
  useUpdateStatusTaskMutation,
  useUpdateTaskMutation,
} from 'store/services/tasks/tasks';

interface TaskActionsParams {
  task: Task;
  refetchTask: () => void;
  refetchFiles: () => void;
  toaster: Toaster;
  allUsersData: User[];
  navigate: (path: number) => void;
}

interface EditTaskFormData {
  description?: string;
  deadline?: string;
  assignee?: string;
}

interface CommentFormData {
  commentInput: string;
}

interface FileFormData {
  file: File | null;
}

export const useTaskActions = ({
  task,
  refetchTask,
  refetchFiles,
  toaster,
  allUsersData,
  navigate,
}: TaskActionsParams) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateStatusTask, { isLoading: isUpdatingStatus }] = useUpdateStatusTaskMutation();
  const [updateTask, { isLoading: isUpdatingTask }] = useUpdateTaskMutation();
  const [addFile, { isLoading: isUploadingFile }] = useAddFileMutation();
  const [deleteFile, { isLoading: isDeletingFile }] = useDeleteFileMutation();

  const handleStatusUpdate = async (status: TaskStatus) => {
    try {
      await updateStatusTask({ id: task.id, status }).unwrap();
      refetchTask();
      toaster?.show({
        message: 'Статус задачи успешно обновлен',
        intent: 'success',
      });
    } catch {
      toaster?.show({
        message: 'Ошибка при обновлении статуса задачи',
        intent: 'danger',
      });
    }
  };

  const handleTaskUpdate = async (formData: EditTaskFormData) => {
    if (!task) {
      return;
    }

    try {
      await updateTask({
        id: task.id,
        description: formData.description,
        deadline: formData.deadline,
        assignee: Number(formData.assignee),
      }).unwrap();

      toaster?.show({
        message: 'Задача успешно обновлена',
        intent: 'success',
      });

      refetchTask();
    } catch {
      toaster?.show({
        message: 'Ошибка при обновлении задачи',
        intent: 'danger',
      });
    }
  };

  const handleCommentSubmit = async (formData: CommentFormData) => {
    if (!task || !formData.commentInput.trim()) {
      toaster?.show({
        message: 'Введите текст комментария',
        intent: 'warning',
      });

      return;
    }

    try {
      const currentUserId = Number(localStorage.getItem('userID'));
      const generateId = Date.now();
      const user = allUsersData?.find((u) => u.id === currentUserId);

      const newComment = {
        id: generateId,
        text: formData.commentInput.trim(),
        createdAt: new Date().toISOString(),
        author: {
          id: user?.id || 0,
          name: user?.name || 'Неизвестный пользователь',
          avatar: user?.avatar || '',
        },
      };

      await updateTask({
        id: task.id,
        comments: [...(task.comments || []), newComment],
      }).unwrap();

      toaster?.show({
        message: 'Комментарий успешно добавлен',
        intent: 'success',
      });

      refetchTask();
    } catch {
      toaster?.show({
        message: 'Ошибка при добавлении комментария',
        intent: 'danger',
      });
    }
  };

  const handleFileUpload = async (formData: FileFormData) => {
    if (!task || !formData.file) {
      toaster?.show({
        message: 'Выберите файл для загрузки',
        intent: 'warning',
      });

      return;
    }

    try {
      const base64String = await convertFileToBase64(formData.file);

      const fileToUpload = {
        taskId: task.id,
        name: formData.file.name,
        data: base64String,
        size: formData.file.size,
        type: formData.file.type,
      };

      await addFile(fileToUpload).unwrap();

      toaster?.show({
        message: 'Файл успешно загружен',
        intent: 'success',
      });

      refetchFiles();
    } catch {
      toaster?.show({
        message: 'Ошибка при загрузке файла',
        intent: 'danger',
      });
    }
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      await deleteFile(fileId).unwrap();

      toaster?.show({
        message: 'Файл успешно удален',
        intent: 'success',
      });

      refetchFiles();
    } catch {
      toaster?.show({
        message: 'Ошибка при удалении файла',
        intent: 'danger',
      });
    }
  };

  const handleDelete = async () => {
    if (!task) {
      return;
    }
    try {
      await deleteTask({ id: task.id }).unwrap();
      toaster?.show({
        message: 'Задача успешно удалена',
        intent: 'success',
      });
      navigate(-1);
    } catch {
      toaster?.show({
        message: 'Ошибка при удалении задачи',
        intent: 'danger',
      });
    }
  };

  return {
    handleStatusUpdate,
    handleTaskUpdate,
    handleCommentSubmit,
    handleFileUpload,
    handleFileDelete,
    handleDelete,
    isUpdatingStatus,
    isUpdatingTask,
    isUploadingFile,
    isDeletingFile,
  };
};
