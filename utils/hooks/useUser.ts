import { User } from '../../interfaces/models';
import { useAuthContext } from '../contexts/auth-context';
import { useFetch } from './useFetch';

export function useUser(): { user: User; loading: boolean } {
  const { id } = useAuthContext();

  const { data: user, error } = useFetch<User>(`/user/${id}`);
  const loading = !user && !error;

  return { user, loading };
}
