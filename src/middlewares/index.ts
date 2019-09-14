import bodyParser from 'body-parser';
import { RequestHandler, ErrorRequestHandler } from "express";

import { Controllers } from "../controllers";
import { handleError } from './error-handler-middleware';

export interface Middlewares {
  verifyToken: RequestHandler;
  parseJson: RequestHandler;
  handleError: ErrorRequestHandler;
}

export function createMiddlewares({
  auth
}: Controllers) {
  return {
    parseJson: bodyParser.json(),
    verifyToken: auth.verifyToken,
    handleError
  };
}