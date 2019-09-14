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
    const payload = req.params as NewUser;

    try {
      await this.auth.signUp(payload);

      res.status(201);
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

  verifyToken: RequestHandler = async (req: RequestWithUser, _res, next) => {
    const token = req.headers['authorization'];

    try {
      const payload = await this.auth.decodeToken(token);

      req.user = payload;

      next();
    } catch (err) {
      next(err);
    }
  }
}