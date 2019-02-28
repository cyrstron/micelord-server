import {Router} from 'express';
import {ApiController} from '../../controllers';

export const createApiRouter = (
  router: Router,
  controller: ApiController,
): Router => {
  router.get('/hello', controller.handleRequest);

  return router;
};
