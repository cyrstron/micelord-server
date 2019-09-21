import {Router} from 'express';
import { Controllers } from '../../controllers';
import { createUsersRouter } from './users';

export const createApiRouter = (
  Router: () => Router,
  {users}: Controllers,
): Router => {
  const router = Router();
  const usersRouter = createUsersRouter(Router, users);

  router.use('/users', usersRouter);

  return router;
};
