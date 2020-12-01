import { ObjectId } from 'mongodb';
import { BaseEntity } from '../BaseEntity';
import {
  BankAccountCreatedEvent,
  BankAccountCreationParams,
  BankAccountDeactivatedEvent,
} from './events';

export class BankAccount extends BaseEntity<BankAccount> {
  number: string | null = null;
  userIdentifier: string | null = null;
  userName: string | null = null;
  createdAt: Date | null = null;
  deactivatedAt: Date | null = null;

  constructor() {
    super({
      [BankAccountCreatedEvent.eventName]: BankAccountCreatedEvent.commit,
      [BankAccountDeactivatedEvent.eventName]:
        BankAccountDeactivatedEvent.commit,
    });
  }

  get state(): any {
    const currentState = this.reducer.reduce(new BankAccount(), [
      ...this.persistedEvents,
      ...this.pendingEvents,
    ]);

    return {
      _id: currentState._id,
      userIdentifier: currentState.userIdentifier,
      userName: currentState.userName,
      createdAt: currentState.createdAt,
      deactivatedAt: currentState.deactivatedAt,
    };
  }

  static create(params: BankAccountCreationParams): BankAccount {
    const account = new BankAccount();

    account.pushNewEvents([
      new BankAccountCreatedEvent({
        ...params,
        id: new ObjectId(),
        createdAt: new Date(),
      }),
    ]);

    return account;
  }

  deactivate(): BankAccount {
    this.pushNewEvents([
      new BankAccountDeactivatedEvent({ deactivatedAt: new Date() }),
    ]);

    return this;
  }
}
