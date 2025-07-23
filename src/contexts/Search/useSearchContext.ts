// libraries
import { createContext, useContext } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
export const SearchContext = createContext<SearchContextType | null>(null);

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider');
  }

  return context;
};
