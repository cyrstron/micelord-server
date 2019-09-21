import { Services } from '../services';
import { AuthController } from './auth-controller';
import { UsersController } from './users-controller';

export interface Controllers {
  auth: AuthController;
  users: UsersController;
}

export const createControllers = ({
  auth, 
  users
}: Services): Controllers => ({
  auth: new AuthController(auth),
  users: new UsersController(users),
});

export {
  AuthController,
  UsersController,
};
