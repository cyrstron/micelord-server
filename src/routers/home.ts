import {Router} from 'express';
import {HomeController} from '../controllers';

export const createHomeRouter = (
  router: Router,
  controller: HomeController,
): Router => {
  router.get('/', controller.handleHome);

  return router;
};
