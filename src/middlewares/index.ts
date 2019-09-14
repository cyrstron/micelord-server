import bodyParser from 'body-parser';
import { Controllers } from "../controllers";
import { RequestHandler } from "express";

export interface Middlewares {
  verifyToken: RequestHandler;
  parseJson: RequestHandler;
}

export function createMiddlewares({
  auth
}: Controllers) {
  return {
    parseJson: bodyParser.json(),
    verifyToken: auth.verifyToken,
  };
}