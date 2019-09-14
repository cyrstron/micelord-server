import {Router} from 'express';
import {AuthController} from '../controllers';

export const createAuthRouter = (
  router: Router,
  controller: AuthController,
): Router => {
  router.post('/signup', controller.signUp);
  router.post('/signin', controller.signIn);

  return router;
};
