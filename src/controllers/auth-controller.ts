import { AuthService } from "../services/";
import { RequestHandler, Request } from "express";
import { 
  AuthStrategyType, 
  SignInPayload, 
  UserPayload, 
  NewUserPayload 
} from "../services/auth-service";

export interface RequestWithUser extends Request {
  user: UserPayload;
}

export class AuthController {
  constructor(
    private auth: AuthService
  ) {}

  signUp: RequestHandler = async (req, res, next) => {
    const payload = req.body as NewUserPayload;
    const {strategy = 'default'} = req.query as {
      strategy?: AuthStrategyType
    };

    try {
      await this.auth.signUp(payload, strategy);

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  signIn: RequestHandler = async (req, res, next) => {
    const {strategy = 'default'} = req.query as {
      strategy?: AuthStrategyType
    };

    const signInPayload = req.body as SignInPayload

    try {
      const token = await this.auth.signIn(signInPayload, strategy);

      res.send(token);
    } catch (err) {
      next(err);
    }
  }

  validateEmail: RequestHandler = async (req, res, next) => {
    const {email} = req.body as {
      email: string;
    };

    try {
      await this.auth.validateEmail(email);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  validateName: RequestHandler = async (req, res, next) => {
    const {name} = req.body as {
      name: string;
    };

    try {
      await this.auth.validateName(name);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  validateToken: RequestHandler = async (req: RequestWithUser, res) => {
    const token = req.headers['authorization'];

    if (!token) {
      res.sendStatus(401);

      return;
    }

    try {
      await this.auth.decodeToken(token);
      
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(401);
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