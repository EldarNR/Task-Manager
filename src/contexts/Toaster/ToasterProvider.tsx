// libraries
import type { FC, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
// components
import { OverlayToaster, Toaster } from '@blueprintjs/core';
// context
import { ToasterProviderContext } from 'contexts/Toaster/useToasterContext';

interface ToasterProviderProps {
  children: ReactNode;
}

const initToaster = (): Promise<Toaster> => OverlayToaster.createAsync(
  { position: 'top-right' },
  {
    domRenderer: (toaster, containerElement) => createRoot(containerElement).render(toaster),
  },
);

export const ToasterProvider: FC<ToasterProviderProps> = ({ children }) => {
  const [toaster, setToaster] = useState<Toaster | null>(null);

  useEffect(() => {
    initToaster()
      .then((currentToaster) => {
        setToaster(currentToaster);
      })
      .catch(() => {});
  }, []);

  const stateValue = useMemo(
    () => ({
      toaster,
    }),
    [toaster],
  );

  if (!stateValue.toaster) {
    return null;
  }

  return <ToasterProviderContext.Provider value={stateValue}>{children}</ToasterProviderContext.Provider>;
};
