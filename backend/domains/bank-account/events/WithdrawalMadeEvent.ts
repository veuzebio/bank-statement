import BaseEvent from '../../BaseEvent';
import { Transaction } from '../../value-objects/Transaction';
import { BankAccount } from '../BankAccount';

export interface WithdrawalParams {
  value: number;
  madeAt: Date;
}

export class WithdrawalMadeEvent extends BaseEvent<WithdrawalParams> {
  static readonly eventName = 'withdrawal-made';

  constructor(data: WithdrawalParams) {
    super(WithdrawalMadeEvent.eventName, data);
  }

  static commit(state: BankAccount, event: WithdrawalMadeEvent): BankAccount {
    state.transactions.push(
      new Transaction(event.data.value, event.data.madeAt)
    );

    return state;
  }
}
