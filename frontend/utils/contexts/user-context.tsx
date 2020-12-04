import { createContext, useContext, useEffect, useState } from 'react';

import { User } from '../../interfaces/models';
import { useUser } from '../hooks/useUser';

const UserContext = createContext<UserContextData>({} as UserContextData);

export interface UserContextData {
  loading: boolean;
  loaded: boolean;
  user: User;
}

export const UserProvider: React.FC = ({ children }) => {
  const { user, loading } = useUser();

  return (
    <UserContext.Provider value={{ loaded: !!user, loading, user }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext(): UserContextData {
  const context = useContext(UserContext);

  return context;
}
