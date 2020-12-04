import { createContext, useContext, useState } from 'react';

const AccountContext = createContext<AccountContextData>(
  {} as AccountContextData
);

export interface AccountContextData {
  stored: boolean;
  account: any;
  storeAccount: (data: any) => void;
}

export const AccountProvider: React.FC = ({ children }) => {
  const [account, setAccount] = useState(null);

  const storeAccount = (data: any) => {
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
