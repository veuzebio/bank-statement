import { NextPage } from 'next';
import { useState } from 'react';

import api from '../utils/api';

const TransactionForm: NextPage<{ identifier: string }> = ({ identifier }) => {
  const [inputValue, setInputValue] = useState('');

  async function submitTransaction() {
    await api.post(`transaction/${identifier}`, { value: inputValue });
  }

  return (
    <>
      <form className="my-8">
        <div className="mt-2 flex items-center">
          <input
            type="text"
            required
            className="group flex-1 appearance-none relative block px-3 py-2 mr-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="group flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
            onClick={() => submitTransaction()}
          >
            {Number(inputValue) >= 0 ? 'Deposit' : 'Withdraw'}
          </button>
        </div>
      </form>
    </>
  );
};

export default TransactionForm;
