import { NextPage } from 'next';
import { useState } from 'react';

import Button from '../../frontend/components/button';
import InputText from '../../frontend/components/input-text';
import List, { ListItem } from '../../frontend/components/list';
import Loading from '../../frontend/components/loading';
import Title from '../../frontend/components/title';
import { useAccountContext } from '../../frontend/utils/contexts/account';
import * as service from '../../frontend/services/account';

const TransactionPage: NextPage = () => {
  const { account, storeAccount } = useAccountContext();
  const [inputValue, setInputValue] = useState('');

  async function makeTransaction() {
    const data = await service.makeTransaction(account._id, Number(inputValue));

    storeAccount(data);
  }

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
          buttonClick={makeTransaction}
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
