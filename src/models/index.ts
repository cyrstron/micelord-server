import { Db } from "mongodb";
import { UsersModel, createUsersModel } from "./users";

export interface Models {
  users: UsersModel;
}

export function createModels(db: Db): Models {
  return {
    users: createUsersModel(db),
  }
}

export {UsersModel};