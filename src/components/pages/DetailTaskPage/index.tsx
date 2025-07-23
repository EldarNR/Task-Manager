// libraries
import { type FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// components
import CommentsSection from 'components/pages/DetailTaskPage/CommentSection';
import EditTaskModal from 'components/pages/DetailTaskPage/EditTaskModal';
import FileSection from 'components/pages/DetailTaskPage/FileSection';
import StatusModal from 'components/pages/DetailTaskPage/StatusModal';
import TaskDetailsCard from 'components/pages/DetailTaskPage/TaskDetailsCard';
import TaskHeader from 'components/pages/DetailTaskPage/TaskHeader';
import Loader from 'components/shared/ui-kit/Loader';
// context
import { useToasterContext } from 'contexts/Toaster/useToasterContext';
// hooks
import { useTaskActions } from 'hooks/useTaskActions';
import { useTaskData } from 'hooks/useTaskData';
// types
import type { EditTaskFormData } from 'components/pages/DetailTaskPage/types';
import { TaskStatus } from 'types/types';

// actions
import { useGetTaskFilesQuery, useGetTaskQuery } from 'store/services/tasks/tasks';
import { useGetAllUsersQuery } from 'store/services/user/user';

const DetailTaskPage: FC = () => {
  const { taskId: taskIdParam } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { toaster } = useToasterContext();

  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const {
    data: taskData,
    isLoading: isTaskLoading,
    refetch: refetchTask,
  } = useGetTaskQuery(Number(taskIdParam));

  const {
    data: filesData = [],
    isLoading: isLoadingFiles,
    refetch: refetchFiles,
  } = useGetTaskFilesQuery(Number(taskIdParam), {
    skip: !taskIdParam,
  });

  const { data: allUsersData } = useGetAllUsersQuery();

  const taskDataHook = useTaskData(taskData, allUsersData);
  const {
    handleStatusUpdate,
    handleTaskUpdate,
    handleDelete,
    isDeletingFile,
    isUploadingFile,
    isUpdatingStatus,
    isUpdatingTask,
    handleFileDelete,
    handleFileUpload,
    handleCommentSubmit,
  } = useTaskActions({
    task: taskData,
    refetchTask,
    refetchFiles,
    toaster,
    allUsersData,
    navigate,
  });

  const onStatusUpdate = async ({ status }: { status: TaskStatus }) => {
    await handleStatusUpdate(status);
    setIsStatusModalOpen(false);
  };
  const onTaskUpdate = async (formData: EditTaskFormData) => {
    await handleTaskUpdate(formData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="detail-task-page">
      {isTaskLoading ? (
        <Loader />
      ) : (
        <>
          <TaskHeader
            onDeleteClick={handleDelete}
            onEditClick={() => setIsEditModalOpen(true)}
            onStatusChange={() => setIsStatusModalOpen(true)}
            task={taskData}
          />

          <div className="detail-task-page--content">
            <TaskDetailsCard
              task={{
                ...taskData,
                assignee: {
                  ...taskData.assignee,
                  name: taskDataHook.assigneeName,
                },
              }}
            />
            <FileSection
              files={filesData}
              isDeletingFile={isDeletingFile}
              isLoading={isLoadingFiles}
              isUploadingFile={isUploadingFile}
              onFileDelete={handleFileDelete}
              onFileUpload={handleFileUpload}
            />

            <CommentsSection
              comments={taskData?.comments || []}
              onCommentSubmit={handleCommentSubmit}
            />
          </div>

          <StatusModal
            initialValues={taskDataHook.getFormInitialValues()}
            isOpen={isStatusModalOpen}
            isUpdating={isUpdatingStatus}
            onClose={() => setIsStatusModalOpen(false)}
            onSubmit={onStatusUpdate}
          />

          <EditTaskModal
            initialValues={taskDataHook.getEditFormInitialValues()}
            isOpen={isEditModalOpen}
            isUpdating={isUpdatingTask}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={onTaskUpdate}
            usersOptions={taskDataHook.usersOptions}
          />
        </>
      )}
    </div>
  );
};

export default DetailTaskPage;
