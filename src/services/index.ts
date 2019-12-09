import { AuthService, NewUser, UserPayload } from "./auth-service/auth-service";
import { Models } from "../models";
import { Utils } from "../utils";
import { UsersService } from "./users-service";
import { createAuthService } from "./auth-service";

export interface Services {
  auth: AuthService;
  users: UsersService;
}

export function createServices(utils: Utils, models: Models): Services {
  return {
    auth: createAuthService(models.users, utils),
    users: new UsersService(models.users),
  }
}

export {
  UsersService,
  AuthService,
  NewUser,
  UserPayload
};