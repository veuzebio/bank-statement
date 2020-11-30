import { NextPage } from 'next';

import { Transaction } from '../interfaces/models';
import { useFetch } from '../utils/hooks';

const TransactionList: NextPage<{ identifier: string }> = ({ identifier }) => {
  const { data: transactions } = useFetch<Transaction[]>(
    `transaction/${identifier}`
  );

  return (
    <>
      {!transactions?.length && <p>No transactions have been made yet...</p>}

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-300">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="bg-white divide-y divide-gray-300">
                  {transactions?.map((transaction) => (
                    <tr key={transaction.value}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {transaction.value}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionList;
