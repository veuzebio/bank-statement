import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';

import api from '../api';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  id: string;
  signIn(identifier: string): Promise<void>;
  signOut(): void;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signIn(identifier: string): Promise<void> {
    setLoading(true);

    const { data } = await api.post<string>(`/auth`, { identifier });

    if (!data) throw new Error('User not found with given identifier.');

    setId(data);
    setLoading(false);
  }

  function signOut() {
    router.replace('/');
    setId(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!id, loading, id, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
