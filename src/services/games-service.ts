
import { GamesModel, GameSchema } from "../models/games";
import { GameJsonPayload } from "../models/games";

export class GamesService {
  constructor(
    private games: GamesModel
  ) {}

  getById(id: string): Promise<GameJsonPayload | undefined> {
    return this.games.findById(id);
  }

  create(game: GameSchema) {
    return this.games.add(game);
  }

  getAll() {
    return this.games.find();
  }
}