import { Db } from "mongodb";
import { UsersModel, createUsersModel } from "./users";
import { RolesModel, createRolesModel } from "./roles";
import { createGamesModel, GamesModel } from "./games";
import { Utils } from "../utils";

export interface Models {
  users: UsersModel;
  roles: RolesModel;
  games: GamesModel;
}

export function createModels(db: Db, utils: Utils): Models {
  return {
    users: createUsersModel(db, utils),
    roles: createRolesModel(db, utils),
    games: createGamesModel(db, utils)
  }
}

export {UsersModel};