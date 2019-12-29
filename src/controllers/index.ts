import { Services } from '../services';
import { AuthController } from './auth-controller';
import { UsersController } from './users-controller';
import { GamesController } from './games-controller';

export interface Controllers {
  auth: AuthController;
  users: UsersController;
  games: GamesController;
}

export const createControllers = ({
  auth, 
  users,
  games,
}: Services): Controllers => ({
  auth: new AuthController(auth),
  users: new UsersController(users),
  games: new GamesController(games),
});

export {
  AuthController,
  UsersController,
};
