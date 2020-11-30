import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthContext } from '../utils/contexts/auth-context';

const Home: NextPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { loading, signIn } = useAuthContext();
  const router = useRouter();

  const verifyUserAccount = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    setErrorMessage('');

    await signIn(identifier)
      .then(() => router.push(`/account`))
      .catch((err) => setErrorMessage(err.message));
  };

  function handleIdentifierValue(value: string) {
    setIdentifier(value);
    setErrorMessage('');
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Please enter your identifier
        </h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Identifier</label>
              <input
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={identifier}
                onChange={(e) => handleIdentifierValue(e.target.value)}
              />
            </div>
          </div>

          <p className="text-red-500">{errorMessage}</p>
          {loading && (
            <p className="text-gray-500">
              Please wait, we are getting your information...
            </p>
          )}

          <div>
            <button
              className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={(e) => verifyUserAccount(e)}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
