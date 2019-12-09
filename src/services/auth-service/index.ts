import { UsersModel } from "../../models";
import { Utils } from "../../utils";
import { createAuthStrategies } from "./strategies";
import { AuthService } from "..";

export function createAuthService(users: UsersModel, utils: Utils) {
  const strategies = createAuthStrategies(users, utils);

  return new AuthService(users, strategies, utils);
}