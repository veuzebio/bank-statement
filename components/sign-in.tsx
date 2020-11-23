import { NextPage } from 'next';

import { useAuth } from '../utils/contexts/auth-context';

const SignIn: NextPage = () => {
  const { user, signed, signOut } = useAuth();

  return (
    <>
      {!signed && <div>Not signed in :(</div>}
      {signed && (
        <div>
          Signed in as {user.name}
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default SignIn;
