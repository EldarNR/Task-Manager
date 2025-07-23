// libraries
import { type FC } from 'react';
// components
import { Button } from '@blueprintjs/core';
import FileDisplay from 'components/pages/DetailTaskPage/FileSection/FileDisplay';
import { Form } from 'components/shared/Form';
import { FormControl } from 'components/shared/Form/FormControl';
import Loader from 'components/shared/ui-kit/Loader';
// types
import type { FileSectionProps } from 'components/pages/DetailTaskPage/FileSection/types';

const FileSection: FC<FileSectionProps> = ({
  files,
  isLoading,
  onFileUpload,
  onFileDelete,
  isUploadingFile,
  isDeletingFile,
}) => (
  <div className="files-section">
    <h3 className="files-section--title">Файлы</h3>

    {isLoading ? (
      <Loader />
    ) : (
      <FileDisplay
        files={files}
        isDeleting={isDeletingFile}
        onDelete={onFileDelete}
      />
    )}

    <div className="files-section--upload-form">
      <Form
        onSubmit={onFileUpload}
      >
        <FormControl
          fieldType="fileInput"
          label="Загрузить файл"
          name="file"
        />
        <div className="mt-md">
          <Button
            intent="primary"
            loading={isUploadingFile}
            type="submit"
          >
            Загрузить файл
          </Button>
        </div>
      </Form>
    </div>
  </div>
);

export default FileSection;
