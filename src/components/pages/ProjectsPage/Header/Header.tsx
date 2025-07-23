// libraries
import { type FC } from 'react';
// components
import { Button } from '@blueprintjs/core';
// types
import type { ProjectsHeaderProps } from 'components/pages/ProjectsPage/Header/types';

export const ProjectsHeader: FC<ProjectsHeaderProps> = ({ onCreateProject }) => (
  <div className="projects-header">
    <h1>Проекты</h1>
    <Button icon="plus" intent="primary" onClick={onCreateProject}>
      Создать проект
    </Button>
  </div>
);
