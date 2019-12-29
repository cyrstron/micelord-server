
import { GamesModel } from "../models/games";
import { GameJsonPayload } from "../models/games";

export class GamesService {
  constructor(
    private games: GamesModel
  ) {}

  getGameById(id: string): Promise<GameJsonPayload | undefined> {
    return this.games.findById(id);
  }
}