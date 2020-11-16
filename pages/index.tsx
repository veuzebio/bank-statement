import { NextPage } from 'next';

import TransactionForm from '../components/transaction-form';

const Home: NextPage = () => {
  return (
    <div>
      <TransactionForm />
    </div>
  );
};

export default Home;
