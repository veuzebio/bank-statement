import { BankAccount } from '../../domains/bank-account/BankAccount';
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
  const account = await findById(id);

  if (account.isDeactvated) throw new Error('Account already deactvated.');

  account.deactivate();

  repository.save(account);

  return account;
}

async function makeTransaction(
  id: string,
  value: number
): Promise<BankAccount> {
  const account = await findById(id);

  if (account.isDeactvated) throw new Error('Account already deactvated.');
  if (value === 0) throw new Error('Value must not be zero.');

  if (value > 0) account.deposit(value);
  if (value < 0) account.withdraw(value);

  repository.save(account);

  return account;
}

async function findById(id: string): Promise<BankAccount> {
  const account = repository.findById(id);

  if (!account) throw new Error(`Account not found with given ID ${id}`);

  return account;
}

async function findByIdentifier(identifier: string): Promise<BankAccount> {
  const account = await repository.findByIdentifier(identifier);

  if (!account)
    throw new Error(`Account not found with given Identifier ${identifier}`);

  return account;
}

function generateAccountNumber() {
  return (Math.floor(Math.random() * 90000) + 10000).toString();
}

export { create, deactivate, findById, makeTransaction, findByIdentifier };
