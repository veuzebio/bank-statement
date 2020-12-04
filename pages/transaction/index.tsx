import { NextPage } from 'next';
import { useState } from 'react';

import Button from '../../frontend/components/button';
import InputText from '../../frontend/components/input-text';
import List, { ListItem } from '../../frontend/components/list';
import Loading from '../../frontend/components/loading';
import Title from '../../frontend/components/title';
import api from '../../frontend/utils/api';

const TransactionPage: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [account, setAccount] = useState(() =>
    JSON.parse(localStorage.getItem('account'))
  );

  function mapToListItem(data: any[]): ListItem[] {
    function formatDateTime(timestamp: string): string {
      const datetime = new Date(timestamp);
      return (
        datetime.getDate() +
        '/' +
        (datetime.getMonth() + 1) +
        '/' +
        datetime.getFullYear()
      );
    }

    return data.map((item, index) => {
      return {
        key: index,
        title: item.value < 0 ? 'Withdrawal' : 'Deposit',
        description: formatDateTime(item.madeAt),
        observation: `$ ${item.value}`,
      };
    });
  }

  async function handleClick() {
    const { data } = await api.put(`/bank-account/${account._id}`, {
      value: Number(inputValue),
    });

    setAccount(data);

    localStorage.setItem('account', JSON.stringify(data));
  }

  if (!account) return <Loading></Loading>;

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-xl w-full">
        <Title>Your account balance is ${account?.balance || 0}</Title>
        <InputText
          label=" "
          value={inputValue}
          valueChange={setInputValue}
        ></InputText>
        <Button
          label={Number(inputValue) < 0 ? 'Withdraw' : 'Deposit'}
          buttonClick={handleClick}
          disabled={
            !inputValue.length ||
            !Number(inputValue) ||
            Number(inputValue) === 0
          }
        ></Button>
        <List itens={mapToListItem(account.transactions)}></List>
      </div>
    </div>
  );
};

export default TransactionPage;
