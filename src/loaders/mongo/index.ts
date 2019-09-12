import {MongoClient, Db} from 'mongodb';
import {mongoConfig} from '../../configs';

export async function prepareMongo(): Promise<Db> {
  const {url, dbName, launchOptions} = mongoConfig;
  const client = new MongoClient(url, launchOptions);

  await client.connect();

  const db = client.db(dbName);

  return db;
}