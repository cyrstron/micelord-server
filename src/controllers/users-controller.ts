import { RequestHandler } from "express";
import { RequestWithUser } from "./auth-controller";
import { UsersService, } from "../services";

export class UsersController {
  constructor(
    private users: UsersService
  ) {}

  getCurrentUser: RequestHandler = async (req: RequestWithUser, res, next) => {
    const userId = req.user._id;

    try {
      const user = await this.users.getUserById(userId);

      if (!user) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    } catch (err) {
      next(err);
    }
  }

  getUserById: RequestHandler = async (req: RequestWithUser, res, next) => {
    const userId = req.params.id;

    try {
      const user = await this.users.getUserById(userId);

      if (!user) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    } catch (err) {
      next(err);
    }
  }
}