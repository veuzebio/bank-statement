import { NextPage } from 'next';
import Link from 'next/link';

import { useAuthContext } from '../utils/contexts/auth-context';

const Nav: NextPage = () => {
  const { signed, signOut } = useAuthContext();

  return (
    <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <a href="#">
          <span className="sr-only">Logo</span>
          <img
            className="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt=""
          />
        </a>
      </div>
      {signed && (
        <>
          <nav className="md:flex space-x-10">
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              <Link href={`/account`}>Account</Link>
            </a>
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              <Link href="/transaction">Transaction</Link>
            </a>
          </nav>
          <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="#"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={() => signOut()}
            >
              Sign Out
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
