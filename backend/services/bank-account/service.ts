import { BankAccount } from '../../domains/bank-account/entity';
import { BankAccountCreationParams } from '../../domains/bank-account/events';
import * as repository from '../../repositories/bank-account/repository';

async function create(
  payload: BankAccountCreationParams
): Promise<BankAccount> {
  const data: BankAccountCreationParams = {
    ...payload,
    number: generateAccountNumber(),
  };

  const account = BankAccount.create(data);

  repository.save(account);

  return account;
}

async function deactivate(id: string): Promise<BankAccount> {
  const account = await find(id);

  account.deactivate();

  repository.save(account);

  return account;
}

async function find(id: string): Promise<BankAccount> {
  const account = await repository.findById(id);

  if (!account) throw new Error('Account not found');

  return account;
}

function generateAccountNumber() {
  return (Math.floor(Math.random() * 90000) + 10000).toString();
}

export { create, deactivate, find };
