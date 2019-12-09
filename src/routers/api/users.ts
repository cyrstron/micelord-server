import {Router} from 'express';
import { UsersController } from '../../controllers';
import { Middlewares } from '../../middlewares';

export const createUsersRouter = (
  Router: () => Router,
  controller: UsersController,
  {verifyToken}: Middlewares
): Router => {
  const router = Router();

  router.get('/by-google-token', controller.getUserByGoogleToken);

  router.use(verifyToken);

  router.get('/current', controller.getCurrentUser);
  router.get('/:id', controller.getUserById);

  return router;
};
