import { ObjectId, WithId } from 'mongodb';

import { BankAccount } from '../../domains/bank-account/BankAccount';
import connect from '../../utils/database';

const COLLECTION = 'accounts';

async function _create(entity: BankAccount): Promise<BankAccount> {
  const { db } = await connect();

  await db.collection(COLLECTION).insertOne({
    _id: entity._id,
    events: entity.pendingEvents,
    state: entity.state,
  });

  return entity.confirmEvents();
}

async function save(entity: BankAccount, force = false): Promise<BankAccount> {
  const { db } = await connect();

  const document = await findById(entity._id);

  if (!document) return _create(entity);

  const { state, events, pendingEvents } = entity;
  const operations = force
    ? { $set: { state, events } }
    : { $set: { state }, $push: { events: { $each: pendingEvents } } };

  await db
    .collection<BankAccount>(COLLECTION)
    .updateOne({ number: entity.number }, operations);

  return entity.confirmEvents();
}

async function findById(id: string | ObjectId): Promise<BankAccount> {
  const { db } = await connect();

  const document = await db
    .collection<BankAccount>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });

  if (!document) return null;

  return new BankAccount().setPersistedEvents(document.events);
}

async function findByIdentifier(identifier: string): Promise<BankAccount> {
  const { db } = await connect();

  const document = await db
    .collection<BankAccount>(COLLECTION)
    .findOne({ 'state.userIdentifier': identifier });

  if (!document) return null;

  return new BankAccount().setPersistedEvents(document.events);
}

async function getAll(): Promise<BankAccount[]> {
  const documents = await this._collection.find().toArray();

  return documents.map(({ events }) => {
    const account = new BankAccount();
    account.setPersistedEvents(events);
    return account;
  });
}

export { save, getAll, findById, findByIdentifier };
