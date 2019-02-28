import {RequestHandler} from 'express';

export class ApiController {
  public handleRequest: RequestHandler = (_req, res) => {
    res.send('hello world');
  }
}
