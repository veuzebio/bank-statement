import { NextPage } from 'next';

import { Transaction } from '../interfaces/models';
import { useFetch } from '../utils/hooks';

const TransactionList: NextPage<{ identifier: string }> = ({ identifier }) => {
  const { data: transactions, error } = useFetch<Transaction[]>(
    `transaction/${identifier}`
  );

  return (
    <>
      {!transactions?.length && <p>No transactions have been made yet...</p>}
      <ul>
        {transactions?.map((transaction) => (
          <li key={transaction.value}>{transaction.value}</li>
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
