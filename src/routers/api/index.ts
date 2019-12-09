import {Router} from 'express';
import { Controllers } from '../../controllers';
import { createUsersRouter } from './users';
import { Middlewares } from '../../middlewares';

export const createApiRouter = (
  Router: () => Router,
  {users}: Controllers,
  middlewares: Middlewares
): Router => {
  const router = Router();
  const usersRouter = createUsersRouter(Router, users, middlewares);

  router.use('/users', usersRouter);

  router.use(middlewares.verifyToken);

  return router;
};
