import {Router} from 'express';
import {Controllers} from '../controllers';
import {createApiRouter} from './api';
import {createHomeRouter} from './home';

export interface Routers {
  home: Router;
  api: Router;
}

export const createRouters = (
  controllers: Controllers,
): Routers => ({
  api: createApiRouter(Router(), controllers.api),
  home: createHomeRouter(Router(), controllers.home),
});
