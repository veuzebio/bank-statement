import { ObjectId } from 'mongodb';

export interface IEvent<TData> {
  _id: any;
  name: string;
  data: TData;
  timestamp: Date;
}

export default class BaseEvent<TData> implements IEvent<TData> {
  readonly _id: any;
  readonly name: string;
  readonly data: TData;
  readonly timestamp: Date;

  constructor(name: string, data: TData, id?: string) {
    this._id = id || new ObjectId();
    this.name = name;
    this.data = data;
    this.timestamp = new Date();
  }
}
