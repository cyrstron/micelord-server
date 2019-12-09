import { UsersModel } from "../../../models";
import { Utils } from "../../../utils";
import { GoogleAuthStrategy } from "./google-auth";
import { DefaultAuthStrategy } from "./default";

export interface AuthStrategies {
  googleAuth: GoogleAuthStrategy;
  default: DefaultAuthStrategy;
}

export function createAuthStrategies(
  users: UsersModel, 
  utils: Utils
): AuthStrategies {
  return {
    googleAuth: new GoogleAuthStrategy(users, utils.googleAuth),
    default: new DefaultAuthStrategy(users, utils.encrypt),
  };
}