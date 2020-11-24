import { createContext, useContext, useState, useEffect } from 'react';

import { User } from '../../interfaces/models';
import api from '../api';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: any;
  signIn(identifier: string): Promise<void>;
  signOut(): void;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function signIn(identifier: string): Promise<void> {
    setLoading(true);

    await api
      .get<User>(`/user/${identifier}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        throw new Error('User not found with given identifier.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function signOut() {
    window.location.pathname = '/';
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loading, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
