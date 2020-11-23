import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../utils/contexts/auth-context';

const Home: NextPage = () => {
  const [identifier, setIdentifier] = useState('');
  const { signed, loading, signIn } = useAuth();
  const router = useRouter();

  const verifyUserAccount = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    await signIn(identifier).then(() => router.push('/account'));
  };

  return (
    <>
      <h1>Please enter your identifier</h1>
      <form>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        {loading && <p>Please wait, we are getting your information...</p>}
        {!loading && (
          <button type="button" onClick={(e) => verifyUserAccount(e)}>
            Continue
          </button>
        )}
      </form>
    </>
  );
};

export default Home;
