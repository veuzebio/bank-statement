import { createContext, useContext, useState } from 'react';

import { BankAccount } from '../../models';

const AccountContext = createContext<AccountContextData>(
  {} as AccountContextData
);

export interface AccountContextData {
  stored: boolean;
  account: BankAccount;
  storeAccount: (data: BankAccount) => void;
}

export const AccountProvider: React.FC = ({ children }) => {
  const [account, setAccount] = useState(null);

  const storeAccount = (data: BankAccount) => {
    setAccount(data);
    console.log('ACCOUNT STORED => ', data);
  };

  return (
    <AccountContext.Provider
      value={{ stored: !!account, account, storeAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export function useAccountContext(): AccountContextData {
  return useContext(AccountContext);
}
