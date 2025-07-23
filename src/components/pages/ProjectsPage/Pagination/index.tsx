// libraries
import { type FC, useMemo } from 'react';
// components
import { Button, ButtonGroup } from '@blueprintjs/core';
import { PaginationNavButton } from 'components/pages/ProjectsPage/Pagination/NavButton';
// config
import { MAX_VISIBLE, START_DECREMENT_NUMBER } from 'components/pages/ProjectsPage/Pagination/config';
// types
import type { PaginationProps } from 'components/pages/ProjectsPage/Pagination/types';

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}):JSX.Element => {
  const pageRange = useMemo<number[]>(() => {
    const range = [];

    let start = Math.max(1, currentPage - START_DECREMENT_NUMBER);
    const end = Math.min(totalPages, start + MAX_VISIBLE - 1);

    if (end - start < MAX_VISIBLE - 1) {
      start = Math.max(1, end - MAX_VISIBLE + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }, [currentPage, totalPages]);

  return (
    <div className="pagination">
      <ButtonGroup>
        <PaginationNavButton
          disabled={currentPage === 1}
          icon="double-chevron-left"
          onClick={() => onPageChange(1)}
          title="Первая страница"
        />

        <PaginationNavButton
          disabled={currentPage === 1}
          icon="chevron-left"
          onClick={() => onPageChange(currentPage - 1)}
          title="Предыдущая страница"
        />

        {pageRange.map((page) => (
          <Button
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <PaginationNavButton
          disabled={currentPage === totalPages}
          icon="chevron-right"
          onClick={() => onPageChange(currentPage + 1)}
          title="Следующая страница"
        />

        <PaginationNavButton
          disabled={currentPage === totalPages}
          icon="double-chevron-right"
          onClick={() => onPageChange(totalPages)}
          title="Последняя страница"
        />
      </ButtonGroup>
    </div>
  );
};

export default Pagination;
