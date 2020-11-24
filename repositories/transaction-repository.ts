import { WithId } from 'mongodb';

import connect from '../utils/database';
import { Transaction } from '../interfaces/models';

const TRANSACTION_COLLECTION = 'transactions';

export async function createTransaction(
  transaction: Transaction
): Promise<WithId<Transaction>> {
  const { db } = await connect();

  const response = await db
    .collection<Transaction>(TRANSACTION_COLLECTION)
    .insertOne(transaction);

  return response.ops[0];
}

export async function getTransactionsByIdentifier(
  identifier: string
): Promise<Transaction[]> {
  const { db } = await connect();

  const response = await db
    .collection<Transaction>(TRANSACTION_COLLECTION)
    .find({ userIdentifier: identifier })
    .toArray();

  return response;
}
