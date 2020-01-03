import { RequestHandler } from "express";
import { RequestWithUser } from "./auth-controller";
import { HttpError } from "../errors/http-error";
import { GamesService } from "services/games-service";
import { Game } from "models/games";

export class GamesController {
  constructor(
    private games: GamesService,
  ) {}


  getGameById: RequestHandler = async (req: RequestWithUser, res, next) => {
    const {
      id
    } = req.params;

    try {
      const game = await this.games.getById(id);

      if (!game) throw new HttpError('Game not found', 404, 'Not found');

      res.json(game);
    } catch (err) {
      next(err);
    }
  }

  getAllGames: RequestHandler = async (_req: RequestWithUser, res, next) => {
    try {
      const games = await this.games.getAll();

      res.json(games);
    } catch (err) {
      next(err);
    }
  }

  createGame: RequestHandler = async (req: RequestWithUser, res, next) => {
    const {_id: userId, name: userName} = req.user;
    const gamePayload = req.body as Omit<Game, 'createdBy' | '_id'>;

    try {
      const game = await this.games.create({
        ...gamePayload,
        createdBy: {
          _id: userId, 
          name: userName,
        }
      });

      res.json({_id: game.insertedId.toHexString()});
    } catch (err) {
      next(err);
    }
  }
}