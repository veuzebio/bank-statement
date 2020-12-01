import BaseEvent from '../../BaseEvent';
import { BankAccount } from '../entity';

export interface BankAccountDeactivationParams {
  deactivatedAt: Date;
}

export class BankAccountDeactivatedEvent extends BaseEvent<
  BankAccountDeactivationParams
> {
  static readonly eventName = 'account-deactivated';

  constructor(data: BankAccountDeactivationParams) {
    super(BankAccountDeactivatedEvent.eventName, data);
  }

  static commit(
    state: BankAccount,
    event: BankAccountDeactivatedEvent
  ): BankAccount {
    state.deactivatedAt = event.data.deactivatedAt;

    return state;
  }
}
