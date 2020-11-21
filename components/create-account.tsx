import { NextPage } from 'next';
import { useState } from 'react';

import api from '../utils/api';

const CreateAccount: NextPage<{ email: string }> = ({ email }) => {
  const [name, setName] = useState('');
  const [initialAmount, setInitialAmount] = useState('');

  function handleCreateAccount() {
    const newAccount = {
      name,
      email,
      initialAmount,
    };
    console.log(newAccount);
    api.post('/account', newAccount);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter an optional amount value"
        value={initialAmount}
        onChange={(e) => setInitialAmount(e.target.value)}
      />
      <button type="button" onClick={handleCreateAccount}>
        Create New Account
      </button>
    </>
  );
};

export default CreateAccount;
