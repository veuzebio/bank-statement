import { Transaction } from './Transaction';

export interface BankAccount {
  _id?: string;
  userIdentifier?: string;
  userName?: string;
  userBirthDate?: Date;
  createdAt?: Date;
  deactivatedAt?: Date;
  balance?: number;
  transactions?: Transaction[];
}
