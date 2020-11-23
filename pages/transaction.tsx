import { NextPage } from 'next';

import TransactionForm from '../components/transaction-form';
import { useAuth } from '../utils/contexts/auth-context';

const Transaction: NextPage = () => {
  const context = useAuth();

  return (
    <>
      <h1>TRANSACTION</h1>
      <TransactionForm />
    </>
  );
};

export default Transaction;
