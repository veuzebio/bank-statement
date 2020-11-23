import { NextPage } from 'next';
import { useState } from 'react';

import api from '../utils/api';
import { useAuth } from '../utils/contexts/auth-context';

const CreateAccount: NextPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');

  async function openUserAccount() {
    await api.put(`/user/${user.identifier}`, { name, openingBalance });
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
        placeholder="Enter an optional opening balance value"
        value={openingBalance}
        onChange={(e) => setOpeningBalance(e.target.value)}
      />
      <button type="button" onClick={openUserAccount}>
        Create New Account
      </button>
    </>
  );
};

export default CreateAccount;
