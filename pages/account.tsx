import { NextPage } from 'next';
import { useSession } from 'next-auth/client';

import CreateAccount from '../components/create-account';
import { useFetch } from '../utils/hooks/useFetch';
import { Account } from '../interfaces/models';

const AccountPage: NextPage = () => {
  const [session] = useSession();
  const { data, error } = useFetch<Account>(`/account/${session?.user.email}`);

  return (
    <>
      {session && (
        <>
          <h1>Welcome!</h1>
          <h1>Email: {session?.user.email}</h1>
        </>
      )}
      {session && data && (
        <>
          <h1>Name: {data?.name}</h1>
          <h1>Account amount: {data?.amount}</h1>
        </>
      )}
      {session && error && <CreateAccount email={session?.user.email} />}
    </>
  );
};

export default AccountPage;
