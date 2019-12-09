import { UsersModel, UserSchema } from "./users";
import { Db } from "mongodb";
import { Utils } from "../../utils";

export function createUsersModel(db: Db, utils: Utils): UsersModel {
  return new UsersModel(db, utils);
}

export {UsersModel, UserSchema};