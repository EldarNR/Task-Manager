// libraries
import { type FC } from 'react';
import { Link } from 'react-router-dom';
// types
import type { ProjectsListProps } from 'components/pages/ProjectsPage/List/types';

export const List: FC<ProjectsListProps> = ({ projects }) => (
  projects?.length ? (
    <ul className="projects-list">
      {projects.map(({
        id, name, description, createdAt,
      }) => (
        <li className="project-item">
          <Link key={id} to={`/project/${id}`}>
            <h3>{name}</h3>
            <p>{description}</p>
            <small>
              Создан:
              {' '}
              {new Date(createdAt).toLocaleDateString()}
            </small>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div>Проекты не найдены</div>
  )
);
