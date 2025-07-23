// libraries
import type { Dispatch, DragEvent, SetStateAction } from 'react';
import { useCallback, useRef, useState } from 'react';
// context
import { useToasterContext } from 'contexts/Toaster/useToasterContext';
// components
import type { TypedColumn } from 'components/pages/ProjectPage/types';
import { type Task, TaskStatus } from 'types/types';

// store
import { useUpdateStatusTaskMutation } from 'store/services/tasks/tasks';

export const useDragAndDrop = (
  columns: TypedColumn[],
  setColumns: Dispatch<SetStateAction<TypedColumn[]>>,
  refetchTasks: () => void,
) => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<TaskStatus | null>(null);
  const dragCounter = useRef<Record<string, number>>({});

  const [updateStatusTask] = useUpdateStatusTaskMutation();

  const { toaster } = useToasterContext();

  const findTaskAndColumn = useCallback((taskId: string) => {
    let foundTask: Task | null = null;
    let foundColumn: TypedColumn | null = null;

    columns.some((column) => {
      const task = column.tasks.find((t) => String(t.id) === taskId);

      if (task) {
        foundTask = task;
        foundColumn = column;

        return true;
      }

      return false;
    });

    return { task: foundTask, column: foundColumn };
  }, [columns]);

  const handleDragStart = useCallback((e: DragEvent<HTMLDivElement>, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null);
    setDraggedOverColumn(null);
    dragCounter.current = {};
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnterColumn = useCallback((e: DragEvent<HTMLDivElement>, columnId: TaskStatus) => {
    e.preventDefault();
    dragCounter.current[columnId] = (dragCounter.current[columnId] || 0) + 1;
    setDraggedOverColumn(columnId);
  }, []);

  const handleDragLeaveColumn = useCallback((e: DragEvent<HTMLDivElement>, columnId: TaskStatus) => {
    e.preventDefault();
    if (dragCounter.current[columnId]) {
      dragCounter.current[columnId] -= 1;
      if (dragCounter.current[columnId] <= 0) {
        setDraggedOverColumn(null);
      }
    }
  }, []);

  const updateTaskStatus = useCallback(async (task: Task, newStatus: TaskStatus) => {
    try {
      await updateStatusTask({ id: task.id, status: newStatus }).unwrap();
      refetchTasks();
    } catch {
      toaster?.show({
        message: 'Ошибка при обновлении статуса',
        intent: 'danger',
      });
    }
  }, [
    updateStatusTask,
    refetchTasks,
    toaster,
  ]);

  const handleDropOnColumn = useCallback(async (
    e: DragEvent,
    targetColumnId: TaskStatus,
  ) => {
    e.preventDefault();
    dragCounter.current = {};

    if (!draggedTask) {
      return;
    }

    const { task, column: sourceColumn } = findTaskAndColumn(draggedTask);

    if (!task || !sourceColumn || sourceColumn.id === targetColumnId) {
      setDraggedTask(null);
      setDraggedOverColumn(null);

      return;
    }

    const newStatus = targetColumnId;

    setColumns((prev) => prev.map((col) => {
      if (col.id === sourceColumn.id) {
        return { ...col, tasks: col.tasks.filter((t) => t.id !== task.id) };
      }
      if (col.id === targetColumnId) {
        return {
          ...col,
          tasks: [...col.tasks, { ...task, columnId: targetColumnId, status: newStatus }],
        };
      }

      return col;
    }));

    await updateTaskStatus(task, newStatus);

    setDraggedTask(null);
    setDraggedOverColumn(null);
  }, [
    draggedTask,
    findTaskAndColumn,
    setColumns,
    updateTaskStatus,
  ]);

  const handleDropOnTask = useCallback(async (
    e: DragEvent<HTMLDivElement>,
    targetTask: Task,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedTask || draggedTask === String(targetTask.id)) {
      return;
    }

    const { task: sourceTask, column: sourceColumn } = findTaskAndColumn(draggedTask);
    const { column: targetColumn } = findTaskAndColumn(String(targetTask.id));

    if (!sourceTask || !sourceColumn || !targetColumn) {
      return;
    }

    const targetColumnId = targetColumn.id;
    const newStatus = targetColumnId;

    const targetTaskIndex = targetColumn.tasks.findIndex((t) => t.id === targetTask.id);

    setColumns((prevColumns) => prevColumns.map((column) => {
      if (column.id === sourceColumn.id && sourceColumn.id !== targetColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter((t) => t.id !== sourceTask.id),
        };
      }

      if (column.id === targetColumnId) {
        const updatedTasks = [...column.tasks];

        if (sourceColumn.id === targetColumnId) {
          const sourceIndex = updatedTasks.findIndex((t) => t.id === sourceTask.id);

          updatedTasks.splice(sourceIndex, 1);
          updatedTasks.splice(targetTaskIndex, 0, sourceTask);
        } else {
          const taskWithNewStatus = { ...sourceTask, columnId: targetColumnId, status: newStatus };

          updatedTasks.splice(targetTaskIndex, 0, taskWithNewStatus);
        }

        return {
          ...column,
          tasks: updatedTasks,
        };
      }

      return column;
    }));

    if (sourceColumn.id !== targetColumnId) {
      await updateTaskStatus(sourceTask, newStatus);
    }

    setDraggedTask(null);
    setDraggedOverColumn(null);
  }, [
    draggedTask,
    findTaskAndColumn,
    setColumns,
    updateTaskStatus,
  ]);

  return {
    draggedTask,
    draggedOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnterColumn,
    handleDragLeaveColumn,
    handleDropOnColumn,
    handleDropOnTask,
  };
};
