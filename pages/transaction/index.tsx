import { NextPage } from 'next';

import TransactionForm from '../../components/transaction-form';
import TransactionList from '../../components/transaction-list';
import { useUserContext } from '../../utils/contexts/user-context';
import { useCurrency } from '../../utils/hooks';

const Transaction: NextPage = () => {
  const { user, loaded } = useUserContext();

  return (
    <>
      {loaded && (
        <>
          <div className="flex justify-center items-center">
            <div className="max-w-md w-full">
              <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Current balance {useCurrency(user.account.balance)}
              </h1>
              <TransactionForm identifier={user.identifier} />
              <TransactionList identifier={user.identifier} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Transaction;
