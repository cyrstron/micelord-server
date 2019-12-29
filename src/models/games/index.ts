import { Db } from "mongodb";
import { Utils } from "../../utils";
import { GamesModel, GameSchema, GameJsonPayload } from "./games";

export function createGamesModel(db: Db, _utils: Utils): GamesModel {
  return new GamesModel(db);
}

export {GamesModel, GameSchema, GameJsonPayload};