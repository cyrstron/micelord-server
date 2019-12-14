import { RolesModel, RoleSchema } from "./roles";
import { Db } from "mongodb";
import { Utils } from "../../utils";

export function createRolesModel(db: Db, _utils: Utils): RolesModel {
  return new RolesModel(db);
}

export {RolesModel, RoleSchema};