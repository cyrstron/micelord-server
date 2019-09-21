import { AuthService, NewUser, UserPayload } from "../services";
import { RequestHandler, Request } from "express";

export interface RequestWithUser extends Request {
  user: UserPayload;
}

export class AuthController {
  constructor(
    private auth: AuthService
  ) {}

  signUp: RequestHandler = async (req, res, next) => {
    const payload = req.body as NewUser;

    try {
      await this.auth.signUp(payload);

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  signIn: RequestHandler = async (req, res, next) => {
    const {email, password} = req.body as {
      email: string;
      password: string;
    };

    try {
      const token = await this.auth.signIn(email, password);

      res.send(token);
    } catch (err) {
      next(err);
    }
  }

  verifyToken: RequestHandler = async (req: RequestWithUser, res, next) => {
    const token = req.headers['authorization'];

    try {
      const payload = await this.auth.decodeToken(token);

      req.user = payload;

      next();
    } catch (err) {
      res.sendStatus(401);
    }
  }
}