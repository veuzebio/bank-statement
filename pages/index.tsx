import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../utils/contexts/auth-context';

const Home: NextPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, signIn } = useAuth();
  const router = useRouter();

  const verifyUserAccount = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    await signIn(identifier)
      .then(() => router.push(`/account/${identifier}`))
      .catch((err) => setErrorMessage(err.message));
  };

  function handleIdentifierValue(value: string) {
    setIdentifier(value);

    if (errorMessage.length) setErrorMessage('');
  }

  return (
    <>
      <h1>Please enter your identifier</h1>
      <form>
        <input
          type="text"
          value={identifier}
          onChange={(e) => handleIdentifierValue(e.target.value)}
        />
        {!loading && (
          <button type="button" onClick={(e) => verifyUserAccount(e)}>
            Continue
          </button>
        )}
      </form>
      <p>{errorMessage}</p>
      {loading && <p>Please wait, we are getting your information...</p>}
    </>
  );
};

export default Home;
