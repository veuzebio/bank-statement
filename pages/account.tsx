import { NextPage } from 'next';

import CreateAccount from '../components/create-account';
import { useAuth } from '../utils/contexts/auth-context';

const AccountPage: NextPage = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Welcome!</h1>
      {user && (
        <>
          <h3>Identifier: {user.identifier}</h3>
          {user.account && (
            <>
              <h3>Name: {user.name}</h3>
              <h3>Account balance: {user.account.balance}</h3>
            </>
          )}
          {!user.account && <CreateAccount />}
        </>
      )}
    </>
  );
};

export default AccountPage;
