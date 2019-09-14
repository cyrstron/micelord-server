import { prepareMongo } from "./mongo";
import { Db, MongoClientOptions } from "mongodb";

export interface PreparedApis {
  db: Db
};

export interface LoadersConfig {
  mongo: {
    url: string;
    dbName: string;
    options: MongoClientOptions;
  }
};

export async function prepareApis({
  mongo
}: LoadersConfig): Promise<PreparedApis> {
  const prepares = [
    prepareMongo(mongo.url, mongo.dbName, mongo.options),
  ];

  const [db] = await Promise.all(prepares);

  return {
    db
  };
}