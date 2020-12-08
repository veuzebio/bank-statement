import { ObjectId } from 'mongodb';

import { BaseEntity } from '../BaseEntity';
import { Transaction } from '../value-objects/Transaction';
import {
  BankAccountCreatedEvent,
  BankAccountCreationParams,
  BankAccountDeactivatedEvent,
  DepositMadeEvent,
  WithdrawalMadeEvent,
} from './events';

export class BankAccount extends BaseEntity<BankAccount> {
  number: string | null = null;
  userIdentifier: string | null = null;
  userName: string | null = null;
  userBirthDate: Date | null = null;
  createdAt: Date | null = null;
  deactivatedAt: Date | null = null;
  transactions: Transaction[] = [];

  constructor() {
    super({
      [BankAccountCreatedEvent.eventName]: BankAccountCreatedEvent.commit,
      [BankAccountDeactivatedEvent.eventName]:
        BankAccountDeactivatedEvent.commit,
      [DepositMadeEvent.eventName]: DepositMadeEvent.commit,
      [WithdrawalMadeEvent.eventName]: WithdrawalMadeEvent.commit,
    });
  }

  get isDeactvated(): boolean {
    return !!this.deactivatedAt;
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
      userBirthDate: currentState.userBirthDate,
      createdAt: currentState.createdAt,
      deactivatedAt: currentState.deactivatedAt,
      transactions: currentState.transactions,
      balance: this.getBalance(currentState.transactions),
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

  deposit(value: number): BankAccount {
    this.pushNewEvents([new DepositMadeEvent({ value, madeAt: new Date() })]);

    return this;
  }

  withdraw(value: number): BankAccount {
    this.pushNewEvents([
      new WithdrawalMadeEvent({ value, madeAt: new Date() }),
    ]);

    return this;
  }

  private getBalance(transactions: Transaction[]): number {
    if (!transactions.length) return 0;

    return transactions
      .map((transaction) => transaction.value)
      .reduce((prev, current) => prev + current, 0);
  }
}
