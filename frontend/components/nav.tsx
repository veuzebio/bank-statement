import { NextPage } from 'next';
import Link from 'next/link';
import { useAccountContext } from '../utils/contexts/account';

interface NavProps {
  links?: { address: string; name: string; validAuth?: boolean }[];
}

const Nav: NextPage<NavProps> = ({ links }) => {
  const { stored } = useAccountContext();
  return (
    <nav className="flex justify-around items-center border-b-2 border-gray-100 py-6 bg-white">
      {links?.map((link) => {
        if (link.validAuth && !stored) return;

        return (
          <span
            key={link.name}
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            <Link href={link.address}>{link.name}</Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Nav;
