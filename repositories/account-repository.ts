import { ObjectId, WithId } from 'mongodb';
import { CreateAccountPayload, Account } from '../interfaces/models';

import connect from './utils/database';

const ACCOUNTS_COLLECTION = 'accounts';

export async function createAccount(
  payload: CreateAccountPayload
): Promise<WithId<Account>> {
  const { db } = await connect();

  const response = await db.collection<Account>(ACCOUNTS_COLLECTION).insertOne({
    name: payload.name,
    age: payload.age,
    amount: payload.initialAmount ?? 0,
  });

  return response.ops[0];
}

export async function findAccountByName(name: string): Promise<Account> {
  const { db } = await connect();

  const response = await db
    .collection<Account>(ACCOUNTS_COLLECTION)
    .findOne({ name });

  return response;
}

export async function findAccountById(id: string): Promise<Account> {
  const { db } = await connect();

  if (id.length !== 24) return null;

  const response = await db
    .collection<Account>(ACCOUNTS_COLLECTION)
    .findOne({ _id: new ObjectId(id) });

  return response;
}
