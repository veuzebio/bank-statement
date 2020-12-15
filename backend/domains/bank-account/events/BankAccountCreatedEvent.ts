import { ObjectId } from 'mongodb';

import BaseEvent from '../../BaseEvent';
import { BankAccount } from '../BankAccount';

export interface BankAccountCreationParams {
  id: ObjectId;
  number: string;
  createdAt: Date;
  user: {
    identifier: string;
    name: string;
    birthDate: Date;
  };
}

export class BankAccountCreatedEvent extends BaseEvent<
  BankAccountCreationParams
> {
  static readonly eventName = 'account-created';

  constructor(data: BankAccountCreationParams) {
    super(BankAccountCreatedEvent.eventName, data);
  }

  static commit(
    state: BankAccount,
    event: BankAccountCreatedEvent
  ): BankAccount {
    state._id = event.data.id;
    state.number = event.data.number;
    state.userName = event.data.user.name;
    state.userIdentifier = event.data.user.identifier;
    state.userBirthDate = event.data.user.birthDate;
    state.createdAt = event.data.createdAt;

    return state;
  }
}
