import {RequestHandler} from 'express';

export class ApiController {
  public handleRequest: RequestHandler = async (_req, res) => {

    res.send('Hello World!');
  }
}
