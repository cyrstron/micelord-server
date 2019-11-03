import {Router} from 'express';
import {AuthController} from '../controllers';

export const createAuthRouter = (
  Router: () => Router,
  controller: AuthController,
): Router => {
  const router = Router();
  
  router.post('/validate-name', controller.validateName);
  router.post('/validate-email', controller.validateEmail);
  router.get('/validate-token', controller.validateToken);
  
  router.post('/signup', controller.signUp);
  router.post('/signin', controller.signIn);

  return router;
};
