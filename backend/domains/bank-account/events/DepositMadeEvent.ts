import BaseEvent from '../../BaseEvent';
import { Transaction } from '../../value-objects/Transaction';
import { BankAccount } from '../BankAccount';

export interface DepositParams {
  value: number;
  madeAt: Date;
}

export class DepositMadeEvent extends BaseEvent<DepositParams> {
  static readonly eventName = 'deposit-made';

  constructor(data: DepositParams) {
    super(DepositMadeEvent.eventName, data);
  }

  static commit(state: BankAccount, event: DepositMadeEvent): BankAccount {
    state.transactions.push(
      new Transaction(event.data.value, event.data.madeAt)
    );

    return state;
  }
}
