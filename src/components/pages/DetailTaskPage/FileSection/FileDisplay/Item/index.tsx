// libraries
import { type FC, useState } from 'react';
// components
import { Button, Icon } from '@blueprintjs/core';
// types
import type { FileDisplayItemProps } from 'components/pages/DetailTaskPage/FileSection/FileDisplay/Item/types';

export const FileDisplayItem: FC<FileDisplayItemProps> = ({
  file,
  onDownload,
  onDelete,
  formatFileSize,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    setIsDeleting(true);
    try {
      onDelete(file.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="file-display__item">
      <div className="file-display__item-info">
        <Icon icon="document" />
        <div className="file-display__item-details">
          <div className="file-display__item-name" title={file.name}>
            {file.name}
          </div>
          <div className="file-display__item-size">
            {formatFileSize(file.size)}
          </div>
        </div>
      </div>

      <div className="file-display__actions">
        <Button
          icon="download"
          onClick={() => onDownload(file)}
          title="Скачать файл"
          variant="minimal"
        />
        {onDelete && (
        <Button
          icon="trash"
          intent="danger"
          loading={isDeleting}
          onClick={handleDelete}
          title="Удалить файл"
          variant="minimal"
        />
        )}
      </div>
    </div>
  );
};
