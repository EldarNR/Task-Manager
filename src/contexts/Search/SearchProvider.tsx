// libraries
import { type ReactNode, useMemo, useState } from 'react';
// context
import { SearchContext } from 'contexts/Search/useSearchContext';

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const value = useMemo(() => ({ searchTerm, setSearchTerm }), [searchTerm]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
