import { ObjectId, WithId } from 'mongodb';

import connect from '../utils/database';
import { User } from '../interfaces/models';

const USER_COLLECTION = 'users';

export async function createUser(identifier: string): Promise<WithId<User>> {
  const { db } = await connect();

  const response = await db.collection<User>(USER_COLLECTION).insertOne({
    identifier: identifier,
  });

  return response.ops[0];
}

export async function getUserById(id: string): Promise<WithId<User>> {
  const { db } = await connect();

  const response = await db
    .collection<WithId<User>>(USER_COLLECTION)
    .findOne({ _id: new ObjectId(id) });

  return response;
}

export async function getUserByIdentifier(
  identifier: string
): Promise<WithId<User>> {
  const { db } = await connect();

  const response = await db
    .collection<WithId<User>>(USER_COLLECTION)
    .findOne({ identifier: identifier });

  return response;
}

export async function updateUser(user: User): Promise<void> {
  const { db } = await connect();

  await db
    .collection<User>(USER_COLLECTION)
    .updateOne({ identifier: user.identifier }, { $set: { ...user } });
}
