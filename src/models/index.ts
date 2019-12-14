import { Db } from "mongodb";
import { UsersModel, createUsersModel } from "./users";
import { RolesModel, createRolesModel } from "./roles";
import { Utils } from "../utils";

export interface Models {
  users: UsersModel;
  roles: RolesModel;
}

export function createModels(db: Db, utils: Utils): Models {
  return {
    users: createUsersModel(db, utils),
    roles: createRolesModel(db, utils),
  }
}

export {UsersModel};