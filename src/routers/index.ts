import {Router} from 'express';
import {Controllers} from '../controllers';
import { createAuthRouter } from './auth';

export interface Routers {
  auth: Router;
}

export const createRouters = (
  controllers: Controllers,
): Routers => ({
  auth: createAuthRouter(Router(), controllers.auth),
});
