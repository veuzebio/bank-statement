import { NextPage } from 'next';

import TransactionForm from '../components/transaction-form';
import TransactionList from '../components/transaction-list';
import { useAuth } from '../utils/contexts/auth-context';
import { useCurrency } from '../utils/hooks';

const Transaction: NextPage = () => {
  const { user, signed } = useAuth();

  return (
    <>
      {signed && (
        <>
          <h1>Current balance {useCurrency(user.account.balance)}</h1>
          <TransactionForm identifier={user.identifier} />
          <TransactionList identifier={user.identifier} />
        </>
      )}
    </>
  );
};

export default Transaction;
