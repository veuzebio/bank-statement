import { BankAccount, DataEvent, User } from '../models';
import * as api from '../utils/api';

function create(user: User): Promise<BankAccount> {
  return api.post<BankAccount>('/bank-account', { user });
}

function getEventList(accountId: string): Promise<DataEvent[]> {
  return api.get<DataEvent[]>(`/bank-account/events/${accountId}`);
}

function deactivate(accountId: string): Promise<BankAccount> {
  return api.del<BankAccount>(`/bank-account/${accountId}`);
}

function makeTransaction(
  accountId: string,
  value: number
): Promise<BankAccount> {
  return api.put<BankAccount>(`/bank-account/${accountId}`, { value });
}

export { create, getEventList, deactivate, makeTransaction };
