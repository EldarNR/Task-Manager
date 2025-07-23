// libraries
import { createContext, useContext } from 'react';
// components
import { Toaster } from '@blueprintjs/core';

interface ToasterContextState {
  toaster: Toaster;
}

export const ToasterProviderContext = createContext<ToasterContextState | null>(null);

export const useToasterContext = (): ToasterContextState => {
  const data = useContext(ToasterProviderContext);

  if (!data) {
    throw new Error('Cannot use `useToasterContext` outside of `ToasterProvider`');
  }

  return data;
};
