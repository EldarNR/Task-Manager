// libraries
import type { ReactNode } from 'react';
// context
import { SearchProvider } from 'contexts/Search/SearchProvider';
import { ToasterProvider } from 'contexts/Toaster/ToasterProvider';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProviderProps) => (
  <ToasterProvider>
    <SearchProvider>
      {children}
    </SearchProvider>
  </ToasterProvider>
);
