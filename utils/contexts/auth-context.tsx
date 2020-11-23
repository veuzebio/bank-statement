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
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signIn(identifier: string): Promise<void> {
    setLoading(true);

    await api
      .get<User>(`/user/${identifier}`)
      .then((res) => {
        setUser(res.data);
        setSigned(true);
      })
      .catch((err) => {
        console.log('USUARIO NAO CADASTRADO', err);
        return err;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function signOut() {
    window.location.pathname = '/';
    setSigned(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed, loading, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
