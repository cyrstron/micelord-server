import {Router} from 'express';
import {Controllers} from '../controllers';
import { createAuthRouter } from './auth';
import { createApiRouter } from './api';

export interface Routers {
  auth: Router;
  api: Router;
}

export const createRouters = (
  Router: () => Router,
  controllers: Controllers,
): Routers => ({
  auth: createAuthRouter(Router, controllers.auth),
  api: createApiRouter(Router, controllers)
});
