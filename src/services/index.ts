import { AuthService} from "./auth-service/auth-service";
import { Models } from "../models";
import { Utils } from "../utils";
import { UsersService } from "./users-service";
import { createAuthService } from "./auth-service";
import { GamesService } from "./games-service";

export interface Services {
  auth: AuthService;
  users: UsersService;
  games: GamesService;
}

export function createServices(utils: Utils, models: Models): Services {
  return {
    auth: createAuthService(models.users, utils),
    users: new UsersService(models.users),
    games: new GamesService(models.games),
  }
}

export {
  UsersService,
  AuthService,
};