// libraries
import { type ChangeEvent, type FC, useState } from 'react';
import { Link } from 'react-router-dom';
// components
import Header from 'components/layout/Header';
import { Controls } from 'components/pages/ProjectsPage/Controls/Controls';
import { CreateProjectModal } from 'components/pages/ProjectsPage/CreateProjectModal/CreateProjectModal';
import { ProjectsHeader } from 'components/pages/ProjectsPage/Header/Header';
import { List } from 'components/pages/ProjectsPage/List/List';
import Pagination from 'components/pages/ProjectsPage/Pagination';
import { Search } from 'components/pages/ProjectsPage/Search/Search';
import Loader from 'components/shared/ui-kit/Loader';
// constants
import { AppRoutes } from 'constants/routes';
// config
import { INITIAL_SORT_OPTIONS, PROJECTS_PER_PAGE_COUNTS } from 'components/pages/ProjectsPage/config';
// hooks
import { useCreateProject } from 'hooks/useCreateProject';
import { useProjectsData } from 'hooks/useProjectsData';
// types
import type { SortOption } from 'components/pages/ProjectsPage/types';

const ProjectsPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<SortOption>(INITIAL_SORT_OPTIONS);
  const [projectsPerPage, setProjectsPerPage] = useState<number>(PROJECTS_PER_PAGE_COUNTS.count_10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    projectList, isLoadingData, isErrorData, totalPages, shouldUseSearch,
  } = useProjectsData({
    currentPage,
    projectsPerPage,
    sortOption,
  });

  const { handleCreateProject, isCreatingProject } = useCreateProject(() => setIsModalOpen(false));

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
    setCurrentPage(1);
  };

  const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setProjectsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  if (isErrorData) {
    return <div>Ошибка при загрузке проектов</div>;
  }

  return (
    <div className="projects-container">
      <Header>
        <div className="header--left-container">
          <Link to={AppRoutes.HOME}>LOGO</Link>
          <Search />
        </div>
        <Link to={AppRoutes.PROFILE}>Профиль</Link>
      </Header>

      <ProjectsHeader onCreateProject={() => setIsModalOpen(true)} />

      <CreateProjectModal
        isCreating={isCreatingProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <Controls
        onPerPageChange={handlePerPageChange}
        onSortChange={handleSortChange}
        projectsPerPage={projectsPerPage}
        sortOption={sortOption}
      />
      {
        isLoadingData ? (
          <Loader fullScreen />
        )
          : (
            <>
              <List projects={projectList} />

              {!shouldUseSearch && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
              />
              )}
            </>
          )
      }
    </div>
  );
};

export default ProjectsPage;
