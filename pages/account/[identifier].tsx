import { NextPage } from 'next';
import { useRouter } from 'next/router';

import CreateAccount from '../../components/create-account';
import { useAuth } from '../../utils/contexts/auth-context';
import { useCurrency } from '../../utils/hooks';

const AccountByIdentifierPage: NextPage = () => {
  const router = useRouter();
  const { identifier } = router.query;

  // TODO: pegar usuario da api
  const { user, signed } = useAuth();

  return (
    <>
      {signed && (
        <>
          <h1>Welcome {user.name}</h1>
          {user.account && (
            <>
              <p>Your current account balance is</p>
              <h3>{useCurrency(user.account.balance)}</h3>
            </>
          )}
          {!user.account && <CreateAccount identifier={identifier as string} />}
        </>
      )}
    </>
  );
};

export default AccountByIdentifierPage;
