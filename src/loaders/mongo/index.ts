import {MongoClient, Db, MongoClientOptions} from 'mongodb';

export async function prepareMongo(
  url: string, 
  dbName: string, 
  options: MongoClientOptions
): Promise<Db> {
  const client = new MongoClient(url, options);

  await client.connect();

  const db = client.db(dbName);

  return db;
}