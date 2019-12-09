import { Db } from "mongodb";
import { UsersModel, createUsersModel } from "./users";
import { Utils } from "../utils";

export interface Models {
  users: UsersModel;
}

export function createModels(db: Db, utils: Utils): Models {
  return {
    users: createUsersModel(db, utils),
  }
}

export {UsersModel};