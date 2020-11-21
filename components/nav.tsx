import { NextPage } from 'next';
import Link from 'next/link';
import SignIn from './sign-in';

const Nav: NextPage = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
        <li>
          <Link href="/transaction">Transaction</Link>
        </li>
        <li>
          <SignIn />
        </li>
      </ul>
    </>
  );
};

export default Nav;
