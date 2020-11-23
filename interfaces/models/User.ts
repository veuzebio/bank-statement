import { Account } from './Account';

export interface User {
  identifier: string;
  name?: string;
  account?: Account;
}
