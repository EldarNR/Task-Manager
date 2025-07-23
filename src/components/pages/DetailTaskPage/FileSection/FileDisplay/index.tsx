// libraries
import { type FC } from 'react';
// components
import { FileDisplayItem } from 'components/pages/DetailTaskPage/FileSection/FileDisplay/Item';
// config
import { KILOBYTE, SIZES, TO_FIXED_NUM } from 'components/pages/DetailTaskPage/FileSection/FileDisplay/config';
// context
import { useToasterContext } from 'contexts/Toaster/useToasterContext';
// types
import type { FileDisplayProps } from 'components/pages/DetailTaskPage/FileSection/FileDisplay/types';
import type { TaskFile } from 'store/services/tasks/types';

const FileDisplay: FC<FileDisplayProps> = ({
  files = [],
  onDelete,
  isDeleting = false,
}) => {
  const { toaster } = useToasterContext();

  const formatFileSize = (bytes: number): string => {
    if (!bytes) {
      return 'Неизвестно';
    }

    const i = Math.floor(Math.log(bytes) / Math.log(KILOBYTE));

    return `${parseFloat((bytes / KILOBYTE ** i).toFixed(TO_FIXED_NUM))} ${SIZES[i]}`;
  };

  const handleDownload = (file: TaskFile) => {
    try {
      if (!file?.data) {
        toaster?.show({
          message: 'Отсутствуют данные файла',
          intent: 'danger',
        });

        return;
      }

      let downloadUrl: string;

      if (file.data.startsWith('data:')) {
        downloadUrl = file.data;
      } else {
        const mimeType = file.type || 'application/octet-stream';

        downloadUrl = `data:${mimeType};base64,${file.data}`;
      }

      const link = document.createElement('a');

      link.href = downloadUrl;
      link.download = file.name;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toaster?.show({
        message: 'Файл успешно скачан',
        intent: 'success',
      });
    } catch {
      toaster?.show({
        message: 'Ошибка при скачивании файла',
        intent: 'danger',
      });
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!onDelete) {
      return;
    }
    try {
      await onDelete(fileId);
    } catch {
      toaster?.show({
        message: 'Ошибка при удалении файла',
        intent: 'danger',
      });
    }
  };

  return (
    <div className="file-display">
      {(!files || files.length === 0) ? (
        <div className="file-display__empty">Файлы отсутствуют</div>
      ) : (
        <>
          <div className="file-display__header">
            <span className="file-display__title">
              Файлы (
              {files.length}
              )
            </span>
          </div>

          <div className="file-display__list">
            {files.map((file) => (
              <FileDisplayItem
                key={file.id}
                file={file}
                formatFileSize={formatFileSize}
                isDeleting={isDeleting}
                onDelete={onDelete ? handleDelete : null}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FileDisplay;
