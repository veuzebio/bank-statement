import { ObjectId } from 'mongodb';

import Reducer, { ICommitFunction } from '../utils/reducer';
import { IEvent } from './BaseEvent';

interface IEventEntity {
  state: any;
}

export class BaseEntity<T> implements IEventEntity {
  _id: ObjectId = null;
  persistedEvents: IEvent<any>[] = [];
  pendingEvents: IEvent<any>[] = [];

  protected reducer: Reducer<T>;

  constructor(knownEvents: { [eventName: string]: ICommitFunction<T, any> }) {
    this.reducer = new Reducer<T>(knownEvents);
  }

  get state(): any {
    throw new Error('Method not implemented.');
  }

  get events(): any[] {
    return [...this.persistedEvents, ...this.pendingEvents];
  }

  pushNewEvents(events: any[]): any {
    this.pendingEvents = this.pendingEvents.concat(events);
    this.updateState();

    return this;
  }

  setPersistedEvents(events: any[]): any {
    this.persistedEvents = events;
    this.updateState();

    return this;
  }

  confirmEvents(): any {
    this.persistedEvents = this.persistedEvents.concat(this.pendingEvents);
    this.pendingEvents = [];

    return this;
  }

  private updateState() {
    const state = this.state;

    for (const propertyName of Object.keys(state)) {
      (this as any)[propertyName] = state[propertyName];
    }
  }
}
