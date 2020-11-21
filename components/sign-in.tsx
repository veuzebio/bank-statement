import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';

const SignIn: NextPage = () => {
  const [session, loading] = useSession();
  return (
    <>
      {loading && <p>Loading...</p>}
      {!session && (
        <div>
          Not signed in
          <button onClick={(): Promise<void> => signIn('auth0')}>
            Sign in
          </button>
        </div>
      )}
      {session && (
        <div>
          Signed in as {session.user.email}
          <button onClick={(): Promise<void> => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default SignIn;
