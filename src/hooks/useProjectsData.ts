import { useEffect, useState } from 'react';
import { SERVER_LOADING_DELAY_MS } from 'components/pages/ProjectsPage/config';
import { useSearchContext } from 'contexts/Search/useSearchContext';
import { useToasterContext } from 'contexts/Toaster/useToasterContext';
import type { SortOption } from 'components/pages/ProjectsPage/types';

import { useGetProjectsQuery, useSearchProjectsQuery } from 'store/services/projects/projects';

interface UseProjectsDataProps {
  currentPage: number;
  projectsPerPage: number;
  sortOption: SortOption;
}

export const useProjectsData = ({ currentPage, projectsPerPage, sortOption }: UseProjectsDataProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { searchTerm } = useSearchContext();
  const { toaster } = useToasterContext();

  const queryParams = {
    page: currentPage,
    limit: projectsPerPage,
    sort: sortOption,
  };

  const {
    data: projectsResponse,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetProjectsQuery(queryParams);

  const {
    data: searchResponse,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useSearchProjectsQuery({ searchProjectByName: searchTerm });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isProjectsLoading) {
      setIsFetching(true);
      const timer = setTimeout(() => setIsFetching(false), SERVER_LOADING_DELAY_MS);

      return () => clearTimeout(timer);
    }
    setIsFetching(false);
  }, [isProjectsLoading]);

  useEffect(() => {
    if (isProjectsError) {
      toaster?.show({ message: 'Ошибка при загрузке проектов', intent: 'danger' });
    }
  }, [isProjectsError, toaster]);

  const shouldUseSearch = Boolean(searchTerm.trim());
  const projectList = shouldUseSearch ? searchResponse?.data || [] : projectsResponse?.data || [];
  const isLoadingData = shouldUseSearch ? isSearchLoading : isProjectsLoading;
  const isErrorData = shouldUseSearch ? isSearchError : isProjectsError;
  const totalPages = projectsResponse?.total ? Math.ceil(projectsResponse.total / projectsPerPage) : 0;

  return {
    projectList,
    isLoadingData: isLoadingData || isFetching,
    isErrorData,
    totalPages,
    shouldUseSearch,
  };
};
