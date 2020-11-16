import { NextPage } from 'next';
import { useState } from 'react';

const TransactionForm: NextPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  function setAmountValue() {
    setTotalAmount(totalAmount + Number(inputValue));
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="button" onClick={setAmountValue}>
        Deposit
      </button>
      <h1>{totalAmount}</h1>
    </div>
  );
};

export default TransactionForm;
