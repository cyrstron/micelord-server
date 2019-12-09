import { RequestHandler } from "express";
import { RequestWithUser } from "./auth-controller";
import { UsersService, } from "../services";
import { HttpError } from "../errors/http-error";

export class UsersController {
  constructor(
    private users: UsersService
  ) {}

  getUserByGoogleToken: RequestHandler = async (
    req: RequestWithUser, 
    res, 
    next
  ) => {
    const {googleToken} = req.query as {
      googleToken?: string
    };

    try {
      const user = await this.users.getUserByGoogleToken(googleToken);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  getCurrentUser: RequestHandler = async (req: RequestWithUser, res, next) => {
    const userId = req.user._id;

    try {
      const user = await this.users.getUserById(userId);

      if (!user) throw new HttpError('User not found', 404, 'Not found');

      res.json(user);
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