// libraries
import {
  type ChangeEvent, type FC, useEffect, useState,
} from 'react';
// components
import { InputGroup } from '@blueprintjs/core';
// config
import { DEBOUNCE_DELAY } from 'components/pages/ProjectsPage/Search/config';
// context
import { useSearchContext } from 'contexts/Search/useSearchContext';
// hooks
import { useDebounce } from 'hooks/useDebounce';

export const Search: FC = () => {
  const [search, setSearch] = useState<string>('');
  const { setSearchTerm } = useSearchContext();
  const debouncedSearch = useDebounce<string>(search, DEBOUNCE_DELAY);

  useEffect(() => {
    setSearchTerm(debouncedSearch);
  }, [debouncedSearch, setSearchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <InputGroup
      leftIcon="search"
      onChange={handleChange}
      placeholder="Поиск проекта..."
      value={search}
    />
  );
};
