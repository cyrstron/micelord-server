import { prepareMongo } from "./mongo";
import { Db } from "mongodb";

export interface PreparedApis {
  mongo: Db
}

export async function prepareApis(): Promise<PreparedApis> {
  const prepares = [
    prepareMongo()
  ];

  const [mongo] = await Promise.all(prepares);

  return {
    mongo
  };
}