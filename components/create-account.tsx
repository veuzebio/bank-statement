import { NextPage } from 'next';
import { useState } from 'react';

import api from '../utils/api';
import { useAuthContext } from '../utils/contexts/auth-context';

const CreateAccount: NextPage = () => {
  const { id } = useAuthContext();
  const [name, setName] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');

  async function openUserAccount() {
    await api.put(`/user/${id}`, { name, openingBalance });
  }

  return (
    <>
      <form>
        <p>Lets create an account for you</p>
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
      </form>
    </>
  );
};

export default CreateAccount;
