import { UsersModel } from "./users";
import { Db } from "mongodb";

export function createUsersModel(db: Db): UsersModel {
  return new UsersModel(db);
}

export {UsersModel};