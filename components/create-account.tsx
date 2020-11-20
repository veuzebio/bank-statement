import { NextPage } from 'next';
import { useState } from 'react';

const CreateAccount: NextPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>();
  const [initialAmount, setInitialAmount] = useState<number | null>(null);

  function handleAge(value: string) {
    setAge(Number(value));
  }

  function handleInitialAmount(value: string) {
    if (value) {
      setInitialAmount(Number(value));
    }
  }

  function handleCreateAccount() {
    const url = `${process.env.BASE_API_URL}/account`;
    const payload = { name: name, age: age, initialAmount: initialAmount };
  }

  return (
    <>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => handleAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Optional amount value"
        value={initialAmount}
        onChange={(e) => handleInitialAmount(e.target.value)}
      />
      <button type="button" onClick={handleCreateAccount}>
        Create New Account
      </button>
    </>
  );
};

export default CreateAccount;
