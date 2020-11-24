import { NextPage } from 'next';
import Link from 'next/link';

import { useAuth } from '../utils/contexts/auth-context';

const Nav: NextPage = () => {
  const { signed, user, signOut } = useAuth();
  return (
    <>
      {signed && (
        <ul>
          <li>
            <Link href={`/account/${user.identifier}`}>Account</Link>
          </li>
          <li>
            <Link href="/transaction">Transaction</Link>
          </li>
          <li>
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default Nav;
