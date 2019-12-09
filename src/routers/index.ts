import {Router} from 'express';
import {Controllers} from '../controllers';
import { createAuthRouter } from './auth';
import { createApiRouter } from './api';
import { Middlewares } from '../middlewares';

export interface Routers {
  auth: Router;
  api: Router;
}

export const createRouters = (
  Router: () => Router,
  controllers: Controllers,
  middlewares: Middlewares,
): Routers => ({
  auth: createAuthRouter(Router, controllers.auth),
  api: createApiRouter(Router, controllers, middlewares),
});
