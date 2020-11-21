import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';

const Home: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <>
      {loading && <h1>LOADING...</h1>}
      {!session && (
        <div>
          <button onClick={(): Promise<void> => signIn('auth0')}>
            Sign in
          </button>
        </div>
      )}
      {session && (
        <div>
          Signed in as {session.user.name} <br />
          <button onClick={(): Promise<void> => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default Home;
