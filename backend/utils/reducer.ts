import { IEvent } from '../domains/BaseEvent';

export interface ICommitFunction<TEntity, TEvent> {
  (state: TEntity, event: TEvent): TEntity;
}

export default class Reducer<TEntity> {
  private knownEvents: { [key: string]: ICommitFunction<TEntity, any> };

  constructor(knownEvents: { [key: string]: ICommitFunction<TEntity, any> }) {
    this.knownEvents = knownEvents;
  }

  reduce(state: TEntity, events: IEvent<any>[]): TEntity {
    return events.reduce<TEntity>((state: TEntity, event: IEvent<any>) => {
      const clonedState = { ...state };
      return this.knownEvents[event.name](clonedState, event);
    }, state);
  }
}
