import { Services } from '../services';
import { AuthController } from './auth-controller';

export interface Controllers {
  auth: AuthController;
}

export const createControllers = ({auth}: Services): Controllers => ({
  auth: new AuthController(auth),
});

export {
  AuthController,
};
