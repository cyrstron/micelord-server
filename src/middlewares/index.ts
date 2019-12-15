import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import { RequestHandler, ErrorRequestHandler } from "express";

import { Controllers } from "../controllers";
import { handleError } from './error-handler-middleware';

export interface Middlewares {
  verifyToken: RequestHandler;
  parseJson: RequestHandler;
  staticServer: RequestHandler;
  handleError: ErrorRequestHandler;
}

export function createMiddlewares({
  auth
}: Controllers) {
  return {
    parseJson: bodyParser.json(),
    staticServer: express.static(path.resolve(__dirname, '../static')),
    verifyToken: auth.verifyToken,
    handleError
  };
}