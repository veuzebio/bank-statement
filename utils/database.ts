import { Db, MongoClient } from 'mongodb';

const DB_NAME = 'bank-statement';

interface ConnectType {
  db: Db;
  client: MongoClient;
}

const client = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect(): Promise<ConnectType> {
  if (!client.isConnected()) {
    await client.connect();
  }

  const db = client.db(DB_NAME);

  return { db, client };
}
