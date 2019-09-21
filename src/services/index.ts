import { AuthService, NewUser, UserPayload } from "./auth-service";
import { Models } from "../models";
import { Utils } from "../utils";
import { UsersService } from "./users-service";

export interface Services {
  auth: AuthService;
  users: UsersService;
}

export function createServices(utils: Utils, models: Models): Services {
  return {
    auth: new AuthService(utils.encrypt, utils.jwt, models.users),
    users: new UsersService(models.users),
  }
}

export {
  UsersService,
  AuthService,
  NewUser,
  UserPayload
};