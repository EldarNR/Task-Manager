// libraries
import {
  type FC, useCallback, useEffect, useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
// components
import { Button } from '@blueprintjs/core';
import Header from 'components/layout/Header';
import { CreateTaskModal } from 'components/pages/ProjectPage/CreateTaskModal/CreateTaskModal';
import KanbanColumn from 'components/pages/ProjectPage/KanbanColumn';
import { renderSkeletonColumn } from 'components/pages/ProjectPage/SkeletonColumn';
import TaskItem from 'components/pages/ProjectPage/TaskItems';
import { AppRoutes } from 'constants/routes';
// config
import {
  STATUS_CREATE_TASK,
  TASKS_INITIAL_COLUMNS,
} from 'components/pages/ProjectPage/config';
// context
import { useToasterContext } from 'contexts/Toaster/useToasterContext';
import { useDragAndDrop } from 'hooks/useDragAndDrop';
// static
import ArrowLeft from 'assets/icons/arrow-left.svg?react';
// types
import type { CreateTaskFormData } from 'components/pages/ProjectPage/CreateTaskModal/types';
import type { Column, TypedColumn } from 'components/pages/ProjectPage/types';
import { type Task, TaskStatus } from 'types/types';

// actions
import { useGetProjectByIdQuery } from 'store/services/projects/projects';
import {
  useCreateTaskMutation,
  useGetTasksQuery,
} from 'store/services/tasks/tasks';
import { useGetAllUsersQuery } from 'store/services/user/user';

const ProjectPage: FC = () => {
  const [columns, setColumns] = useState(TASKS_INITIAL_COLUMNS);
  const [editingTask] = useState<number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedColumnId, setSelectedColumnId] = useState<TaskStatus>(TaskStatus.TODO);
  const [usersOption, setUsersOption] = useState<{ label: string; value: string }[]>([]);

  const { id: projectIdParam } = useParams<{ id: string }>();
  const projectId = Number(projectIdParam);

  const {
    data: taskData,
    refetch: refetchTasks,
    isLoading: isLoadingTasks,
  } = useGetTasksQuery({ id: projectId });

  const {
    data: project,
    isLoading: isLoadingProject,
  } = useGetProjectByIdQuery({ id: projectId });

  const [createTask, { isLoading: isCreatingTask }] = useCreateTaskMutation();
  const { data: allUsersData } = useGetAllUsersQuery();

  const { toaster } = useToasterContext();

  const {
    draggedOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnterColumn,
    handleDragLeaveColumn,
    handleDropOnColumn,
    handleDropOnTask,
  } = useDragAndDrop(
    columns,
    setColumns,
    refetchTasks,
  );

  useEffect(() => {
    if (taskData && Array.isArray(taskData)) {
      const tasksWithColumnId: Task[] = taskData.map((task: Task) => ({
        ...task,
        columnId: task.status,
      }));

      setColumns((prevColumns) => prevColumns.map((column: Column) => ({
        ...column,
        tasks: tasksWithColumnId.filter((task) => task.columnId === column.id),
      })));
    } else if (taskData === null || !taskData) {
      setColumns((prevColumns) => prevColumns.map((column: Column) => ({
        ...column,
        tasks: [],
      })));
    }
  }, [selectedColumnId, taskData]);

  useEffect(() => {
    if (!allUsersData) {
      return;
    }

    const userOptions = allUsersData
      .filter((user: { id: number }) => user.id !== 0)
      .map((user: { name: string; id: { toString: () => string; }; }) => ({
        label: user.name,
        value: user.id.toString(),
      }));

    setUsersOption([...userOptions]);
  }, [allUsersData]);

  const showModal = useCallback((event: boolean, columnId: TaskStatus = TaskStatus.TODO) => {
    setSelectedColumnId(columnId);
    setIsOpenModal(event);
  }, []);

  const handleForm = useCallback(async (formData: CreateTaskFormData) => {
    try {
      const newTaskData = {
        projectId,
        title: formData.title.trim(),
        description: formData.description.trim(),
        deadline: formData.deadline,
        assignee: formData.assignee,
        status: formData.status as TaskStatus,
      };

      await createTask(newTaskData).unwrap();
      setIsOpenModal(false);
      await refetchTasks();

      toaster?.show({
        message: 'Задача успешно создана',
        intent: 'success',
      });
    } catch {
      toaster?.show({
        message: 'Ошибка при создании задачи',
        intent: 'danger',
      });
    }
  }, [
    createTask,
    projectId,
    refetchTasks,
    toaster,
  ]);

  const renderTask = useCallback((task: Task) => (
    <TaskItem
      key={task.id}
      editingTask={editingTask}
      handleDragEnd={handleDragEnd}
      handleDragOver={handleDragOver}
      handleDragStart={handleDragStart}
      handleDropOnTask={handleDropOnTask}
      task={task}
    />
  ), [
    editingTask,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    handleDropOnTask,
  ]);

  const renderColumn = useCallback((column: TypedColumn) => {
    const isDraggedOver = draggedOverColumn === column.id;

    return (
      <KanbanColumn
        key={column.id}
        column={column}
        handleDragEnterColumn={handleDragEnterColumn}
        handleDragLeaveColumn={handleDragLeaveColumn}
        handleDragOver={handleDragOver}
        handleDropOnColumn={handleDropOnColumn}
        isDraggedOver={isDraggedOver}
        renderTask={renderTask}
        showModal={showModal}
      />
    );
  }, [
    draggedOverColumn,
    handleDragEnterColumn,
    handleDragLeaveColumn,
    handleDragOver,
    handleDropOnColumn,
    showModal,
    renderTask,
  ]);

  return (
    <div className="project-page">
      <Header>
        <div className="project-header">
          <div className="project-header__left">
            <Link className="back-link" to={AppRoutes.HOME}>
              <ArrowLeft />
              Назад
            </Link>
          </div>

          <div className="project-header__center">
            <h1 className="project-title">
              {isLoadingProject ? (
                <div className="skeleton-text skeleton-text--title-large" />
              ) : (
                project?.name || 'Проект'
              )}
            </h1>
          </div>

          <div className="project-header__right">
            <Button
              className="add-task-btn"
              icon="plus"
              intent="primary"
              loading={isCreatingTask}
              onClick={() => showModal(true)}
              size="large"
            >
              <span className="add-task-btn__text">Добавить задачу</span>
            </Button>
          </div>
        </div>
      </Header>

      <div className="project-content">
        <div className="kanban-board">
          <div className="kanban-columns">
            {isLoadingTasks ? (
              <>
                {renderSkeletonColumn()}
                {renderSkeletonColumn()}
                {renderSkeletonColumn()}
              </>
            ) : (
              columns.map(renderColumn)
            )}
          </div>
        </div>
      </div>

      <CreateTaskModal
        isOpen={isOpenModal}
        isSubmitting={isCreatingTask}
        onClose={() => showModal(false)}
        onSubmit={handleForm}
        selectedStatus={selectedColumnId}
        statusOptions={STATUS_CREATE_TASK}
        usersOption={usersOption}
      />
    </div>
  );
};

export default ProjectPage;
