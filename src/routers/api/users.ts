import {Router} from 'express';
import { UsersController } from '../../controllers';

export const createUsersRouter = (
  Router: () => Router,
  controller: UsersController,
): Router => {
  const router = Router();

  router.get('/current', controller.getCurrentUser);
  router.get('/:id', controller.getUserById);

  return router;
};
