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
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="button" onClick={() => submitTransaction()}>
        {Number(inputValue) >= 0 ? 'Deposit' : 'Withdraw'}
      </button>
    </>
  );
};

export default TransactionForm;
