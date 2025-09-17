/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext } from 'react';

import { useUser } from '@/hooks/useUser';

import { User } from '@/types';

type ContextType = {
  user: User | undefined;
};

export const GlobalContext = createContext<ContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: PropsWithChildren<{}>) => {
  const { user } = useUser();

  return (
    <GlobalContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used inside the GlobalProvider');
  }

  return context;
};
