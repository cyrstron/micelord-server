import { AuthService, NewUser, UserPayload } from "./auth-service";
import { Models } from "../models";
import { Utils } from "../utils";

export interface Services {
  auth: AuthService;
}

export function createServices(utils: Utils, models: Models): Services {
  return {
    auth: new AuthService(utils.encrypt, utils.jwt, models.users),
  }
}

export {
  AuthService,
  NewUser,
  UserPayload
};