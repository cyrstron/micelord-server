import {Router} from 'express';
import { GamesController } from 'controllers/games-controller';

export const createGamesRouter = (
  Router: () => Router,
  controller: GamesController,
): Router => {
  const router = Router();

  router.get('/:id', controller.getGameById);

  router.get('/', controller.getAllGames);

  router.post('/', controller.createGame);

  return router;
};
